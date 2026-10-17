---
page: home
---

<div id="sketch" class="pl-5">
  <iframe id="home-sketch" title="sketch" style="border:0; width:495px; max-width:100%; height:220px; display:block"></iframe>
</div>

<script>
  // Pick a sketch at random on each load; weight is how many tickets it gets, h is the frame height
  (function () {
    var sketches = [
      { name: "cubies", weight: 6, h: 220 },
      { name: "corners", weight: 1, h: 495 },   // right angles
      { name: "arcs", weight: 1, h: 495 },      // arcs (was "covenent")
      { name: "gogh", weight: 1, h: 495 },      // van gogh
      { name: "lisa", weight: 1, h: 495 },      // mona lisa
      { name: "starry", weight: 1, h: 495 },    // starry night
      { name: "squares", weight: 1, h: 495 },   // squares
      { name: "spiro", weight: 1, h: 495 },
    ];
    var total = sketches.reduce(function (n, s) { return n + s.weight; }, 0);
    var roll = Math.random() * total;
    var pick = sketches[0];
    for (var i = 0; i < sketches.length; i++) {
      roll -= sketches[i].weight;
      if (roll < 0) { pick = sketches[i]; break; }
    }
    var frame = document.getElementById("home-sketch");
    frame.style.height = pick.h + "px";
    frame.src = "interactive/sketches/" + pick.name + "/" + pick.name + "-embed.html";
  })();
</script>
