const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value;

  // Send a search request to the backend API
  const response = await fetch(`/collection/:collectionName/search?query=${query}`);

  if (!response.ok) {
    // Handle errors
    return;
  }

  // Parse the response as JSON
  const results = await response.json();

  // Render the results
  searchResults.innerHTML = results.map(result => `<li>${result}</li>`).join('');
});
