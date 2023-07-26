const apiKey = 'LWVPOJY7ZFNZWSWN';
const apiUrl = `https://www.alphavantage.co/query`;

// Funzione per ottenere i dati dei resoconti tramite l'API di Alpha Vantage
function fetchResoconti() {
  const symbol = 'AUDUSD';
  const timeframe = '1h';

  const url = `${apiUrl}?function=TIME_SERIES_${timeframe}&symbol=${symbol}&apikey=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data['Time Series (1h)']);
}

// Funzione per visualizzare i resoconti sulla pagina
function renderResoconti() {
  const resocontiContainer = $('#resoconti-container');

  fetchResoconti()
    .then(resoconti => {
      for (const timestamp in resoconti) {
        const close = resoconti[timestamp]['4. close'];
        const resocontoElement = $('<div>').text(`Timestamp: ${timestamp}, Close: ${close}`);
        resocontiContainer.append(resocontoElement);
      }
    })
    .catch(error => {
      console.error('Errore durante il recupero dei dati:', error);
    });
}

// Chiamata alla funzione per visualizzare i resoconti all'avvio della pagina
$(document).ready(function() {
  renderResoconti();
});
