document.addEventListener('DOMContentLoaded', function () {
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://velocambio.vercel.app/#website",
        "url": "https://velocambio.vercel.app/",
        "name": "Velocambio",
        "description": "Tasas de cambio en tiempo real: dólar BCV oficial, dólar paralelo, euro y USDT P2P a bolívares (VES) en Venezuela.",
        "inLanguage": "es"
      },
      {
        "@type": "WebApplication",
        "@id": "https://velocambio.vercel.app/#webapp",
        "name": "Velocambio",
        "description": "Consulta tasas de cambio y convierte divisas a Bolívares (VES) en Venezuela.",
        "url": "https://velocambio.vercel.app/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  });
  document.head.appendChild(script);
});
