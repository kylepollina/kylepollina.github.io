"""Make photography/favorites match the hearted photos in Apple Photos, for the wall on the photography page.

Runs before every push to master (.githooks/pre-push), or by hand: python3 scripts/favorites.py
Needs ImageMagick and exiftool, and permission to control Photos the first time.

Photos already on the site are left alone, since re-encoding them would grow the repo's history on every run. New
ones are shrunk to 1600px and stripped of metadata, location included. Un-hearted ones are removed. Photos that look
the same as another are skipped, and remembered in favorites_skipped.txt so they aren't exported again.

Exit codes: 0 is done, 1 means Photos couldn't be read and nothing changed, 2 means location data was found.
"""
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "photography" / "favorites"
SKIPPED = Path(__file__).with_name("favorites_skipped.txt")

# Mean difference out of 255. Copies and burst shots score under 5, and separate photos of a scene start at 15
SAME = 8

LIST = """
with timeout of 280 seconds
    tell application "Photos"
        set out to {}
        -- Held in a variable: looping over the query directly runs it again on every pass, which takes many minutes
        set favs to (media items whose favorite is true)
        repeat with m in favs
            set end of out to (id of m) & tab & (filename of m)
        end repeat
    end tell
end timeout
set AppleScript's text item delimiters to linefeed
return out as text
"""


def run(*command, **kwargs):
    # A hung Photos shouldn't hang a push
    return subprocess.run(command, capture_output=True, check=True, timeout=330, **kwargs).stdout


def site_name(filename):
    return re.sub(r"[()]", "", Path(filename).stem.lower().replace(" ", "-")) + ".jpg"


def list_favorites():
    """{name on the site: id in Photos}. Two photos with one file name get -1 on the second, as they did before."""
    rows = [line.split("\t", 1) for line in run("osascript", "-e", LIST, text=True).splitlines() if "\t" in line]
    favorites = {}
    for photo_id, filename in sorted(rows):
        name = site_name(filename)
        while name in favorites:
            stem = Path(name).stem
            name = f"{stem}-1.jpg"
        favorites[name] = photo_id
    return favorites


def add(name, photo_id):
    """Photos gives the current version, with any edits, downloading it from iCloud if it has to."""
    with tempfile.TemporaryDirectory() as folder:
        run(
            "osascript",
            "-e", "with timeout of 300 seconds",
            "-e", f'tell application "Photos" to export {{media item id "{photo_id}"}} to (POSIX file "{folder}" as alias)',
            "-e", "end timeout",
        )
        exported = sorted(Path(folder).iterdir())
        run("magick", str(exported[0]), "-auto-orient", "-resize", "1600x1600>", "-strip", "-quality", "80", str(OUT / name))


def signature(photo):
    return run("magick", str(photo), "-colorspace", "Gray", "-resize", "32x32!", "-normalize", "-depth", "8", "gray:-")


def size(photo):
    w, h = run("magick", "identify", "-format", "%w %h", str(photo), text=True).split()
    return int(w) * int(h)


def difference(a, b):
    return sum(abs(x - y) for x, y in zip(a, b)) / len(a)


def remove_lookalikes():
    """Delete photos that look the same as another, returning their names. Keeps the most pixels, then the plainest name."""
    kept, removed = [], []
    for photo in sorted(OUT.glob("*.jpg"), key=lambda p: (-size(p), len(p.name), p.name)):
        sig = signature(photo)
        twin = next((name for name, other in kept if difference(sig, other) < SAME), None)
        if twin:
            print(f"  {photo.name} looks the same as {twin}, skipping it")
            photo.unlink()
            removed.append(photo.name)
        else:
            kept.append((photo.name, sig))
    return removed


def main():
    if not shutil.which("magick") or not shutil.which("exiftool"):
        print("favorites: needs ImageMagick and exiftool")
        return 1
    try:
        favorites = list_favorites()
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired) as e:
        print(f"favorites: couldn't read Photos: {e}")
        return 1
    # Never empty the wall because Photos answered with nothing
    if not favorites:
        print("favorites: Photos listed no favorites, leaving the wall alone")
        return 1

    skipped = set(SKIPPED.read_text().split()) & set(favorites) if SKIPPED.exists() else set()
    gone = [p for p in OUT.glob("*.jpg") if p.name not in favorites]
    for photo in gone:
        photo.unlink()
    have = {p.name for p in OUT.glob("*.jpg")}
    new = sorted(set(favorites) - have - skipped)

    added, failed = [], []
    for n, name in enumerate(new, 1):
        print(f"  {n}/{len(new)} {name}", flush=True)
        try:
            add(name, favorites[name])
            added.append(name)
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired, IndexError):
            # Left out for now; the next run tries again
            failed.append(name)
    if added:
        skipped |= set(remove_lookalikes())

    # Not run(): exiftool exits with 1 when no file matches, which is what we're hoping for
    check = ["exiftool", "-q", "-q", "-if", "$GPSPosition", "-p", "$FileName", str(OUT)]
    located = subprocess.run(check, capture_output=True, text=True, timeout=330).stdout.split()
    if located:
        print(f"favorites: location data found, not publishing: {located}")
        return 2

    names = sorted(p.name for p in OUT.glob("*.jpg"))
    (OUT / "list.js").write_text("window.FAVORITES = [" + ",".join(f'"{n}"' for n in names) + "];\n")
    SKIPPED.write_text("".join(f"{n}\n" for n in sorted(skipped)))
    print(f"favorites: {len(names)} on the wall, {len(added)} new, {len(gone)} removed, {len(skipped)} skipped as lookalikes")
    if failed:
        print(f"favorites: couldn't export, will retry next time: {failed}")
    return 0


sys.exit(main())
