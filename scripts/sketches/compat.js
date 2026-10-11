/* compat.js
   Helpers older sketches call that are no longer in p5-utilities */

function randomPalette1000() {
    let index = ~~random(min(1000, allPalettes.length));
    console.log("Palette index: " + index);
    return allPalettes[index];
}
