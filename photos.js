// Shows each photo in a <figure class="photo"> as a two-tone ordered dither in the site's ink and paper,
// at the same dot size as the dithered canvas, with the real photo underneath. Hovering (or tapping) a
// photo fades the dither out to show it. Each photo is dithered once, into its own canvas, so it scrolls
// with the page instead of lagging behind like anything drawn on the page canvas would.
//
// The figure needs a size (an aspect-ratio, a grid cell, or the img's width and height). The photo fills
// it, cropped to the middle, or wherever data-crop="x y zoom" says: x and y from 0 to 1 slide the crop
// across the photo, and zoom over 1 crops in tighter.
//
// An animated photo (a wiggle GIF or WebP) is dithered as a still, so it only moves while it shows in color.
// A video works the same way: put its first frame in the img, then a muted, looping <video> after it. It
// plays while it shows in color and rewinds once the dither is back over it.
(() => {
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

    const page = document.getElementById("dither");
    const rgb = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
        .match(/[\da-f]{2}|[\da-f]/gi).map((h) => parseInt(h.length === 1 ? h + h : h, 16));

    // Where a photo of size nw x nh sits in a box of bw x bh: fills it, then data-crop moves and zooms it
    function place(fig, nw, nh, bw, bh) {
        const [x = 0.5, y = 0.5, zoom = 1] = (fig.dataset.crop || "").split(" ").filter(Boolean).map(Number);
        const s = Math.max(bw / nw, bh / nh) * zoom;
        const w = nw * s, h = nh * s;
        return { left: (bw - w) * x, top: (bh - h) * y, w, h };
    }

    // Dither img, placed in a box of the figure's size, into the canvas's W x H pixels
    function dither(c, img, fig, box, cell) {
        const W = c.canvas.width, H = c.canvas.height;
        const p = place(fig, img.naturalWidth, img.naturalHeight, box.width, box.height);
        c.fillStyle = "#000";
        c.fillRect(0, 0, W, H);
        c.drawImage(img, p.left / cell, p.top / cell, p.w / cell, p.h / cell);
        const data = c.getImageData(0, 0, W, H);
        const px = data.data;

        // Stretch the tones so the darkest and lightest 2% hit ink and paper
        const lum = new Float32Array(W * H);
        const hist = new Uint32Array(256);
        for (let i = 0; i < lum.length; i++) {
            const v = 0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2];
            lum[i] = v;
            hist[v | 0]++;
        }
        let lo = 0, hi = 255;
        for (let n = 0; n + hist[lo] < lum.length * 0.02; lo++) n += hist[lo];
        for (let n = 0; n + hist[hi] < lum.length * 0.02; hi--) n += hist[hi];
        const span = Math.max(1, hi - lo);

        // Bright parts of the photo take whichever of ink and paper is lighter, so dark mode isn't a negative
        const ink = rgb("--ink"), paper = rgb("--paper");
        const [light, dark] = ink[0] + ink[1] + ink[2] > paper[0] + paper[1] + paper[2] ? [ink, paper] : [paper, ink];
        for (let y = 0; y < H; y++) {
            const row = BAYER[y & 7];
            for (let x = 0; x < W; x++) {
                const i = y * W + x;
                const col = Math.min(1, Math.max(0, (lum[i] - lo) / span)) > row[x & 7] ? light : dark;
                px[i * 4] = col[0];
                px[i * 4 + 1] = col[1];
                px[i * 4 + 2] = col[2];
                px[i * 4 + 3] = 255;
            }
        }
        return data;
    }

    function draw(fig) {
        const img = fig.querySelector("img");
        const canvas = fig.querySelector("canvas");
        if (!img.complete || !img.naturalWidth) return;
        // Same dot size as the page canvas
        const target = innerWidth < 640 ? +(page?.dataset.cellPhone || 1.5) : +(page?.dataset.cell || 2);
        const cell = Math.max(1, Math.round(target * devicePixelRatio)) / devicePixelRatio;
        // The layout size, which ignores any tilt (a bounding rect would include it)
        const box = { width: fig.offsetWidth, height: fig.offsetHeight };
        canvas.width = Math.max(1, Math.round(box.width / cell));
        canvas.height = Math.max(1, Math.round(box.height / cell));
        const c = canvas.getContext("2d", { willReadFrequently: true });

        // With data-crop, the real photo is placed by hand to match the dither
        if (fig.dataset.crop) {
            const p = place(fig, img.naturalWidth, img.naturalHeight, box.width, box.height);
            Object.assign(img.style, {
                position: "absolute", maxWidth: "none", objectFit: "fill",
                left: `${p.left}px`, top: `${p.top}px`, width: `${p.w}px`, height: `${p.h}px`,
            });
        }

        try {
            c.putImageData(dither(c, img, fig, box, cell), 0, 0);
        } catch {
            // A photo from another site without CORS can't be read; show the real photo instead
            canvas.remove();
        }
        fig.classList.add("dithered");
    }

    const showing = new Set(); // the figures on screen

    // Called when a photo's color may have changed. Not on leaving a photo, since its color lingers: the
    // canvas's transitionend catches the dither coming back
    function syncVideo(fig) {
        const video = fig.querySelector("video");
        if (!video) return;
        const color = fig.matches(":hover") || fig.classList.contains("open");
        if (color && showing.has(fig)) video.play().catch(() => {});
        else {
            video.pause();
            if (!color) video.currentTime = 0; // The dither shows the first frame
        }
    }

    const figs = [...document.querySelectorAll("figure.photo")];
    const watch = new IntersectionObserver((entries) => {
        for (const e of entries) {
            e.isIntersecting ? showing.add(e.target) : showing.delete(e.target);
            syncVideo(e.target);
        }
    });
    for (const fig of figs) {
        const canvas = document.createElement("canvas");
        fig.appendChild(canvas);
        const img = fig.querySelector("img");
        img.addEventListener("load", () => draw(fig));
        draw(fig);
        // Touch screens have no hover: a tap shows the photo, another tap dithers it again
        fig.addEventListener("click", () => {
            fig.classList.toggle("open");
            syncVideo(fig);
        });
        fig.addEventListener("pointerenter", () => syncVideo(fig));
        canvas.addEventListener("transitionend", () => syncVideo(fig));
        watch.observe(fig);
    }

    const redraw = () => figs.forEach(draw);
    // Phones report a resize whenever the address bar slides away during a scroll; photos only care about width
    let timer, lastWidth = innerWidth;
    addEventListener("resize", () => {
        if (innerWidth === lastWidth) return;
        lastWidth = innerWidth;
        clearTimeout(timer);
        timer = setTimeout(redraw, 150);
    });
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw);
})();
