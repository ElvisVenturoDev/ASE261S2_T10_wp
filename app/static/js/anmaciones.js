/* =========================================================
   1. Scroll reveal: las secciones aparecen al entrar al viewport.
   2. Efectos ligados al scroll (barra de progreso, parallax del hero y
      sombra del encabezado) resueltos en UN ÚNICO frame de animación:
      primero se leen todas las medidas y luego se escriben los estilos.
      Así se evita el "layout thrashing" y se mantienen animaciones fluidas.
   ========================================================= */

(() => {
    "use strict";

    // Le avisa al <head> que el script cargó (ver base.html).
    window.__animReady = true;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = () => reducedMotionQuery.matches;

    /* ---------- 1. Scroll reveal ---------- */

    const initScrollReveal = () => {
        const items = [...document.querySelectorAll("[data-reveal]")];
        if (!items.length) return;

        // Escalonado automático: <div data-reveal-group="100"> con hijos [data-reveal].
        document.querySelectorAll("[data-reveal-group]").forEach((group) => {
            const step = Number(group.dataset.revealGroup) || 90;
            [...group.querySelectorAll(":scope > [data-reveal]")].forEach((child, index) => {
                if (!child.dataset.revealDelay) {
                    child.style.setProperty("--reveal-delay", `${index * step}ms`);
                }
            });
        });

        // Retraso manual: data-reveal-delay="200"
        items.forEach((item) => {
            if (item.dataset.revealDelay) {
                item.style.setProperty("--reveal-delay", `${Number(item.dataset.revealDelay) || 0}ms`);
            }
        });

        const show = (element) => element.classList.add("is-visible");

        if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
            items.forEach(show);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        show(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
        );

        items.forEach((item) => observer.observe(item));
    };

    /* ---------- 2. Efectos de scroll en un único frame ---------- */

    const initScrollEffects = () => {
        const progressBar = document.querySelector("[data-scroll-progress]");
        const parallaxLayer = document.querySelector("[data-parallax]");
        const header = document.querySelector("[data-site-header]");
        const hero = parallaxLayer ? parallaxLayer.parentElement : null;

        if (!progressBar && !parallaxLayer && !header) return;

        const motionOn = !prefersReducedMotion();
        if (progressBar && !motionOn) progressBar.hidden = true;

        let maxScroll = 0;
        const measure = () => {
            maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        };

        const update = () => {
            const y = window.scrollY || document.documentElement.scrollTop || 0;

            // --- Lecturas (siempre antes de escribir) ---
            let parallaxY = 0;
            if (motionOn && parallaxLayer && hero) {
                // El clamp ya resuelve el caso fuera de pantalla de forma continua.
                const rect = hero.getBoundingClientRect();
                parallaxY = Math.min(Math.max(-rect.top, 0), rect.height) * 0.1;
            }

            // --- Escrituras ---
            if (progressBar && motionOn) {
                const progress = maxScroll > 0 ? Math.min(Math.max(y / maxScroll, 0), 1) : 0;
                progressBar.style.setProperty("--scroll-progress", progress.toFixed(4));
            }
            if (parallaxLayer && motionOn) {
                parallaxLayer.style.setProperty("--parallax-y", `${parallaxY.toFixed(1)}px`);
            }
            // La elevación del header no es "movimiento"; se mantiene siempre.
            if (header) {
                header.classList.toggle("is-scrolled", y > 8);
            }
        };

        let ticking = false;
        const requestUpdate = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                ticking = false;
                update();
            });
        };

        const remeasure = () => {
            measure();
            requestUpdate();
        };

        measure();
        update();

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", remeasure, { passive: true });

        // El alto del documento cambia al filtrar el catálogo o abrir menús:
        // se recalcula sin lecturas forzadas por frame.
        if ("ResizeObserver" in window) {
            const resizeObserver = new ResizeObserver(remeasure);
            resizeObserver.observe(document.body);
        }

        // Reajuste final cuando terminan de cargar fuentes e imágenes.
        window.addEventListener("load", remeasure, { once: true });
    };

    initScrollReveal();
    initScrollEffects();
})();
