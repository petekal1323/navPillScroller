<!-- <script>
    $(document).ready(function () {
        var scroller = document.querySelector("#pills-out-tab");
        var itemSelector = ".out-item";
        var btnSelector = ".out-item .nav-link";
        var parentNavSel = ".nav-outcomes";
        var counterCurSel = ".out-current";
        var counterTotSel = ".out-total";
        var prevSel = ".out-left .btn";
        var nextSel = ".out-right .btn";
        var GUTTER = 12;

        if (!scroller) return;

        // Scope queries to THIS rail so other navs don't interfere
        var parent = document.querySelector(parentNavSel);
        var items = Array.from(scroller.querySelectorAll(itemSelector));
        var btns = Array.from(scroller.querySelectorAll(btnSelector));
        var prev = document.querySelector(prevSel);
        var next = document.querySelector(nextSel);
        var counter = document.querySelector(counterCurSel);
        var total = document.querySelector(counterTotSel);

        if (!items.length || !counter || !total || !parent) return;

        // Helpers
        function clamp(n, lo, hi) {
            return Math.max(lo, Math.min(hi, n));
        }
        function getOrder(el) {
            var wrap = el.closest ? el.closest(itemSelector) : null;
            return parseInt((wrap && wrap.dataset.order) || "1", 10);
        }
        function itemByOrder(n) {
            return parent.querySelector('[data-order="' + n + '"]');
        }
        function overflowsX() {
            return scroller.scrollWidth > scroller.clientWidth + 1;
        }
        function inView() {
            var r = scroller.getBoundingClientRect();
            var vh = window.innerHeight || document.documentElement.clientHeight;
            return r.bottom > 0 && r.top < vh;
        }
        function focusOnScroll(el) {
            if (!el) return;
            if (!overflowsX() || !inView()) return;

            var order = parseInt(el.dataset.order || "1", 10);
            var isFirst = order === 1;
            var isLast = order === items.length;

            if (isFirst) {
                scroller.scrollTo({ left: 0, behavior: "smooth" });
                return;
            }
            if (isLast) {
                var maxLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
                // nudge left just a hair so the right border never clips
                var left = Math.max(maxLeft - GUTTER, 0);
                scroller.scrollTo({ left: left, behavior: "smooth" });
                return;
            }
            // middle pills
            if (window.innerWidth >= 768) {
                el.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "start" });
            } else {
                el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        }

        // Init counter + total from active
        total.textContent = String(items.length);
        var activeLink = scroller.querySelector(".nav-link.active");
        var currentIndex = activeLink ? getOrder(activeLink) : 1;
        counter.innerText = String(currentIndex);

        // Pin to start on load so IO doesn't think we're on #2
        requestAnimationFrame(function () {
            scroller.scrollTo({ left: 0, behavior: "auto" });
        });

        // --- Scroll-driven counter, but ONLY while user is scrolling ---
        var mode = "active"; // "active" (tab/paging) vs "scroll" (user drag/scroll)
        var idleTimer = 0;

        function startUserScroll(e) {
            if (e.target.closest && e.target.closest(".nav-link")) return;
            mode = "scroll";
            clearTimeout(idleTimer);
        }
        scroller.addEventListener("pointerdown", startUserScroll, { passive: true });
        scroller.addEventListener("touchstart", startUserScroll, { passive: true });
        scroller.addEventListener("wheel", startUserScroll, { passive: true });

        // Use IO to find the pill nearest center, but ignore while mode!=="scroll"
        function trackScroll() {
            var config = { root: scroller, rootMargin: "0% -50% 0% -50%", threshold: 0 };
            var observer = new IntersectionObserver(function (entries) {
                if (mode !== "scroll") return; // don't let layout/init flip us to 2/3
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var ord = parseInt(entry.target.dataset.order || "1", 10);
                        currentIndex = ord;
                        counter.innerText = String(currentIndex);
                    }
                });
            }, config);

            items.forEach(function (el) {
                observer.observe(el);
            });

            // when user stops scrolling for a moment, revert control to "active"
            scroller.addEventListener(
                "scroll",
                function () {
                    clearTimeout(idleTimer);
                    idleTimer = setTimeout(function () {
                        mode = "active";
                    }, 220);
                },
                { passive: true },
            );
        }

        function goToIndex(n) {
            mode = "active";
            currentIndex = clamp(n, 1, items.length);
            counter.innerText = String(currentIndex);
            focusOnScroll(itemByOrder(currentIndex));
        }
        function onNext() {
            goToIndex(currentIndex + 1);
        }
        function onPrev() {
            goToIndex(currentIndex - 1);
        }

        if (prev) prev.addEventListener("click", onPrev);
        if (next) next.addEventListener("click", onNext);

        // Click/tab activation keeps counter in sync and recenters
        btns.forEach(function (btn) {
            function activate() {
                mode = "active";
                currentIndex = getOrder(btn);
                counter.innerText = String(currentIndex);
                focusOnScroll(btn.closest(itemSelector));
            }
            btn.addEventListener("click", activate);
            btn.addEventListener("shown.bs.tab", activate);
        });

        trackScroll();

        // On first paint, respect active tab and avoid clipping
        requestAnimationFrame(function () {
            if (inView() && overflowsX()) {
                if (currentIndex === 1) {
                    scroller.scrollTo({ left: 0, behavior: "auto" });
                } else if (currentIndex === items.length) {
                    var maxLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
                    scroller.scrollTo({ left: Math.max(maxLeft - GUTTER, 0), behavior: "auto" });
                } else {
                    focusOnScroll(itemByOrder(currentIndex));
                }
            }
        });

        // Keep alignment on resize
        window.addEventListener("resize", function () {
            mode = "active";
            counter.innerText = String(currentIndex);
            if (inView() && overflowsX()) {
                if (currentIndex === 1) {
                    scroller.scrollTo({ left: 0, behavior: "auto" });
                } else if (currentIndex === items.length) {
                    var maxLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
                    scroller.scrollTo({ left: Math.max(maxLeft - GUTTER, 0), behavior: "auto" });
                } else {
                    focusOnScroll(itemByOrder(currentIndex));
                }
            }
        });
    });
</script> -->