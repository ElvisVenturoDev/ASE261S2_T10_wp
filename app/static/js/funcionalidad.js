const THEME_KEY = "santaclara-theme";
const LANG_KEY = "santaclara-language";

const translations = {
  es: {
    "theme.toggle": "Cambiar tema",
    "lang.toggle": "Cambiar idioma",
    "chat.open": "Abrir asistente de Santa Clara",
    "chat.close": "Cerrar chat",
    "chat.title": "Asistente Santa Clara",
    "chat.subtitle": "Ayuda rápida sobre nuestros productos",
    "chat.input": "Escribe tu pregunta...",
    "chat.send": "Enviar mensaje",
    "chat.products": "Ver productos",
    "chat.order": "Hacer un pedido",
    "chat.delivery": "Entrega y pago",
    "chat.disclaimer": "Asistente automático de ayuda",
    "nav.home": "Inicio",
    "nav.about": "Nosotros",
    "nav.products": "Productos",
    "nav.contact": "Contacto",
    "nav.order": "Hacer pedido",
    "nav.cart": "Carrito",
    "footer.explore": "Explora",
    "footer.catalog": "Catálogo de productos",
    "footer.orderForm": "Formulario de pedidos",
    "footer.contact": "Contacto",
    "footer.contactUs": "Escríbenos aquí →",
    "cart.panelTitle": "Tu carrito",
    "cart.total": "Total",
    "cart.checkout": "Proceder al pedido",
    "catalog.badge": "Catálogo",
    "catalog.title": "Encuentra tu favorito",
    "catalog.count": "productos disponibles",
    "catalog.searchLabel": "Buscar productos",
    "catalog.searchPlaceholder": "Buscar por nombre...",
    "catalog.categoryLabel": "Filtrar por categoría",
    "catalog.allCategories": "Todas las categorías",
    "catalog.milk": "Leche",
    "catalog.yogurt": "Yogurt",
    "catalog.cheese": "Quesos",
    "catalog.butter": "Mantequilla",
    "catalog.cream": "Crema",
    "catalog.other": "Otros",
    "catalog.sortLabel": "Ordenar productos",
    "catalog.sortFeatured": "Destacados",
    "catalog.sortName": "Nombre A–Z",
    "catalog.sortPriceAsc": "Menor precio",
    "catalog.sortPriceDesc": "Mayor precio",
    "catalog.all": "Todos",
    "catalog.addToCart": "Agregar al carrito",
    "catalog.availabilityConfirm": "Disponibilidad por confirmar",
    "catalog.availabilityByWhatsApp": "La disponibilidad se confirma por WhatsApp.",
    "catalog.emptyTitle": "No encontramos productos",
    "catalog.emptyMessage": "Prueba con otra búsqueda o selecciona una categoría diferente.",
    "catalog.clearFilters": "Limpiar filtros",
    "home.hero.kicker": "De nuestro campo a tu hogar",
    "home.hero.title": "Lo bueno de la naturaleza,",
    "home.hero.titleSpan": "lo llevamos a tu mesa.",
    "home.hero.desc": "Productos lácteos frescos, naturales y nutritivos, preparados cerca para ti y tu familia.",
    "home.hero.products": "Conoce nuestros productos",
    "home.hero.story": "Nuestra historia",
    "home.hero.natural": "100%",
    "home.hero.naturalLabel": "NATURAL",
    "home.hero.slide2Kicker": "Frescura diaria",
    "home.hero.slide2Title": "Sabor auténtico,",
    "home.hero.slide2TitleSpan": "frescura de cada día.",
    "home.hero.slide2Text": "Nuestros productos llegan a tu mesa con la textura, frescura y sabor de un alimento bien cuidado.",
    "home.hero.slide2Cta": "Ver productos",
    "home.hero.slide2CtaAlt": "Cómo trabajamos",
    "home.hero.slide3Kicker": "Bienestar para todos",
    "home.hero.slide3Title": "Apoyas lo local,",
    "home.hero.slide3TitleSpan": "cuidas a tu familia.",
    "home.hero.slide3Text": "Cada compra acompaña a productores de Santa Clara y lleva a tu hogar alimentos naturales, cercanos y conscientes.",
    "home.hero.slide3Cta": "Hacer un pedido",
    "home.hero.slide3CtaAlt": "Escríbenos",
    "home.selection": "Nuestra selección",
    "home.selectionTitle": "Frescura que se nota",
    "home.selectionDesc": "Texturas suaves, sabores reales y el cuidado de productores que trabajan cada día con la familia.",
    "home.viewCatalog": "Ver catálogo completo",
    "home.identityBadge": "Nuestra identidad",
    "home.originTitle": "Tradición que se renueva cada día",
    "home.originText1": "En Santa Clara creemos que una buena fuente de alimento comienza cerca. Trabajamos junto a productores locales, cuidamos nuestros animales y elaboramos productos pensados para las familias.",
    "home.originText2": "La Asociación de Mujeres Mi Santa Clara convierte ese compromiso en una oportunidad compartida: mejores productos, ingresos justos y una comunidad más fuerte.",
    "home.originCta": "Conoce nuestra historia",
    "home.readyBadge": "¿Ya sabes qué quieres?",
    "home.readyTitle": "Tu pedido empieza con un mensaje",
    "home.readyText": "Cuéntanos qué necesitas y te ayudaremos a coordinar la entrega.",
    "home.readyOrder": "Realizar pedido",
    "values.natural": "100% Natural",
    "values.naturalText": "Sin conservantes ni aditivos.",
    "values.origin": "Origen responsable",
    "values.originText": "Apoyamos a productores locales.",
    "values.nutritive": "Nutritivo y saludable",
    "values.nutritiveText": "Ricos en calcio y proteínas.",
    "values.fresh": "Frescura garantizada",
    "values.freshText": "De nuestro campo a tu hogar.",
    "about.badge": "Nuestra historia",
    "about.title": "Donde la tradición y la comunidad se encuentran",
    "about.desc": "Creemos que producir alimentos con calidad también significa cuidar a las personas, la tierra y cada etapa del proceso.",
    "about.whoBadge": "Quiénes somos",
    "about.whoTitle": "Un trabajo que comenzó con una idea compartida",
    "about.local": "100%",
    "about.localLabel": "Natural",
    "about.origin": "Local",
    "about.originLabel": "Origen",
    "about.close": "Cercano",
    "about.closeLabel": "Compromiso",
    "about.commitmentBadge": "Nuestro compromiso",
    "about.commitmentTitle": "Principios que guían nuestro día a día",
    "about.card1Title": "Calidad con responsabilidad",
    "about.card1Text": "Seleccionamos ingredientes y cuidamos cada detalle para ofrecer productos seguros y sabrosos.",
    "about.card2Title": "Comunidad primero",
    "about.card2Text": "Cada compra apoya a familias productoras y fortalece la economía local de Santa Clara.",
    "about.card3Title": "Cercanía que se nota",
    "about.card3Text": "Producimos cerca de las familias para reducir distancias y mantener la frescura en cada entrega.",
    "about.pathBadge": "Nuestro camino",
    "about.pathTitle": "Una historia de crecimiento compartido",
    "about.step1Title": "Una idea local",
    "about.step1Text": "Varias mujeres productoras se organizaron para compartir herramientas, experiencia y una visión común.",
    "about.step2Title": "Aprender y mejorar",
    "about.step2Text": "Incorporamos buenas prácticas de producción, cuidado y manipulación para crecer sin perder la cercanía.",
    "about.step3Title": "Llevar el origen al hogar",
    "about.step3Text": "Hoy llevamos esa experiencia a cada familia mediante productos frescos, naturales y elaborados con respeto por su origen.",
    "about.productsTitle": "Conoce nuestros productos",
    "about.productsText": "Descubre el trabajo que hay detrás de cada sabor.",
    "about.productsCta": "Explorar catálogo",
    "contact.hero.tag": "Contacto",
    "contact.hero.title": "Hablemos, estamos cerca de ti",
    "contact.hero.desc": "Pedidos, consultas mayoristas, visitas al campo o alianzas. Te respondemos en menos de 24 horas.",
    "contact.hero.whatsapp": "WhatsApp directo →",
    "contact.hero.write": "Escríbenos ↓",
    "contact.card.location": "Ubicación",
    "contact.card.locationValue": "Santa Clara, Lambayeque, Perú",
    "contact.card.locationSchedule": "Visítanos Lun–Sáb",
    "contact.card.phone": "Teléfono / WhatsApp",
    "contact.card.phoneValue": "+51 908 540 311",
    "contact.card.phoneSchedule": "8:00 – 18:00",
    "contact.card.email": "Correo",
    "contact.card.emailValue": "hola@santaclara.pe",
    "contact.card.emailSchedule": "Respuesta en 24 h",
    "contact.card.hours": "Horario",
    "contact.card.hoursValue": "Lun–Vie 8:00–18:00",
    "contact.card.hoursSchedule": "Sáb 8:00–13:00",
    "contact.form.title": "Envíanos un mensaje",
    "contact.form.subtitle": "Completa el formulario y te contactaremos.",
    "contact.form.thanks": "¡Gracias, %name%! Recibimos tu mensaje y te escribiremos pronto.",
    "contact.form.name": "Nombre *",
    "contact.form.phone": "Celular *",
    "contact.form.email": "Correo",
    "contact.form.asunto": "Asunto",
    "contact.form.subject1": "Pedido de productos",
    "contact.form.subject2": "Consulta mayorista",
    "contact.form.subject3": "Visita / alianza",
    "contact.form.subject4": "Otro",
    "contact.form.message": "Mensaje *",
    "contact.form.messagePlaceholder": "Cuéntanos qué necesitas...",
    "contact.form.send": "Enviar mensaje →",
    "contact.map.link": "Cómo llegar →",
    "contact.direct.title": "¿Prefieres pedir directo?",
    "contact.direct.text": "Usa el formulario de pedidos para una atención más rápida.",
    "contact.direct.button": "Ir al formulario →",
    "contact.faq.title": "Preguntas frecuentes",
    "contact.faq.q1": "¿Ofrecen entrega a domicilio?",
    "contact.faq.a1": "Sí, coordinamos la entrega por WhatsApp según tu distrito.",
    "contact.faq.q2": "¿Venden al por mayor?",
    "contact.faq.a2": "Sí, escríbenos con asunto “Consulta mayorista”.",
    "contact.faq.q3": "¿Los productos son naturales?",
    "contact.faq.a3": "100% naturales, sin conservantes ni aditivos.",
    "order.confirmSuccess": "¡Pedido realizado con éxito!",
    "order.confirmTitle": "¡Pedido realizado!",
    "order.confirmText": "Recibimos tu pedido. Un integrante de la Asociación de Mujeres Mi Santa Clara se comunicará contigo por WhatsApp para confirmar disponibilidad y coordinar la entrega.",
    "order.backHome": "Volver al inicio",
    "order.keepBrowsing": "Seguir explorando",
    "order.formPageTitle": "Hacer un pedido | Santa Clara",
    "order.formPageMeta": "Completa tu pedido de productos lácteos naturales de Santa Clara y coordina la entrega con nuestro equipo.",
    "order.footer.tag": "Pedido Santa Clara",
    "order.footer.title": "Pedidos frescos para tu familia",
    "order.footer.desc": "Completa tus datos y nuestro equipo confirmará la disponibilidad, el monto y la entrega por WhatsApp.",
    "order.formContactTitle": "¿Qué necesitas?",
    "order.formInfoRequired": "Los campos marcados con un asterisco son obligatorios.",
    "order.formContactDate": "Datos del pedido"
  },
  en: {
    "theme.toggle": "Toggle theme",
    "lang.toggle": "Change language",
    "chat.open": "Open Santa Clara assistant",
    "chat.close": "Close chat",
    "chat.title": "Santa Clara assistant",
    "chat.subtitle": "Quick help with our products",
    "chat.input": "Type your question...",
    "chat.send": "Send message",
    "chat.products": "Browse products",
    "chat.order": "Place an order",
    "chat.delivery": "Delivery and payment",
    "chat.disclaimer": "Automated help assistant",
    "nav.home": "Home",
    "nav.about": "About us",
    "nav.products": "Products",
    "nav.contact": "Contact",
    "nav.order": "Place order",
    "nav.cart": "Cart",
    "footer.explore": "Explore",
    "footer.catalog": "Product catalog",
    "footer.orderForm": "Order form",
    "footer.contact": "Contact",
    "footer.contactUs": "Write to us here →",
    "cart.panelTitle": "Your cart",
    "cart.total": "Total",
    "cart.checkout": "Proceed to order",
    "catalog.badge": "Catalog",
    "catalog.title": "Find your favorite",
    "catalog.count": "products available",
    "catalog.searchLabel": "Search products",
    "catalog.searchPlaceholder": "Search by name...",
    "catalog.categoryLabel": "Filter by category",
    "catalog.allCategories": "All categories",
    "catalog.milk": "Milk",
    "catalog.yogurt": "Yogurt",
    "catalog.cheese": "Cheese",
    "catalog.butter": "Butter",
    "catalog.cream": "Cream",
    "catalog.other": "Other",
    "catalog.sortLabel": "Sort products",
    "catalog.sortFeatured": "Featured",
    "catalog.sortName": "Name A–Z",
    "catalog.sortPriceAsc": "Lowest price",
    "catalog.sortPriceDesc": "Highest price",
    "catalog.all": "All",
    "catalog.addToCart": "Add to cart",
    "catalog.availabilityConfirm": "Availability to be confirmed",
    "catalog.availabilityByWhatsApp": "Availability will be confirmed by WhatsApp.",
    "catalog.emptyTitle": "No products found",
    "catalog.emptyMessage": "Try another search or select a different category.",
    "catalog.clearFilters": "Clear filters",
    "home.hero.kicker": "From our field to your home",
    "home.hero.title": "The goodness of nature,",
    "home.hero.titleSpan": "we bring it to your table.",
    "home.hero.desc": "Fresh, natural and nutritious dairy products prepared close to you and your family.",
    "home.hero.products": "Discover our products",
    "home.hero.story": "Our story",
    "home.hero.natural": "100%",
    "home.hero.naturalLabel": "NATURAL",
    "home.hero.slide2Kicker": "Daily freshness",
    "home.hero.slide2Title": "Authentic flavor,",
    "home.hero.slide2TitleSpan": "freshness every day.",
    "home.hero.slide2Text": "Our products reach your table with the texture, freshness and flavor of a well-cared-for food.",
    "home.hero.slide2Cta": "View products",
    "home.hero.slide2CtaAlt": "How we work",
    "home.hero.slide3Kicker": "Wellbeing for everyone",
    "home.hero.slide3Title": "You support local,",
    "home.hero.slide3TitleSpan": "you care for your family.",
    "home.hero.slide3Text": "Every purchase supports producers in Santa Clara and brings natural, local and conscious food to your home.",
    "home.hero.slide3Cta": "Place an order",
    "home.hero.slide3CtaAlt": "Write to us",
    "home.selection": "Our selection",
    "home.selectionTitle": "Freshness you can notice",
    "home.selectionDesc": "Smooth textures, real flavors and the care of producers who work every day with family.",
    "home.viewCatalog": "View full catalog",
    "home.identityBadge": "Our identity",
    "home.originTitle": "Tradition renewed every day",
    "home.originText1": "At Santa Clara we believe a good food source begins nearby. We work alongside local producers, care for our animals and create products designed for families.",
    "home.originText2": "The Asociación de Mujeres Mi Santa Clara transforms that commitment into a shared opportunity: better products, fair income and a stronger community.",
    "home.originCta": "Learn our story",
    "home.readyBadge": "Already know what you want?",
    "home.readyTitle": "Your order starts with a message",
    "home.readyText": "Tell us what you need and we will help coordinate delivery.",
    "home.readyOrder": "Place order",
    "values.natural": "100% Natural",
    "values.naturalText": "No preservatives or additives.",
    "values.origin": "Responsible origin",
    "values.originText": "We support local producers.",
    "values.nutritive": "Nutritious and healthy",
    "values.nutritiveText": "Rich in calcium and protein.",
    "values.fresh": "Guaranteed freshness",
    "values.freshText": "From our field to your home.",
    "about.badge": "Our story",
    "about.title": "Where tradition and community meet",
    "about.desc": "We believe producing quality foods also means caring for people, the land and every stage of the process.",
    "about.whoBadge": "Who we are",
    "about.whoTitle": "A project that began with a shared idea",
    "about.local": "100%",
    "about.localLabel": "Natural",
    "about.origin": "Local",
    "about.originLabel": "Origin",
    "about.close": "Close",
    "about.closeLabel": "Commitment",
    "about.commitmentBadge": "Our commitment",
    "about.commitmentTitle": "Principles that guide us every day",
    "about.card1Title": "Quality with responsibility",
    "about.card1Text": "We select ingredients and take care of every detail to offer safe, tasty products.",
    "about.card2Title": "Community first",
    "about.card2Text": "Every purchase supports farming families and strengthens the local economy of Santa Clara.",
    "about.card3Title": "Closeness you can feel",
    "about.card3Text": "We produce close to families to reduce distances and maintain freshness with each delivery.",
    "about.pathBadge": "Our path",
    "about.pathTitle": "A story of shared growth",
    "about.step1Title": "A local idea",
    "about.step1Text": "Several women producers joined forces to share tools, experience and a common vision.",
    "about.step2Title": "Learn and improve",
    "about.step2Text": "We incorporated better production, care and handling practices to grow without losing closeness.",
    "about.step3Title": "Bring origin home",
    "about.step3Text": "Today we bring that experience to each family through fresh, natural products made with respect for their origin.",
    "about.productsTitle": "Get to know our products",
    "about.productsText": "Discover the work behind every flavor.",
    "about.productsCta": "Explore catalog",
    "contact.hero.tag": "Contact",
    "contact.hero.title": "Let’s talk, we are close to you",
    "contact.hero.desc": "Orders, wholesale inquiries, field visits or partnerships. We reply within 24 hours.",
    "contact.hero.whatsapp": "Direct WhatsApp →",
    "contact.hero.write": "Write to us ↓",
    "contact.card.location": "Location",
    "contact.card.locationValue": "Santa Clara, Lambayeque, Peru",
    "contact.card.locationSchedule": "Visit us Mon–Sat",
    "contact.card.phone": "Phone / WhatsApp",
    "contact.card.phoneValue": "+51 908 540 311",
    "contact.card.phoneSchedule": "8:00 – 18:00",
    "contact.card.email": "Email",
    "contact.card.emailValue": "hola@santaclara.pe",
    "contact.card.emailSchedule": "Reply within 24 h",
    "contact.card.hours": "Hours",
    "contact.card.hoursValue": "Mon–Fri 8:00–18:00",
    "contact.card.hoursSchedule": "Sat 8:00–13:00",
    "contact.form.title": "Send us a message",
    "contact.form.subtitle": "Fill out the form and we will contact you.",
    "contact.form.thanks": "Thank you, %name%! We received your message and will write soon.",
    "contact.form.name": "Name *",
    "contact.form.phone": "Cell phone *",
    "contact.form.email": "Email",
    "contact.form.asunto": "Subject",
    "contact.form.subject1": "Product order",
    "contact.form.subject2": "Wholesale inquiry",
    "contact.form.subject3": "Visit / partnership",
    "contact.form.subject4": "Other",
    "contact.form.message": "Message *",
    "contact.form.messagePlaceholder": "Tell us what you need...",
    "contact.form.send": "Send message →",
    "contact.map.link": "How to get there →",
    "contact.direct.title": "Prefer to order directly?",
    "contact.direct.text": "Use the order form for quicker service.",
    "contact.direct.button": "Go to form →",
    "contact.faq.title": "Frequently asked questions",
    "contact.faq.q1": "Do you offer home delivery?",
    "contact.faq.a1": "Yes, we coordinate delivery by WhatsApp depending on your district.",
    "contact.faq.q2": "Do you sell wholesale?",
    "contact.faq.a2": "Yes, write to us with the subject “Wholesale inquiry”.",
    "contact.faq.q3": "Are the products natural?",
    "contact.faq.a3": "100% natural, with no preservatives or additives.",
    "order.confirmSuccess": "Order completed successfully!",
    "order.confirmTitle": "Order completed!",
    "order.confirmText": "We received your order. A member of the Asociación de Mujeres Mi Santa Clara will contact you by WhatsApp to confirm availability and coordinate delivery.",
    "order.backHome": "Back home",
    "order.keepBrowsing": "Keep exploring",
    "order.formPageTitle": "Place an order | Santa Clara",
    "order.formPageMeta": "Complete your order for natural dairy products from Santa Clara and coordinate delivery with our team.",
    "order.footer.tag": "Santa Clara order",
    "order.footer.title": "Fresh orders for your family",
    "order.footer.desc": "Complete your details and our team will confirm availability, amount and delivery by WhatsApp.",
    "order.formContactTitle": "What do you need?",
    "order.formInfoRequired": "Fields marked with an asterisk are required.",
    "order.formContactDate": "Order details"
  }
};

