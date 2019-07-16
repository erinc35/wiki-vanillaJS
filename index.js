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
