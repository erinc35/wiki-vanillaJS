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