const safeGetItem = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage restrictions.
  }
};

const debounce = (callback, delay = 180) => {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
};

const showToast = (mensaje) => {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur";
  toast.textContent = mensaje;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Funcionalidad de modo oscuro: Andrea
const setTheme = (dark) => {
  document.body.classList.toggle("dark-mode", dark);
  safeSetItem(THEME_KEY, dark ? "dark" : "light");

  document.querySelectorAll("[data-theme-icon]").forEach((themeIcon) => {
    themeIcon.textContent = dark ? "🌙" : "☀️";
  });
};

const applyTheme = () => {
  setTheme(safeGetItem(THEME_KEY, "light") === "dark");
};

// Funcionalidad de idioma: Andrea
const interpolateTranslation = (translation, params = {}) => {
  if (!translation) {
    return translation;
  }

  return Object.entries(params).reduce((result, [key, value]) => {
    const safeValue = value == null ? "" : String(value);
    return result.replace(new RegExp(`%${key}%`, "g"), safeValue);
  }, translation);
};

const parseTranslationParams = (node) => {
  if (!node.dataset.i18nParams) {
    return {};
  }

  try {
    return JSON.parse(node.dataset.i18nParams);
  } catch {
    return {};
  }
};

const applyLanguage = (lang) => {
  const selectedLang = translations[lang] ? lang : "es";
  document.documentElement.lang = selectedLang;
  document.body.dataset.lang = selectedLang;
  safeSetItem(LANG_KEY, selectedLang);

  document.querySelectorAll("[data-lang-current]").forEach((node) => {
    node.textContent = selectedLang.toUpperCase();
  });

  const languageTranslations = translations[selectedLang] ?? {};

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const translation = languageTranslations[node.dataset.i18n];
    if (translation) {
      node.textContent = interpolateTranslation(translation, parseTranslationParams(node));
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const translation = languageTranslations[node.dataset.i18nPlaceholder];
    if (translation) {
      node.placeholder = interpolateTranslation(translation, parseTranslationParams(node));
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const translation = languageTranslations[node.dataset.i18nAria];
    if (translation) {
      node.setAttribute("aria-label", interpolateTranslation(translation, parseTranslationParams(node)));
    }
  });
};

const bindGlobalInteractions = () => {
  const bindOnce = (element, eventName, callback, key) => {
    if (!element || element.dataset.bound === key) {
      return;
    }

    element.addEventListener(eventName, callback);
    element.dataset.bound = key;
  };

  // Funcionalidad de modo oscuro: Andrea
  document.querySelectorAll("[data-theme-toggle]").forEach((themeToggle) => {
    bindOnce(themeToggle, "click", () => {
      const dark = !document.body.classList.contains("dark-mode");
      setTheme(dark);
    }, "theme-toggle");
  });

  // Funcionalidad de idioma: Andrea
  // Se enlazan todos los botones (escritorio y móvil); antes solo funcionaba el primero.
  document.querySelectorAll("[data-lang-toggle]").forEach((langToggle) => {
    bindOnce(langToggle, "click", () => {
      const currentLang = safeGetItem(LANG_KEY, "es");
      const nextLang = currentLang === "es" ? "en" : "es";
      applyLanguage(nextLang);
      showToast(nextLang === "en" ? "Language changed to English" : "Idioma cambiado a español");
    }, "lang-toggle");
  });

  // Funcionalidad de scroll hacia arriba: Andrea
  const scrollTopButton = document.querySelector("[data-scroll-top]");
  if (scrollTopButton) {
    const updateVisibility = () => {
      const visible = window.scrollY > 400;
      scrollTopButton.classList.toggle("hidden", !visible);
      scrollTopButton.classList.toggle("flex", visible);
    };

    bindOnce(scrollTopButton, "click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, "scroll-top-click");

    if (!scrollTopButton.dataset.scrollBound) {
      window.addEventListener("scroll", updateVisibility, { passive: true });
      scrollTopButton.dataset.scrollBound = "true";
    }
    updateVisibility();
  }

  const btnNotificacion = document.getElementById("btnNotificacion");
  bindOnce(btnNotificacion, "click", () => {
    showToast("¡Acción realizada con éxito!");
  }, "btn-notificacion");
};

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  applyLanguage(safeGetItem(LANG_KEY, "es"));
  bindGlobalInteractions();
});

