// Function to fetch data from the URL and insert the table into the fluxData div
function fetchAndInsertTable() {
  fetch('https://spaceweather.gc.ca/forecast-prevision/solar-solaire/solarflux/sx-5-flux-en.php')
    .then(response => response.text())
    .then(data => {
      // Create a temporary element to parse the HTML content
      const tempElement = document.createElement('div');
      tempElement.innerHTML = data;

      // Find the table with the specified class
      const table = tempElement.querySelector('table.table-bordered');

      if (table) {
        // Insert the table into the fluxData div
        document.getElementById('fluxData').appendChild(table);
      } else {
        console.error('Table not found on the page.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Call the fetchAndInsertTable function when the page loads
window.addEventListener('load', fetchAndInsertTable);
