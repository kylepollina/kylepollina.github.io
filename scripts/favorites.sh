#!/bin/bash
# Copy favorite photos into photography/favorites/ for the random photos at the top of the photography page,
# and list them in photography/favorites/list.js (as window.FAVORITES) for photography.html to pick from.
# Usage: scripts/favorites.sh [folder]   (default ~/Desktop/favorites; needs ImageMagick)
# Photos are shrunk to 1600px on the long side and stripped of metadata, location included. The folder is
# replaced each run, so the site always matches the source folder.
SRC=${1:-~/Desktop/favorites}
OUT=photography/favorites
set -e
rm -rf "$OUT"
mkdir -p "$OUT"
list=()
for f in "$SRC"/*.{jpg,jpeg,JPG,JPEG,heic,HEIC}; do
  [ -e "$f" ] || continue
  name=$(basename "${f%.*}" | tr 'A-Z ' 'a-z-' | tr -d '()').jpg
  magick "$f" -auto-orient -resize '1600x1600>' -strip -quality 80 "$OUT/$name"
  list+=("\"$name\"")
done
(IFS=,; echo "window.FAVORITES = [${list[*]}];") > "$OUT/list.js"
echo "${#list[@]} photos in $OUT"
