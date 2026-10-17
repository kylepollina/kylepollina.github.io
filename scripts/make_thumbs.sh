#!/bin/bash
# Capture a still of each sketch for the interactive gallery: interactive/sketches/<name>/<name>-thumb.webp
# Usage: scripts/make_thumbs.sh arcs cubies ...   (needs `npm run serve` on port 8613, Google Chrome, and cwebp)
# Sketches with no thumb are linked in a text list instead. Mouse-driven ones may need a manual screenshot.
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=${PORT:-8613}
for s in "$@"; do
  "$CHROME" --headless=new --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars \
    --window-size=500,500 --virtual-time-budget=5000 --screenshot="/tmp/$s.png" \
    "http://localhost:$PORT/interactive/sketches/$s/$s-embed.html" >/dev/null 2>&1
  cwebp -quiet -q 80 "/tmp/$s.png" -o "interactive/sketches/$s/$s-thumb.webp"
done
