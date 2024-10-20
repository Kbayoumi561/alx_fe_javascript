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
        quotes = storedQuotes;
    }
}

// Display quotes in the UI
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to sync quotes between local storage and the server
async function syncQuotes() {
    try {
        // Fetch quotes from the server (mock API)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();

        // Check if any server quotes are not in the local storage
        serverQuotes.forEach(serverQuote => {
            if (!quotes.find(localQuote => localQuote.text === serverQuote.title)) {
                quotes.push({ text: serverQuote.title, category: 'Server' });
            }
        });

        // Save the merged quotes to local storage
        saveQuotes();

        // Post local quotes that are not on the server
        for (let localQuote of quotes) {
            const serverMatch = serverQuotes.find(serverQuote => serverQuote.title === localQuote.text);
            if (!serverMatch) {
                await postQuoteToServer(localQuote);
            }
        }

        // Display quotes after syncing
        displayQuotes(quotes);
        showNotification("Quotes synced successfully with the server");

    } catch (error) {
        console.error("Failed to sync quotes with the server", error);
        showNotification("Failed to sync quotes with the server");
    }
}

// Function to post a new quote to the server (mock API)
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: quote.text,
                category: quote.category
            })
        });

        const result = await response.json();
        console.log("Quote posted to the server:", result);
    } catch (error) {
        console.error("Failed to post data to the server", error);
    }
}

// Add a new quote and post it to the server
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };

    // Add the new quote to the local quotes array
    quotes.push(newQuote);

    // Save the updated quotes to local storage
    saveQuotes();

    // Post the new quote to the server
    postQuoteToServer(newQuote);

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Function to show notification messages to the user
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#28a745';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '5px';
    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
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

// Populate the categories dynamically
function populateCategories() {
    const categories = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;  // Using textContent as required
        categoryFilter.appendChild(option);
    });
}

// Sync quotes with the server periodically (every 10 seconds for testing)
setInterval(syncQuotes, 10000);

// Load quotes on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    displayQuotes(quotes);
    populateCategories();
});
