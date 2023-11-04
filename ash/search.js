const scripts = [
    "spotify_updates_controller.ps1",
    "spotify_uninstaller.ps1",
    "sysinfo.ps1"
];

function updateSearchResults() {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const searchTerm = searchInput.value.trim().toLowerCase();

    searchResults.innerHTML = "";

    if (searchTerm) {
        const filteredScripts = scripts.filter(script => script.toLowerCase().includes(searchTerm));

        if (filteredScripts.length > 0) {
            filteredScripts.forEach(script => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = `scripts/${script}`;
                link.textContent = `/${script}`;
                listItem.appendChild(link);
                searchResults.appendChild(listItem);
            });
        } else {
            const noResultsItem = document.createElement("li");
            noResultsItem.textContent = "No results found.";
            searchResults.appendChild(noResultsItem);
        }

        searchResults.style.display = "block";
    } else {
        searchResults.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", updateSearchResults);
});