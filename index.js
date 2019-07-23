function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('.searchForm-input').value;
    const searchQuery = input.trim();
    if (searchQuery === "") {
        emptyEntry();
    }
    fetchResults(searchQuery);
    document.querySelector('.searchForm').reset();

}

function emptyEntry() {
    const searchResults = document.querySelector('.searchResults');
    searchResults.innerHTML = "";
    searchResults.insertAdjacentHTML('beforeend',
        `<div class='empty-field'>
            <h4 class="empty-field-message">Input field can not be empty.</h4>
        </div>`
    );
}

function fetchResults(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            const searchInfo = data.query.searchinfo;
            if (results.length === 0) {
                invalidEntryResult(searchInfo, searchQuery)
            } else {
                displayResults(results, searchQuery);
            }
        })
        .catch(() => console.log('An error occurred'));
}

function displayResults(results, searchQuery) {
    const searchResults = document.querySelector('.searchResults');
    searchResults.innerHTML = `<h2 class='results-header'>Results with '${searchQuery}':</h2>
        <button class='sort-button'>sort by title</button>`;
    document.querySelector('.sort-button').addEventListener('click', () => sortByTitle(results, searchQuery));

    results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
        );
    });

}

function invalidEntryResult(searchInfo, searchQuery) {
    const searchResults = document.querySelector('.searchResults');
    const suggestionQuery = searchInfo.suggestion || "";
    let suggestion = "";
    if (suggestionQuery !== "") {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${suggestionQuery}`);
        suggestion = `Did you mean <span class="fetch-span">'${suggestionQuery}'</span>?`
    } else {
        suggestion = ""
    }

    searchResults.innerHTML = '';
    searchResults.insertAdjacentHTML('beforeend',
        `<div class="resultItem">
            <h3 class="resultItem-title">No result found with '${searchQuery}'.</h3>
            <p> 
            ${suggestion}
            </p>
        </div>`
    );
    document.querySelector('.fetch-span').addEventListener('click', () => fetchResults(suggestionQuery));
}