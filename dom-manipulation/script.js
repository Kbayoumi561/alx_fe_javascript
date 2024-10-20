let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (storedQuotes) {
        quotes.push(...storedQuotes);
    }
}

// Function to populate the categories dynamically
function populateCategories() {
    const categories = new Set(quotes.map(quote => quote.category)); // Extract unique categories
    const categoryFilter = document.getElementById('categoryFilter');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;  // Use textContent instead of innerText
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on the selected category and display a random one
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;

    // Filter quotes based on the selected category
    const filteredQuotes = quotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);

    if (filteredQuotes.length > 0) {
        // Select a random quote from the filtered quotes
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];

        // Display the random quote
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
    } else {
        // If no quotes match the filter, display a message
        document.getElementById('quoteDisplay').textContent = 'No quotes available for this category.';
    }
}

// Display quotes
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Save selected category to local storage
function saveSelectedCategory() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);
}

// Load the last selected category from local storage
function loadSelectedCategory() {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
        document.getElementById('categoryFilter').value = savedCategory;
        filterQuotes();
    }
}

// Event listeners
document.getElementById('categoryFilter').addEventListener('change', saveSelectedCategory);
document.addEventListener('DOMContentLoaded', loadQuotes);
document.addEventListener('DOMContentLoaded', populateCategories);
document.addEventListener('DOMContentLoaded', loadSelectedCategory);