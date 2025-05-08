document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Función para cerrar el menú
  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    hamburgerIcon.classList.remove("opacity-0");
    closeIcon.classList.add("opacity-0");
    hamburgerButton.setAttribute("aria-expanded", "false");
  }

  // Toggle del menú hamburguesa
  hamburgerButton.addEventListener("click", function () {
    const isExpanded = hamburgerButton.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      hamburgerIcon.classList.add("opacity-0");
      closeIcon.classList.remove("opacity-0");
      hamburgerButton.setAttribute("aria-expanded", "true");
    }
  });

  // Cerrar menú al hacer click en un enlace
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Solo cerrar si es un enlace interno (que comienza con #)
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        closeMobileMenu();

        // Scroll suave al destino
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", function (e) {
    if (!hamburgerButton.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remover clase active de todos los botones y contenidos
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Añadir clase active al botón clickeado
      button.classList.add("active");

      // Mostrar el contenido correspondiente
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});

// Habilitar scroll suave para todos los enlaces con clase scroll-smooth
document.querySelectorAll("a.scroll-smooth").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});
