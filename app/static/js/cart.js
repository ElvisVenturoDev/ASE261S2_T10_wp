/* =========================================================
   CARRITO DE COMPRAS - SANTA CLARA
   Módulo completo con persistencia en localStorage
   ========================================================= */

const Cart = (() => {
    const STORAGE_KEY = "santaclara-cart";
    const AUTO_CLOSE_MS = 2500;
    const listeners = new Set();

    // ---------- Utilidades ----------

    const formatPrice = (amount) => `S/ ${amount.toFixed(2)}`;

    // En móvil el panel se comporta como "hoja inferior"; en escritorio sigue siendo
    // una tarjeta flotante. `lg` de Tailwind equivale a 1024px.
    const isMobileViewport = () =>
        typeof window.matchMedia === "function" &&
        window.matchMedia("(max-width: 1023px)").matches;

    const addedMessage = () => {
        let lang = "es";
        try {
            lang = localStorage.getItem("santaclara-language") || "es";
        } catch {
            // Si el almacenamiento está bloqueado se usa el idioma por defecto.
        }
        return lang === "en" ? "Added to cart" : "Producto agregado al carrito";
    };

    const readCart = () => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            return Array.isArray(stored) ? stored : [];
        } catch {
            return [];
        }
    };

    const saveCart = (items) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // El carrito sigue funcionando en memoria si el navegador bloquea el almacenamiento.
        }
        notify();
    };

    const notify = () => {
        const items = getItems();
        const count = getTotalItems();
        const total = getTotal();
        listeners.forEach((fn) => fn({ items, count, total }));
    };

    // ---------- API pública ----------

    const getItems = () => readCart();

    const getTotalItems = () => readCart().reduce((sum, item) => sum + item.quantity, 0);

    const getTotal = () =>
        readCart().reduce((sum, item) => sum + item.price * item.quantity, 0);

    const addItem = (product) => {
        const items = readCart();
        const existing = items.find((item) => item.id === product.id);

        if (existing) {
            existing.quantity = Math.min(99, existing.quantity + 1);
        } else {
            items.push({
                id: product.id,
                name: product.name,
                detail: product.detail,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
        }

        saveCart(items);
        return { items, added: true };
    };

    const removeItem = (productId) => {
        const items = readCart().filter((item) => item.id !== productId);
        saveCart(items);
        return items;
    };

    const updateQuantity = (productId, quantity) => {
        const items = readCart();
        const item = items.find((i) => i.id === productId);

        if (item) {
            if (quantity <= 0) {
                return removeItem(productId);
            }
            item.quantity = Math.min(99, quantity);
            saveCart(items);
        }
        return items;
    };

    const clear = () => {
        saveCart([]);
    };

    const onChange = (fn) => {
        listeners.add(fn);
        return () => listeners.delete(fn);
    };

    // ---------- Renderizado del panel ----------

    const renderCartPanel = () => {
        const panel = document.getElementById("cart-panel");
        const itemsContainer = document.getElementById("cart-items");
        const totalElement = document.getElementById("cart-total");
        const countElement = document.getElementById("cart-count");
        const checkoutBtn = document.getElementById("cart-checkout");

        if (!panel || !itemsContainer || !totalElement || !countElement) return;

        const items = getItems();
        const total = getTotal();
        const count = getTotalItems();

        // Actualizar contador del navbar (con un pequeño rebote al cambiar)
        const previousCount = Number(countElement.dataset.count || 0);
        const mobileCountElement = document.getElementById("cart-count-mobile");
        [countElement, mobileCountElement].forEach((badge) => {
            if (!badge) return;
            badge.textContent = count;
            badge.classList.toggle("hidden", count === 0);
        });
        countElement.dataset.count = String(count);
        if (count !== previousCount) {
            [countElement, mobileCountElement].forEach((badge) => {
                if (!badge) return;
                badge.classList.remove("is-bumped");
                void badge.offsetWidth;
                badge.classList.add("is-bumped");
            });
        }

        // Actualizar total
        totalElement.textContent = formatPrice(total);

        // Habilitar/deshabilitar botón de checkout
        if (checkoutBtn) {
            checkoutBtn.disabled = count === 0;
        }

        // Renderizar items
        if (items.length === 0) {
            itemsContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="text-4xl" aria-hidden="true">🛒</span>
                    <p class="mt-4 text-sm font-semibold text-navy">Tu carrito está vacío</p>
                    <p class="mt-1 text-xs text-slate-500">Agrega productos para comenzar</p>
                </div>
            `;
            return;
        }

        itemsContainer.innerHTML = items
            .map(
                (item) => `
            <div class="flex gap-4 rounded-xl border border-slate-100 bg-white p-3" data-cart-item="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="h-16 w-16 rounded-lg object-cover" width="64" height="64">
                <div class="flex flex-1 flex-col">
                    <div>
                        <h4 class="text-sm font-bold text-navy">${item.name}</h4>
                        <p class="text-xs text-slate-500">${item.detail}</p>
                    </div>
                    <div class="mt-2 flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <button type="button" class="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-navy transition hover:bg-slate-50" data-cart-decrease="${item.id}" aria-label="Disminuir cantidad">−</button>
                            <span class="w-8 text-center text-sm font-semibold text-navy" data-cart-quantity="${item.id}">${item.quantity}</span>
                            <button type="button" class="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm font-bold text-navy transition hover:bg-slate-50" data-cart-increase="${item.id}" aria-label="Aumentar cantidad">+</button>
                        </div>
                        <span class="text-sm font-bold text-field">${formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <button type="button" data-cart-remove="${item.id}" aria-label="Eliminar ${item.name} del carrito"
                        style="margin-top:10px;align-self:flex-start;display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;border:1px solid #ef4444;background:rgba(239,68,68,.12);color:#ef4444;font-size:12px;font-weight:700;cursor:pointer;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                        Eliminar
                    </button>
                </div>
            </div>
        `,
            )
            .join("");
    };

    // ---------- Animación "vuela al carrito" ----------

    const prefersReducedMotion = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getCartTarget = () => {
        const candidates = [
            document.getElementById("cart-toggle"),
            document.getElementById("cart-toggle-mobile"),
        ];
        return (
            candidates.find(
                (el) => el && el.getClientRects().length > 0 && el.getBoundingClientRect().width > 0,
            ) || null
        );
    };

    // Clona la imagen de origen y la anima en arco hasta el icono del carrito.
    const flyToCart = (source, imageUrl, onLanded) => {
        const finish = () => {
            if (typeof onLanded === "function") onLanded();
        };

        const target = getCartTarget();
        const canAnimate =
            typeof Element !== "undefined" && typeof Element.prototype.animate === "function";

        if (!source || !target || !canAnimate || prefersReducedMotion()) {
            finish();
            return;
        }

        const start = source.getBoundingClientRect();
        if (!start.width || !start.height) {
            finish();
            return;
        }

        const end = target.getBoundingClientRect();
        const size = Math.min(84, Math.max(start.width, start.height));
        const startX = start.left + start.width / 2 - size / 2;
        const startY = start.top + start.height / 2 - size / 2;
        const endX = end.left + end.width / 2 - size / 2;
        const endY = end.top + end.height / 2 - size / 2;
        const dx = endX - startX;
        const dy = endY - startY;
        const endScale = Math.max(end.width / size, 0.16);

        const floater = document.createElement("img");
        floater.src = imageUrl || source.currentSrc || source.src || "";
        floater.alt = "";
        floater.setAttribute("aria-hidden", "true");
        floater.className = "fly-to-cart";
        floater.style.width = `${size}px`;
        floater.style.height = `${size}px`;
        floater.style.transform = `translate(${startX}px, ${startY}px) scale(1)`;
        document.body.appendChild(floater);

        // Punto medio elevado: da la sensación de que el producto "flota" al viajar.
        const lift = Math.min(110, Math.abs(dx) * 0.35 + 50);
        const midX = startX + dx * 0.5;
        const midY = startY + dy * 0.5 - lift;

        let landed = false;
        const cleanup = () => {
            if (landed) return;
            landed = true;
            floater.remove();
            // Al aterrizar, el icono del carrito da un pequeño rebote.
            target.classList.remove("is-receiving");
            void target.offsetWidth;
            target.classList.add("is-receiving");
            window.setTimeout(() => target.classList.remove("is-receiving"), 620);
            finish();
        };

        const animation = floater.animate(
            [
                { transform: `translate(${startX}px, ${startY}px) scale(1)`, opacity: 1 },
                {
                    transform: `translate(${midX}px, ${midY}px) scale(0.62) rotate(5deg)`,
                    opacity: 0.95,
                    offset: 0.5,
                },
                { transform: `translate(${endX}px, ${endY}px) scale(${endScale})`, opacity: 0.12 },
            ],
            { duration: 820, easing: "cubic-bezier(0.33, 0.02, 0.3, 1)", fill: "forwards" },
        );

        animation.onfinish = cleanup;
        animation.oncancel = cleanup;
        // Red de seguridad por si "finish" no llegara a dispararse.
        window.setTimeout(cleanup, 1100);
    };

    // ---------- Eventos ----------

    const init = () => {
        const toggleBtn = document.getElementById("cart-toggle");
        const mobileToggleBtn = document.getElementById("cart-toggle-mobile");
        const panel = document.getElementById("cart-panel");
        const backdrop = document.getElementById("cart-backdrop");
        const closeBtn = document.getElementById("cart-close");
        const mobileNav = document.getElementById("mobile-nav");
        const menuBtn = document.getElementById("menu-btn");

        // Mantiene sincronizado el estado accesible de ambos botones del carrito.
        const setExpanded = (expanded) => {
            toggleBtn?.setAttribute("aria-expanded", String(expanded));
            mobileToggleBtn?.setAttribute("aria-expanded", String(expanded));
        };

        // --- Helpers para abrir/cerrar el panel ---
        const cancelAutoClose = () => {
            if (panel && panel._autoClose) {
                clearTimeout(panel._autoClose);
                panel._autoClose = null;
            }
        };

        const closePanel = () => {
            if (!panel) return;
            cancelAutoClose();
            panel.classList.add("hidden");
            backdrop?.classList.add("hidden");
            document.body.classList.remove("cart-open");
            setExpanded(false);
        };

        // Cierra el menú móvil si está abierto (no deben convivir con el carrito).
        const closeMobileNav = () => {
            if (mobileNav && !mobileNav.classList.contains("hidden")) {
                mobileNav.classList.add("hidden");
                menuBtn?.setAttribute("aria-expanded", "false");
                menuBtn?.setAttribute("aria-label", "Abrir menú");
            }
        };

        const openPanel = () => {
            if (!panel) return;
            cancelAutoClose();
            panel.classList.remove("hidden");
            // El fondo oscurecido solo tiene sentido con la hoja inferior (móvil).
            const asSheet = isMobileViewport();
            backdrop?.classList.toggle("hidden", !asSheet);
            document.body.classList.toggle("cart-open", asSheet);
            closeMobileNav();
            setExpanded(true);
        };

        // En escritorio, al agregar, el panel se abre y se cierra solo.
        // En móvil NO se abre: tapar la pantalla con cada producto era el problema.
        const openPanelBriefly = () => {
            if (isMobileViewport()) {
                if (typeof showToast === "function") showToast(addedMessage());
                return;
            }
            openPanel();
            panel._autoClose = setTimeout(closePanel, AUTO_CLOSE_MS);
        };

        // Toggle del panel (escritorio)
        if (toggleBtn && panel) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isOpen = !panel.classList.contains("hidden");
                if (isOpen) {
                    closePanel();
                } else {
                    openPanel();
                    renderCartPanel();
                }
            });
        }

        // Toggle del panel (móvil) — antes vivía en un script inline de base.html.
        if (mobileToggleBtn && panel) {
            mobileToggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isOpen = !panel.classList.contains("hidden");
                if (isOpen) {
                    closePanel();
                } else {
                    openPanel();
                    renderCartPanel();
                }
            });
        }

        // El menú móvil solicita cerrar el carrito cuando se abre.
        document.addEventListener("miskylac:close-cart", closePanel);

        if (closeBtn && panel) {
            closeBtn.addEventListener("click", closePanel);
        }

        // Si el usuario interactúa con el panel, no se cierra solo
        if (panel) {
            panel.addEventListener("mouseenter", cancelAutoClose);
            panel.addEventListener("focusin", cancelAutoClose);
        }

        // Cerrar al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (panel && !panel.classList.contains("hidden")) {
                const esToggle =
                    toggleBtn?.contains(e.target) ||
                    e.target.closest("#cart-toggle-mobile");
                if (!panel.contains(e.target) && !esToggle) {
                    closePanel();
                }
            }
        });

        // Cerrar con Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && panel && !panel.classList.contains("hidden")) {
                closePanel();
            }
        });

        // Si el panel está abierto y cambia el tamaño de la ventana, el fondo
        // oscurecido se ajusta (solo aplica a la hoja inferior de móvil).
        if (typeof window.matchMedia === "function") {
            const desktopQuery = window.matchMedia("(min-width: 1024px)");
            const syncBackdrop = () => {
                if (!panel || panel.classList.contains("hidden")) return;
                const asSheet = isMobileViewport();
                backdrop?.classList.toggle("hidden", !asSheet);
                document.body.classList.toggle("cart-open", asSheet);
            };
            desktopQuery.addEventListener?.("change", syncBackdrop);
        }

        // Eventos del carrito (delegación)
        document.addEventListener("click", (e) => {
            // ----- Agregar al carrito -----
            const addBtn = e.target.closest("[data-add-to-cart]");
            if (addBtn) {
                e.preventDefault();
                const product = {
                    id: addBtn.dataset.productId,
                    name: addBtn.dataset.productName,
                    detail: addBtn.dataset.productDetail,
                    price: parseFloat(addBtn.dataset.productPrice),
                    image: addBtn.dataset.productImage,
                };
                addItem(product);
                renderCartPanel();

                // Feedback visual: los botones de texto cambian a "✓ Agregado";
                // los botones de icono (agregado rápido) hacen un pequeño "pop".
                if (addBtn.hasAttribute("data-quick-add")) {
                    addBtn.classList.add("is-added");
                    clearTimeout(addBtn._feedbackTimer);
                    addBtn._feedbackTimer = setTimeout(() => addBtn.classList.remove("is-added"), 700);
                } else {
                    if (!addBtn.dataset.originalHtml) {
                        addBtn.dataset.originalHtml = addBtn.innerHTML;
                        addBtn.innerHTML = "✓ Agregado";
                    }
                    addBtn.classList.add("added-to-cart");

                    clearTimeout(addBtn._feedbackTimer);
                    addBtn._feedbackTimer = setTimeout(() => {
                        addBtn.classList.remove("added-to-cart");
                        if (addBtn.dataset.originalHtml) {
                            addBtn.innerHTML = addBtn.dataset.originalHtml;
                            delete addBtn.dataset.originalHtml;
                        }
                    }, 1500);
                }

                // La imagen del producto "vuela" hasta el carrito y, al aterrizar,
                // se abre el panel brevemente.
                const card = addBtn.closest("[data-catalog-card]") || addBtn.closest("article");
                const sourceImage = card?.querySelector("img") || addBtn;
                flyToCart(sourceImage, addBtn.dataset.productImage, openPanelBriefly);
                return;
            }

            // ----- Eliminar producto -----
            const removeBtn = e.target.closest("[data-cart-remove]");
            if (removeBtn) {
                removeItem(removeBtn.dataset.cartRemove);
                renderCartPanel();
                return;
            }

            // ----- Aumentar cantidad -----
            const increaseBtn = e.target.closest("[data-cart-increase]");
            if (increaseBtn) {
                const item = getItems().find((i) => i.id === increaseBtn.dataset.cartIncrease);
                if (item) {
                    updateQuantity(item.id, item.quantity + 1);
                    renderCartPanel();
                }
                return;
            }

            // ----- Disminuir cantidad -----
            const decreaseBtn = e.target.closest("[data-cart-decrease]");
            if (decreaseBtn) {
                const item = getItems().find((i) => i.id === decreaseBtn.dataset.cartDecrease);
                if (item) {
                    updateQuantity(item.id, item.quantity - 1);
                    renderCartPanel();
                }
            }
        });

        // Botón de checkout
        const checkoutBtn = document.getElementById("cart-checkout");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", () => {
                const items = getItems();
                if (items.length === 0) return;

                // Guardar carrito en sesión para el formulario
                sessionStorage.setItem("santaclara-cart-checkout", JSON.stringify(items));

                // Redirigir al formulario
                window.location.href = checkoutBtn.dataset.checkoutUrl;
            });
        }

        // Escuchar cambios
        onChange(renderCartPanel);

        if (document.querySelector("[data-order-complete]")) {
            clear();
            sessionStorage.removeItem("santaclara-cart-checkout");
        }

        // Render inicial
        renderCartPanel();
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    return {
        getItems,
        getTotalItems,
        getTotal,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        onChange,
        formatPrice,
    };
})();