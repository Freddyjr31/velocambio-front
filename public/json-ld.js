document.addEventListener('DOMContentLoaded', function () {
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Velocambio",
    "description": "Consulta tasas de cambio y convierte divisas a Bolívares (VES) en Venezuela.",
    "url": "https://velocambio.app",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  });
  document.head.appendChild(script);
});
