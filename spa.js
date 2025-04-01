document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fetchData").addEventListener("click", fetchAPIData);
    document.getElementById("search").addEventListener("input", filterItems);
});

const pages = {
    home: `<h1>Welcome to the SPA</h1><p>This is the home page.</p>` ,
    about: `<h1>About Us</h1><p>This is the about page.</p>`,
    items: `<h1>Items</h1><p>Browse items below.</p>`
};

function navigate(page) {
    document.getElementById('content').innerHTML = pages[page] + '<button id="fetchData">Fetch Items</button><input type="text" id="search" placeholder="Search items..."><div id="apiData"></div>';
    document.getElementById("fetchData").addEventListener("click", fetchAPIData);
    document.getElementById("search").addEventListener("input", filterItems);
}

function fetchAPIData() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            displayItems(data);
        })
        .catch(error => console.error("Error fetching API data:", error));
}

function displayItems(items) {
    const apiDataDiv = document.getElementById("apiData");
    apiDataDiv.innerHTML = items.map(item => `<div class="item"><h3>${item.name}</h3><p>${item.email}</p></div>`).join('');
}

function filterItems() {
    const query = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
}
