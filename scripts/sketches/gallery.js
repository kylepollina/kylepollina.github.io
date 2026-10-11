/* gallery.js
 * The interactive page shows every sketch at once. Each one runs in its own iframe (they're
 * p5 global-mode sketches, so they can't share a page), and an iframe only exists while its
 * card is within about a screen of the viewport. Scrolling away tears it down, so only a
 * handful of sketches are ever loaded. embed.js pauses the ones loaded but out of view.
 */

(function () {
    function mount(card) {
        if (card.querySelector('iframe')) return;
        const frame = document.createElement('iframe');
        frame.src = card.dataset.src;
        frame.title = card.dataset.title;
        card.querySelector('.sketch-frame').appendChild(frame);
    }

    function unmount(card) {
        const frame = card.querySelector('iframe');
        if (frame) frame.remove();
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) mount(entry.target);
            else unmount(entry.target);
        });
    }, { rootMargin: '100% 0px' });

    document.querySelectorAll('.sketch-card').forEach(function (card) {
        observer.observe(card);
    });
})();
