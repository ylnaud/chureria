function scroll() {
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
}
export default scroll