(() => {
    const grid = document.querySelector("[data-catalog-grid]");
    const search = document.querySelector("#product-search");
    const category = document.querySelector("#category-filter");
    const sort = document.querySelector("#sort-products");
    const empty = document.querySelector("[data-catalog-empty]");
    const count = document.querySelector("[data-catalog-count]");
    const reset = document.querySelector("[data-catalog-reset]");
    const tabs = [...document.querySelectorAll("[data-category-tabs] [data-category]")];

    if (!grid || !search || !category || !sort || !empty) {
        return;
    }

    const cards = [...grid.querySelectorAll("[data-catalog-card]")];
    const originalOrder = new Map(cards.map((card, index) => [card, index]));
    const favoriteKey = "santaclara-favorites";

    const readFavorites = () => {
        try {
            const stored = JSON.parse(localStorage.getItem(favoriteKey) || "[]");
            return new Set(Array.isArray(stored) ? stored : []);
        } catch {
            return new Set();
        }
    };

    const favorites = readFavorites();

    const saveFavorites = () => {
        try {
            localStorage.setItem(favoriteKey, JSON.stringify([...favorites]));
        } catch {
            // El catálogo sigue funcionando si el navegador bloquea el almacenamiento.
        }
    };

    const isFeatured = (card) => card.dataset.featured === "true";

    const syncTabs = () => {
        tabs.forEach((tab) => {
            const active = tab.dataset.category === category.value;
            tab.setAttribute("aria-pressed", String(active));
            tab.classList.toggle("bg-navy", active);
            tab.classList.toggle("text-white", active);
            tab.classList.toggle("border-transparent", active);
            tab.classList.toggle("border-slate-200", !active);
            tab.classList.toggle("bg-white", !active);
            tab.classList.toggle("text-slate-600", !active);
        });
    };

    const updateCatalog = () => {
        const query = search.value.trim().toLocaleLowerCase("es");
        const selectedCategory = category.value;
        const selectedSort = sort.value;
        const matches = cards.filter((card) => {
            const name = card.dataset.name.toLocaleLowerCase("es");
            const matchesSearch = name.includes(query);
            let matchesCategory;
            if (selectedCategory === "all") {
                matchesCategory = true;
            } else if (selectedCategory === "destacados") {
                matchesCategory = isFeatured(card);
            } else {
                matchesCategory = card.dataset.category === selectedCategory;
            }
            return matchesSearch && matchesCategory;
        });

        cards.forEach((card) => {
            const isMatch = matches.includes(card);
            if (isMatch && card.hidden) {
                card.hidden = false;
                card.style.animation = "none";
                card.offsetHeight;
                card.style.animation = "card-enter 0.4s cubic-bezier(0.22, 1, 0.36, 1) both";
            } else if (!isMatch) {
                card.hidden = true;
            }
        });

        matches.sort((first, second) => {
            if (selectedSort === "name") {
                return first.dataset.name.localeCompare(second.dataset.name, "es");
            }
            if (selectedSort === "price") {
                return Number(first.dataset.price) - Number(second.dataset.price);
            }
            if (selectedSort === "price-desc") {
                return Number(second.dataset.price) - Number(first.dataset.price);
            }
            // "Destacados": primero los destacados, luego por calificación y orden original
            const featuredDiff = Number(isFeatured(second)) - Number(isFeatured(first));
            if (featuredDiff !== 0) {
                return featuredDiff;
            }
            const ratingDiff = Number(second.dataset.rating || 0) - Number(first.dataset.rating || 0);
            if (ratingDiff !== 0) {
                return ratingDiff;
            }
            return originalOrder.get(first) - originalOrder.get(second);
        });

        matches.forEach((card) => grid.append(card));
        empty.hidden = matches.length > 0;

        if (count) {
            const isEnglish = document.documentElement.lang.startsWith("en");
            const label = isEnglish
                ? (matches.length === 1 ? "product available" : "products available")
                : (matches.length === 1 ? "producto disponible" : "productos disponibles");
            count.textContent = `${matches.length} ${label}`;
        }
    };

    const resetFilters = () => {
        search.value = "";
        category.value = "all";
        sort.value = "featured";
        syncTabs();
        updateCatalog();
        search.focus();
    };

    cards.forEach((card) => {
        const button = card.querySelector("[data-favorite]");
        const productId = card.dataset.productId;
        const productName = card.dataset.name;

        if (button) {
            const syncFavorite = () => {
                const selected = favorites.has(productId);
                button.setAttribute("aria-pressed", String(selected));
                button.setAttribute(
                    "aria-label",
                    `${selected ? "Quitar" : "Añadir"} ${productName} ${selected ? "de" : "a"} favoritos`,
                );
                const icon = button.querySelector("[data-favorite-icon]");
                if (icon) {
                    icon.textContent = selected ? "♥" : "♡";
                }
                button.classList.toggle("text-rose-500", selected);
            };

            button.addEventListener("click", () => {
                if (favorites.has(productId)) {
                    favorites.delete(productId);
                } else {
                    favorites.add(productId);
                }
                saveFavorites();
                syncFavorite();
                button.classList.remove("is-favorited");
                void button.offsetWidth;
                button.classList.add("is-favorited");
            });

            syncFavorite();
        }
    });

    search.addEventListener("input", updateCatalog);
    sort.addEventListener("change", updateCatalog);
    category.addEventListener("change", () => {
        syncTabs();
        updateCatalog();
    });

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            category.value = tab.dataset.category;
            syncTabs();
            updateCatalog();
        });
    });

    reset?.addEventListener("click", resetFilters);

    const focusSearch = new URLSearchParams(window.location.search).get("focus") === "search";
    if (focusSearch) {
        window.setTimeout(() => search.focus(), 0);
    }

    syncTabs();
    updateCatalog();
})();