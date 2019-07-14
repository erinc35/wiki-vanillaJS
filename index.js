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