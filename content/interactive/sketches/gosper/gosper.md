
---
page: interactive
title: gosper
published: true

scripts:
  - ../../../scripts/p5/p5.min.js
  - ../../../scripts/p5/addons/p5.dom.js
  - ../../../scripts/p5-utilities/turtle.js
  - ../../../scripts/p5-utilities/lsystem.js
  - ../../../content/interactive/sketches/gosper/gosper.js
---

<div id="sketch" class="pl-5">
  <div id="gosper-holder">
  </div>
</div>

Use arrow keys + space bar.

This is the [Gosper Curve](https://en.wikipedia.org/wiki/Gosper_curve) which I built using an [L-System](https://en.wikipedia.org/wiki/L-system).
This is a [space filling curve](https://en.wikipedia.org/wiki/Space-filling_curve) which means that it is a 1-dimensional line but if the L-system
is iterated until infinity the 1-dimensonal curve will fill 2-dimensional space. But infinity is just an illusion so don't think about it too hard ;)