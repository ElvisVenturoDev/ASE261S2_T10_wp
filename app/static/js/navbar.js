(() => {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");

    if (!toggle || !menu) {
        return;
    }

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const firstMenuLink = menu.querySelector("a");

    const setMenuState = (open, returnFocus = false) => {
        menu.classList.toggle("hidden", !open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");

        if (returnFocus) {
            toggle.focus();
        }
    };

    toggle.addEventListener("click", () => {
        const willOpen = toggle.getAttribute("aria-expanded") !== "true";
        setMenuState(willOpen);
        if (willOpen) {
            firstMenuLink?.focus();
        }
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setMenuState(false, true);
        }
    });

    document.addEventListener("click", (event) => {
        if (
            toggle.getAttribute("aria-expanded") === "true" &&
            !menu.contains(event.target) &&
            !toggle.contains(event.target)
        ) {
            setMenuState(false);
        }
    });

    const closeForDesktop = (event) => {
        if (event.matches) {
            setMenuState(false);
        }
    };

    if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", closeForDesktop);
    } else {
        desktopQuery.addListener(closeForDesktop);
    }
})();
