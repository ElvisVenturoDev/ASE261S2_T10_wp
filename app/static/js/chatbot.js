(() => {
  const panel = document.getElementById("chatbot-panel");
  const toggle = document.getElementById("chatbot-toggle");
  const closeButton = document.getElementById("chatbot-close");
  const form = document.querySelector("[data-chat-form]");
  const input = document.querySelector("[data-chat-input]");
  const messages = document.querySelector("[data-chat-messages]");
  const suggestions = document.querySelector("[data-chat-suggestions]");

  if (!panel || !toggle || !closeButton || !form || !input || !messages || !suggestions) {
    return;
  }

  const copy = {
    es: {
      greeting: "¡Hoola como estas en que te ´puedo ayudar.",
      products: "Tenemos leche fresca, yogurt y quesos elaborados por productores locales. Puedes revisar el catálogo y sus precios aquí:",
      order: "Puedes enviar tu pedido desde el formulario. Nuestro equipo confirmará disponibilidad y entrega por WhatsApp:",
      delivery: "Coordinamos la entrega por WhatsApp según tu distrito. Los productos están sujetos a cobertura y el pago se realiza al recibir el pedido.",
      wholesale: "Para consultas mayoristas, envíanos un mensaje desde la página de contacto y te responderemos pronto:",
      contact: "Puedes escribirnos directamente por WhatsApp o visitar la página de contacto:",
      about: "Santa Clara trabaja junto a productores locales y la Asociación de Mujeres Mi Santa Clara para llevar productos frescos a las familias.",
      price: "Puedes consultar los productos y precios actuales en el catálogo:",
      fallback: "No tengo esa información por ahora. Puedo ayudarte con productos, pedidos, entregas y pagos. Si necesitas más ayuda, escríbenos por WhatsApp:",
      links: { catalog: "Ver catálogo", order: "Ir al formulario", contact: "Página de contacto", whatsapp: "Hablar por WhatsApp" },
      prompts: { products: "¿Qué productos ofrecen?", order: "¿Cómo hago un pedido?", delivery: "¿Cómo funcionan la entrega y el pago?" }
    },
    en: {
      greeting: "Hello! I'm the Santa Clara assistant. I can help with products, orders, delivery, and payment.",
      products: "We offer fresh milk, yogurt, and cheese made by local producers. Browse the catalog and current prices here:",
      order: "You can submit your order using the form. Our team will confirm availability and delivery by WhatsApp:",
      delivery: "We coordinate delivery by WhatsApp based on your district. Delivery depends on coverage, and payment is due when your order arrives.",
      wholesale: "For wholesale inquiries, send us a message through the contact page and our team will get back to you:",
      contact: "You can message us directly on WhatsApp or visit the contact page:",
      about: "Santa Clara works with local producers and the Asociación de Mujeres Mi Santa Clara to bring fresh products to families.",
      price: "You can check the current products and prices in the catalog:",
      fallback: "I don't have that information right now. I can help with products, orders, delivery, and payment. For more help, message us on WhatsApp:",
      links: { catalog: "Browse catalog", order: "Open order form", contact: "Contact page", whatsapp: "Chat on WhatsApp" },
      prompts: { products: "What products do you offer?", order: "How do I place an order?", delivery: "How do delivery and payment work?" }
    }
  };

  const getLanguage = () => document.body.dataset.lang === "en" ? "en" : "es";
  const links = {
    catalog: panel.dataset.catalogUrl,
    order: panel.dataset.orderUrl,
    contact: panel.dataset.contactUrl,
    whatsapp: panel.dataset.whatsappUrl
  };

  const addMessage = (text, sender, actions = []) => {
    const message = document.createElement("div");
    message.className = `chatbot-message chatbot-message--${sender}`;

    const content = document.createElement("p");
    content.textContent = text;
    message.appendChild(content);

    actions.forEach(({ label, href }) => {
      if (!href) return;
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      if (href.startsWith("https://wa.me/")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      message.appendChild(link);
    });

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const normalize = (text) => text
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const getReply = (text, language) => {
    const normalized = normalize(text);
    const strings = copy[language];
    const link = (key) => ({ label: strings.links[key], href: links[key] });

    if (/\b(hola|buenas|hello|hi|hey)\b/.test(normalized)) {
      return { text: strings.greeting };
    }
    if (/mayorista|por mayor|wholesale/.test(normalized)) {
      return { text: strings.wholesale, actions: [link("contact")] };
    }
    if (/entrega|delivery|envio|shipping|distrito|cobertura|zona|pago|payment/.test(normalized)) {
      return { text: strings.delivery, actions: [link("whatsapp")] };
    }
    if (/precio|cuesta|costo|price|cost/.test(normalized)) {
      return { text: strings.price, actions: [link("catalog")] };
    }
    if (/pedido|orden|comprar|order|buy/.test(normalized)) {
      return { text: strings.order, actions: [link("order")] };
    }
    if (/producto|catalogo|leche|yogur|queso|mantequilla|milk|cheese|yogurt|catalog/.test(normalized)) {
      return { text: strings.products, actions: [link("catalog")] };
    }
    if (/contacto|contact|telefono|whatsapp|hablar/.test(normalized)) {
      return { text: strings.contact, actions: [link("whatsapp"), link("contact")] };
    }
    if (/historia|asociacion|nosotros|about|story/.test(normalized)) {
      return { text: strings.about, actions: [link("contact")] };
    }
    return { text: strings.fallback, actions: [link("whatsapp")] };
  };

  const sendMessage = (text) => {
    const message = text.trim();
    if (!message) return;

    const language = getLanguage();
    addMessage(message, "user");
    const reply = getReply(message, language);
    addMessage(reply.text, "assistant", reply.actions);
    suggestions.hidden = true;
  };

  const openChat = () => {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    input.focus();
  };

  const closeChat = () => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  };

  toggle.addEventListener("click", () => {
    if (panel.hidden) {
      openChat();
    } else {
      closeChat();
    }
  });
  closeButton.addEventListener("click", closeChat);
  panel.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeChat();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(input.value);
    input.value = "";
    input.focus();
  });
  suggestions.querySelectorAll("[data-chat-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = getLanguage();
      sendMessage(copy[language].prompts[button.dataset.chatPrompt]);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    addMessage(copy[getLanguage()].greeting, "assistant");
  }, { once: true });
})();