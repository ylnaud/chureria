function MapaLocal() {
    document.querySelectorAll(".js-map-lite").forEach((container) => {
    container.addEventListener("click", () => injectMap(container));
    container.addEventListener("keypress", (e) => {
      if (e.key === "Enter") injectMap(container);
    });
  });

  function injectMap(container) {
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3518.215450707012!2d-15.43278772404242!3d28.12336487584835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40950f6a5e5c6b%3A0x3a8e8b4c1a0d9a1!2sC.%20Ripoche%2C%207%2C%2035007%20Las%20Palmas%20de%20Gran%20Canaria%2C%20Las%20Palmas!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses";
    iframe.className = "w-full h-full border-0 rounded-lg shadow";
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    container.innerHTML = "";
    container.appendChild(iframe);
  }
    
}

export default MapaLocal