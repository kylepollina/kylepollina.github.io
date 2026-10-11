/* embed.js
 * Loaded after p5 on the bare sketch pages that the interactive gallery puts in iframes.
 * Keeps a page full of sketches cheap to run:
 *   - draws at 1x pixel density instead of the screen's 2x/3x (a quarter of the pixels on retina)
 *   - stops the draw loop whenever the iframe is scrolled out of view, and restarts it on return
 */

(function () {
    let visible = true;
    let paused = false;

    p5.prototype.registerMethod('init', function () {
        this._pixelDensity = 1;
    });

    // Runs before every draw(), so a hidden sketch stops after at most one more frame.
    // It also runs on redraw(), so check _loop: sketches that call noLoop() themselves and only
    // redraw on input must not be "resumed" into looping later.
    // (In global mode p5 calls this with `this` set to window, so go through p5.instance.)
    p5.prototype.registerMethod('pre', function () {
        if (!visible && !paused && p5.instance._loop) {
            paused = true;
            p5.instance.noLoop();
        }
    });

    window.addEventListener('load', function () {
        // With no root, the observer measures against the top-level page's viewport, even from inside an iframe
        new IntersectionObserver(function (entries) {
            visible = entries[entries.length - 1].isIntersecting;
            if (visible && paused) {
                paused = false;
                p5.instance.loop();
            }
        }).observe(document.body);
    });
})();
