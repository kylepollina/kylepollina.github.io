"""Delete photos in a folder that look the same as another one, keeping the largest. Used by favorites.sh.

Copies of a shot are often separate exports, so their bytes differ. This compares tiny grayscale versions
instead, which ignores the encoding and the resolution. Usage: favorites_dedupe.py FOLDER (needs ImageMagick)
"""
import subprocess
import sys
from pathlib import Path

# Mean difference out of 255. Copies and burst shots score under 5, and separate photos of a scene start at 15
SAME = 8


def signature(photo):
    command = ["magick", str(photo), "-colorspace", "Gray", "-resize", "32x32!", "-normalize", "-depth", "8", "gray:-"]
    return subprocess.run(command, capture_output=True, check=True).stdout


def size(photo):
    command = ["magick", "identify", "-format", "%w %h", str(photo)]
    w, h = subprocess.run(command, capture_output=True, check=True, text=True).stdout.split()
    return int(w) * int(h)


def difference(a, b):
    return sum(abs(x - y) for x, y in zip(a, b)) / len(a)


# Best copy first, so it's the one kept: the most pixels, then the plainest name
photos = sorted(Path(sys.argv[1]).glob("*.jpg"), key=lambda p: (-size(p), len(p.name), p.name))
kept = []
for photo in photos:
    sig = signature(photo)
    twin = next((name for name, other in kept if difference(sig, other) < SAME), None)
    if twin:
        print(f"{photo.name} looks the same as {twin}, skipping it")
        photo.unlink()
    else:
        kept.append((photo.name, sig))
