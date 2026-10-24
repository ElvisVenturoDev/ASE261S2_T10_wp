(() => {
    const carousel = document.querySelector("[data-carousel]");

    if (!carousel) {
        return;
    }

    const track = carousel.querySelector("[data-carousel-track]");
    const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const indicators = [...carousel.querySelectorAll("[data-carousel-to]")];
    const toggle = carousel.querySelector("[data-carousel-toggle]");
    const counter = carousel.querySelector("[data-carousel-counter]");
    const status = carousel.querySelector("[data-carousel-status]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!track || slides.length === 0) {
        return;
    }

    const configuredInterval = Number(carousel.dataset.carouselInterval || 6500);
    const interval = Number.isFinite(configuredInterval) ? configuredInterval : 6500;
    let currentIndex = 0;
    let autoplayTimer = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let trackingPointer = false;

    const pad = (number) => String(number).padStart(2, "0");

    const goTo = (requestedIndex, announce = true) => {
        currentIndex = (requestedIndex + slides.length) % slides.length;
        track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;

        slides.forEach((slide, index) => {
            const active = index === currentIndex;
            slide.toggleAttribute("inert", !active);
            slide.setAttribute("aria-hidden", String(!active));
        });

        indicators.forEach((indicator, index) => {
            const active = index === currentIndex;
            indicator.dataset.active = String(active);
            if (active) {
                indicator.setAttribute("aria-current", "true");
            } else {
                indicator.removeAttribute("aria-current");
            }
        });

        if (counter) {
            counter.textContent = `${pad(currentIndex + 1)} / ${pad(slides.length)}`;
        }

        if (announce && status) {
            status.textContent = `Diapositiva ${currentIndex + 1} de ${slides.length}`;
        }
    };

    const stopAutoplay = () => {
        if (autoplayTimer !== null) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        if (toggle?.dataset.playing === "false") {
            return;
        }
        autoplayTimer = window.setInterval(() => goTo(currentIndex + 1, false), interval);
    };

    const setPlaying = (playing) => {
        if (!toggle) {
            return;
        }
        toggle.dataset.playing = String(playing);
        toggle.textContent = playing ? "Pausar" : "Reproducir";
        toggle.setAttribute("aria-label", playing ? "Pausar carrusel" : "Reproducir carrusel");
        if (playing) {
            startAutoplay();
        } else {
            stopAutoplay();
        }
    };

    const pauseTemporarily = () => stopAutoplay();
    const resumeAutoplay = () => {
        if (toggle?.dataset.playing !== "false") {
            startAutoplay();
        }
    };

    previous?.addEventListener("click", () => {
        goTo(currentIndex - 1);
    });

    next?.addEventListener("click", () => {
        goTo(currentIndex + 1);
    });

    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => {
            goTo(Number(indicator.dataset.carouselTo));
        });
    });

    toggle?.addEventListener("click", () => {
        setPlaying(toggle.dataset.playing !== "true");
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(currentIndex + 1);
        } else if (event.key === "Home") {
            event.preventDefault();
            goTo(0);
        } else if (event.key === "End") {
            event.preventDefault();
            goTo(slides.length - 1);
        }
    });

    carousel.addEventListener("mouseenter", pauseTemporarily);
    carousel.addEventListener("mouseleave", resumeAutoplay);
    carousel.addEventListener("focusin", pauseTemporarily);
    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            resumeAutoplay();
        }
    });

    carousel.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse") {
            return;
        }
        trackingPointer = true;
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
    });

    carousel.addEventListener("pointerup", (event) => {
        if (!trackingPointer) {
            return;
        }
        trackingPointer = false;
        const deltaX = event.clientX - pointerStartX;
        const deltaY = event.clientY - pointerStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            goTo(currentIndex + (deltaX < 0 ? 1 : -1));
        }
    });

    carousel.addEventListener("pointercancel", () => {
        trackingPointer = false;
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            resumeAutoplay();
        }
    });

    const handleMotionPreference = (event) => {
        if (event.matches) {
            setPlaying(false);
        } else {
            resumeAutoplay();
        }
    };

    if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", handleMotionPreference);
    } else {
        reducedMotion.addListener(handleMotionPreference);
    }

    carousel.setAttribute("tabindex", "0");
    if (reducedMotion.matches) {
        setPlaying(false);
    } else {
        setPlaying(true);
    }
    goTo(0, false);
})();
