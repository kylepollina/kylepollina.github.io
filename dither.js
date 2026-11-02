// Dithered rendering for a normal HTML page. The page is laid out by CSS as usual, with its text set to
// color: transparent; this script finds every word on screen and paints it onto a low resolution canvas
// behind the page with the same ordered dither, light band, ripple and mouse trail as the home page.
// The real text stays in the page, so links, selection, search and screen readers all still work.
//
// Needs a <canvas id="dither"> styled to cover the viewport (site.css does it). Its data-cell and
// data-cell-phone set the dot size in screen pixels, 2 and 1.5 if left out. Text at least BIG dither pixels tall is
// drawn soft with a glow around it (headings); smaller text is drawn crisp so it stays readable.
//
// Text inside .prose is for reading: site.css shows the real text in solid ink and nothing is drawn under
// it, since anything drawn under it trails behind while scrolling (the canvas repaints a frame late). The
// paper behind prose is kept plain, with no texture or trail, fading out softly past its edges.
(() => {
    // Keep in step with the colors in site.css
    const THEMES = {
        light: { ink: [17, 17, 17], paper: [236, 232, 220], grain: 0.07, glow: 0.45, letter: 0.06, band: 0.55 },
        dark: { ink: [214, 208, 192], paper: [22, 21, 19], grain: 0.035, glow: 0.3, letter: 0.2, band: -0.35 },
    };
    const BIG = 28; // dither pixels
    const TRAIL_RADIUS = 9; // dither pixels
    const TRAIL_FADE = 1.1; // seconds for the trail to drop to about a third; gone in about 3
    const CLEAR = 12; // how far the plain column fades out past the prose, in dither pixels

    const darkMode = matchMedia("(prefers-color-scheme: dark)");
    let theme;
    const applyTheme = () => (theme = darkMode.matches ? THEMES.dark : THEMES.light);
    applyTheme();
    darkMode.addEventListener("change", applyTheme);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = document.getElementById("dither");
    const ctx = canvas.getContext("2d");
    const off = document.createElement("canvas");
    const o = off.getContext("2d", { willReadFrequently: true });

    // 8x8 Bayer matrix for the ordered dither
    const BAYER = (() => {
        let m = [[0]];
        while (m.length < 8) {
            const n = m.length, next = [];
            for (let y = 0; y < n * 2; y++) {
                next.push([]);
                for (let x = 0; x < n * 2; x++)
                    next[y].push(4 * m[y % n][x % n] + [0, 2, 3, 1][(y < n ? 0 : 2) + (x < n ? 0 : 1)]);
            }
            m = next;
        }
        return m.map((row) => row.map((v) => (v + 0.5) / 64));
    })();

    // CELL is screen pixels per dither pixel, rounded so each dot is a whole number of device pixels
    let CELL, W, H, img, core, halo, small, clean, trail;
    let hoverRects = [];

    function resize() {
        const target = innerWidth < 640 ? +(canvas.dataset.cellPhone || 1.5) : +(canvas.dataset.cell || 2);
        CELL = Math.max(1, Math.round(target * devicePixelRatio)) / devicePixelRatio;
        // A hidden tab or iframe can report a zero-size window; keep at least one cell
        W = Math.max(1, Math.ceil(innerWidth / CELL));
        H = Math.max(1, Math.ceil(innerHeight / CELL));
        canvas.width = off.width = W;
        canvas.height = off.height = H;
        img = ctx.createImageData(W, H);
        trail = new Float32Array(W * H);
        last = null;

        paint();
    }

    // Every word on screen, with where CSS put it and the font it's in
    function words() {
        const out = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        for (let node; (node = walker.nextNode()); ) {
            const el = node.parentElement;
            if (!el || el.closest("script, style, canvas, .sr-only, .prose")) continue;
            const cs = getComputedStyle(el);
            const size = parseFloat(cs.fontSize) / CELL;
            const font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
            for (const m of node.data.matchAll(/\S+/g)) {
                range.setStart(node, m.index);
                range.setEnd(node, m.index + m[0].length);
                const r = range.getClientRects()[0];
                if (!r || r.bottom < 0 || r.top > innerHeight || r.width === 0) continue;
                out.push({ text: m[0], x: r.left / CELL, bottom: r.bottom / CELL, font, size });
            }
        }
        return out;
    }

    // The descent puts a word's baseline where CSS has it: its box bottom is the font's descent below it
    const baseline = (w) => {
        o.font = w.font;
        const d = o.measureText(w.text).fontBoundingBoxDescent;
        return w.bottom - (d === undefined ? w.size * 0.25 : d);
    };

    const read = () => {
        const d = o.getImageData(0, 0, W, H).data;
        const out = new Float32Array(W * H);
        for (let i = 0; i < out.length; i++) out[i] = d[i * 4] / 255;
        return out;
    };
    const clear = () => {
        o.shadowBlur = 0;
        o.fillStyle = "#000";
        o.fillRect(0, 0, W, H);
        o.fillStyle = "#fff";
    };

    // Draw the text into the masks: crisp small text (and link underlines), soft headings, and a glow
    function paint() {
        if (!W) return;
        const all = words();

        // How plain the paper is: 1 over prose, fading to 0 CLEAR pixels past it
        clean = new Float32Array(W * H);
        for (const el of document.querySelectorAll(".prose")) {
            const r = el.getBoundingClientRect();
            const x0 = r.left / CELL, x1 = r.right / CELL, y0 = r.top / CELL, y1 = r.bottom / CELL;
            for (let y = Math.max(0, Math.floor(y0 - CLEAR)); y < Math.min(H, y1 + CLEAR); y++) {
                const fy = 1 - Math.min(1, Math.max(y0 - y, y - y1, 0) / CLEAR);
                for (let x = Math.max(0, Math.floor(x0 - CLEAR)); x < Math.min(W, x1 + CLEAR); x++) {
                    const v = fy * (1 - Math.min(1, Math.max(x0 - x, x - x1, 0) / CLEAR));
                    const i = y * W + x;
                    if (v > clean[i]) clean[i] = v;
                }
            }
        }
        o.textBaseline = "alphabetic";
        o.textAlign = "left";

        clear();
        for (const w of all.filter((w) => w.size < BIG)) o.fillText(w.text, w.x, baseline(w));
        // Links in running text (not nav or prose, which has real underlines) get an underline, one per line
        for (const a of document.querySelectorAll("main a:not(nav a, .prose a)")) {
            const cs = getComputedStyle(a);
            const size = parseFloat(cs.fontSize) / CELL;
            if (size >= BIG) continue;
            for (const r of a.getClientRects()) {
                const y = baseline({ text: a.textContent, bottom: r.bottom / CELL, size, font: `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}` });
                o.fillRect(Math.round(r.left / CELL), Math.round(y + size * 0.14), Math.round(r.width / CELL), 1);
            }
        }
        const s = read();
        small = new Uint8Array(W * H);
        for (let i = 0; i < s.length; i++) small[i] = s[i] > 0.45 ? 1 : 0;

        const big = all.filter((w) => w.size >= BIG);
        const drawBig = (glow) => {
            clear();
            for (const w of big) {
                o.shadowColor = "#fff";
                o.shadowBlur = glow ? w.size * 0.35 : 0;
                o.fillText(w.text, w.x, baseline(w));
            }
            return read();
        };
        core = drawBig(false);
        for (let i = 0; i < core.length; i++) if (small[i]) core[i] = 1;
        halo = drawBig(true);
        hover();
    }

    // A hovered or focused link goes solid, like the labels on the home page
    let hovered = null;
    function hover() {
        hoverRects = hovered
            ? [...hovered.getClientRects()].map((r) => [
                  Math.max(0, Math.floor(r.left / CELL)), Math.max(0, Math.floor(r.top / CELL)),
                  Math.min(W, Math.ceil(r.right / CELL)), Math.min(H, Math.ceil(r.bottom / CELL) + 2),
              ])
            : [];
    }
    for (const a of document.querySelectorAll("a")) {
        const on = () => { hovered = a; hover(); };
        const leave = () => { if (hovered === a) { hovered = null; hover(); } };
        a.addEventListener("pointerenter", on);
        a.addEventListener("pointerleave", leave);
        a.addEventListener("focus", () => a.matches(":focus-visible") && on());
        a.addEventListener("blur", leave);
    }

    // The mouse leaves a trail that thickens the dither under it and twinkles, then fades out
    let last = null;
    const stamp = (cx, cy) => {
        const r = TRAIL_RADIUS;
        for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(H - 1, cy + r); y++) {
            for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(W - 1, cx + r); x++) {
                const d2 = ((x - cx) ** 2 + (y - cy) ** 2) / (r * r);
                if (d2 >= 1) continue;
                const v = Math.exp(-d2 * 3) * (1 - d2);
                const i = y * W + x;
                if (v > trail[i]) trail[i] = v;
            }
        }
    };
    addEventListener("pointermove", (e) => {
        if (!trail) return;
        const p = [e.clientX / CELL, e.clientY / CELL];
        // Stamp along the path so a fast swipe draws a line, not dots
        const [ax, ay] = last || p;
        const steps = Math.max(1, Math.ceil(Math.hypot(p[0] - ax, p[1] - ay) / (TRAIL_RADIUS / 3)));
        for (let s = 1; s <= steps; s++) stamp(ax + ((p[0] - ax) * s) / steps, ay + ((p[1] - ay) * s) / steps);
        last = p;
    });
    document.addEventListener("pointerout", (e) => {
        if (!e.relatedTarget) last = null;
    });

    let lastFrame;
    function frame(t) {
        requestAnimationFrame(frame);
        if (!core) return;
        const time = reduce ? 0 : t / 1000;
        const dt = lastFrame === undefined ? 0 : Math.min(0.1, (t - lastFrame) / 1000);
        lastFrame = t;
        const keep = Math.exp(-dt / TRAIL_FADE);
        const tick = Math.floor(t / 90);
        const px = img.data;
        const { ink: INK, paper: PAPER, grain, glow, letter: letterBase, band: bandAmount } = theme;
        const sweep = ((time * 0.18) % 1.6) - 0.3;
        for (let y = 0; y < H; y++) {
            const brow = BAYER[y & 7];
            for (let x = 0; x < W; x++) {
                const i = y * W + x;
                const c = core[i], h = halo[i];
                // Paper is near white with a faint vertical falloff and a glow around headings, both
                // left out behind prose
                const plain = clean[i];
                let lum = 1.01 - (grain * (y / H) ** 2 + glow * h * (1 - c)) * (1 - plain);
                if (c > 0) {
                    // Small text gets half the shading so it stays readable as the band passes
                    const k = small[i] ? 0.5 : 1;
                    const u = (x / W) * 0.8 + (y / H) * 0.5;
                    const band = Math.exp(-((u - sweep) ** 2) / 0.012);
                    const ripple = 0.06 * Math.sin(x * 0.09 + y * 0.05 + time * 1.3);
                    const letter = letterBase + k * (0.28 * (y / H) + bandAmount * band + ripple);
                    lum = lum * (1 - c) + letter * c;
                }

                let threshold = brow[x & 7];
                let tr = trail[i];
                if (tr > 0.004) {
                    tr *= keep;
                    trail[i] = tr;
                    // The trail fades out going into prose
                    const strength = tr * (1 - plain);
                    lum -= 0.55 * strength;
                    let n = (x * 374761393 + y * 668265263 + tick * 2246822519) | 0;
                    n = Math.imul(n ^ (n >>> 13), 1274126177);
                    threshold += strength * 0.6 * (((n ^ (n >>> 16)) & 1023) / 1023 - 0.5);
                } else if (tr) trail[i] = 0;

                const col = lum < threshold ? INK : PAPER;
                const p = i * 4;
                px[p] = col[0];
                px[p + 1] = col[1];
                px[p + 2] = col[2];
                px[p + 3] = 255;
            }
        }
        for (const [x0, y0, x1, y1] of hoverRects)
            for (let y = y0; y < y1; y++)
                for (let x = x0; x < x1; x++) {
                    if (core[y * W + x] < 0.5) continue;
                    const p = (y * W + x) * 4;
                    px[p] = INK[0];
                    px[p + 1] = INK[1];
                    px[p + 2] = INK[2];
                }
        ctx.putImageData(img, 0, 0);
    }

    let resizeTimer, scrollQueued;
    addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 100);
    });
    addEventListener("scroll", () => {
        if (scrollQueued) return;
        scrollQueued = true;
        requestAnimationFrame(() => {
            scrollQueued = false;
            paint();
        });
    });

    // Wait for the fonts so the canvas doesn't draw in a fallback face
    document.fonts.ready.then(resize);
    document.fonts.addEventListener("loadingdone", paint);
    requestAnimationFrame(frame);
})();