(() => {
    const form = document.querySelector("[data-order-summary]")?.closest("form");

    if (!form) {
        return;
    }

    const product = form.querySelector('select[name="producto"]');
    const quantity = form.querySelector('input[name="cantidad"]');
    const productOutput = form.querySelector("[data-order-product]");
    const quantityOutput = form.querySelector("[data-order-quantity]");
    const totalOutput = form.querySelector("[data-order-total]");
    const unitPriceOutput = form.querySelector("[data-order-unit-price]");
    const addressSection = form.querySelector("[data-delivery-address]");
    const district = form.querySelector('input[name="distrito"]');

    if (!product || !quantity || !productOutput || !quantityOutput || !totalOutput || !unitPriceOutput || !addressSection || !district) {
      return;
    }

    const formatPrice = (amount) => `S/ ${amount.toFixed(2)}`;

    const updateSummary = () => {
        const selectedProduct = product.selectedOptions[0];
        const unitPrice = Number(selectedProduct.dataset.price);
        const quantityValue = Math.max(1, Math.min(99, Number.parseInt(quantity.value, 10) || 1));
        const hasProduct = selectedProduct.value !== "" && Number.isFinite(unitPrice);

        productOutput.textContent = hasProduct ? selectedProduct.value : "Selecciona un producto";
        quantityOutput.textContent = `Cantidad: ${quantityValue}`;
        totalOutput.textContent = formatPrice(hasProduct ? unitPrice * quantityValue : 0);
        unitPriceOutput.textContent = hasProduct
            ? `Precio unitario: ${formatPrice(unitPrice)}. Monto final sujeto a confirmación.`
            : "El monto final se confirma al coordinar el pedido.";
    };

    const updateDeliveryFields = () => {
        const pickup = form.querySelector('input[name="entrega"]:checked')?.value === "recogida";
        addressSection.hidden = pickup;
        addressSection.classList.toggle("hidden", pickup);
        addressSection.querySelectorAll("input").forEach((input) => {
            input.disabled = pickup;
          input.required = !pickup;
          if (pickup) {
            input.value = "";
          }
        });
    };
    
    product.addEventListener("change", updateSummary);
    quantity.addEventListener("input", updateSummary);
    form.querySelectorAll('input[name="entrega"]').forEach((option) => {
        option.addEventListener("change", updateDeliveryFields);
    });

    updateSummary();
    updateDeliveryFields();
})();

(() => {
    const grid = document.querySelector("[data-catalog-grid]");
    const search = document.querySelector("#product-search");
    const category = document.querySelector("#category-filter");
    const sort = document.querySelector("#sort-products");
    const empty = document.querySelector("[data-catalog-empty]");

    if (!grid || !search || !category || !sort || !empty) {
        return;
    }

    const count = document.querySelector("[data-catalog-count]");
    const reset = document.querySelector("[data-catalog-reset]");
    const favoritesFilter = document.querySelector("[data-favorites-filter]");
    const tabs = [...document.querySelectorAll("[data-category-tabs] [data-category]")];
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
    let onlyFavorites = false;

    const saveFavorites = () => {
        try {
            localStorage.setItem(favoriteKey, JSON.stringify([...favorites]));
        } catch {
            // El catálogo sigue funcionando si el navegador bloquea el almacenamiento.
        }
    };

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
        const matchSet = new Set();

        cards.forEach((card) => {
            const name = (card.dataset.name ?? "").toLocaleLowerCase("es");
            const matchesSearch = name.includes(query);
            const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
            const matchesFavorite = !onlyFavorites || favorites.has(card.dataset.productId);
            const isMatch = matchesSearch && matchesCategory && matchesFavorite;

            if (isMatch) {
                matchSet.add(card);
            }

            if (card.hidden !== !isMatch) {
                card.hidden = !isMatch;
            }

            // Al pasar de "hidden" a visible, el navegador reinicia la animación
            // "card-enter" definida en styles.css (conservando su escalonado).
        });

        const matches = [...matchSet].sort((first, second) => {
            if (selectedSort === "name") {
                return (first.dataset.name ?? "").localeCompare(second.dataset.name ?? "", "es");
            }
            if (selectedSort === "price") {
                return Number(first.dataset.price) - Number(second.dataset.price);
            }
            if (selectedSort === "price-desc") {
                return Number(second.dataset.price) - Number(first.dataset.price);
            }
            return (originalOrder.get(first) ?? 0) - (originalOrder.get(second) ?? 0);
        });

        matches.forEach((card) => grid.append(card));
        empty.hidden = matches.length > 0;
        if (count) {
            count.textContent = `${matches.length} ${matches.length === 1 ? "producto disponible" : "productos disponibles"}`;
        }
    };

    const resetFilters = () => {
        search.value = "";
        category.value = "all";
        sort.value = "featured";
        onlyFavorites = false;
        if (favoritesFilter) {
            favoritesFilter.setAttribute("aria-pressed", "false");
            favoritesFilter.textContent = "♡ Ver favoritos";
        }
        syncTabs();
        updateCatalog();
        search.focus();
    };

    cards.forEach((card) => {
        const button = card.querySelector("[data-favorite]");
        const productId = card.dataset.productId;
        const productName = card.dataset.name;

        if (!button) {
            return;
        }

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
            updateCatalog();
            button.classList.remove("is-favorited");
            void button.offsetWidth;
            button.classList.add("is-favorited");
        });

        syncFavorite();
    });

    const debouncedUpdateCatalog = debounce(updateCatalog, 120);

    search.addEventListener("input", debouncedUpdateCatalog);
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
    favoritesFilter?.addEventListener("click", () => {
        onlyFavorites = !onlyFavorites;
        favoritesFilter.setAttribute("aria-pressed", String(onlyFavorites));
        favoritesFilter.textContent = onlyFavorites ? "♥ Ver todos" : "♡ Ver favoritos";
        updateCatalog();
    });

    const focusSearch = new URLSearchParams(window.location.search).get("focus") === "search";
    if (focusSearch) {
        window.setTimeout(() => search.focus(), 0);
    }

    syncTabs();
    updateCatalog();
})();