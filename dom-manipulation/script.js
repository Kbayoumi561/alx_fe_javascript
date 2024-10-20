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

// Simulate fetching new quotes from a server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Example API
        const serverQuotes = await response.json();
        
        serverQuotes.forEach(quote => {
            if (!quotes.find(localQuote => localQuote.text === quote.title)) {
                quotes.push({ text: quote.title, category: 'Server' });
            }
        });

        saveQuotes();
        displayQuotes(quotes);
        showNotification("New quotes synced from the server");
    } catch (error) {
        console.error("Failed to fetch data from the server", error);
    }
}

// Conflict resolution example
function resolveConflict(serverQuote) {
    const existingQuote = quotes.find(localQuote => localQuote.text === serverQuote.text);
    
    if (existingQuote) {
        existingQuote.category = serverQuote.category;
    } else {
        quotes.push(serverQuote);
    }

    saveQuotes();
}

// Show notification to user
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

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sync with server periodically (every 10 seconds)
setInterval(fetchQuotesFromServer, 10000);

// Load and display quotes on page load
document.addEventListener('DOMContentLoaded', loadQuotes);
document.addEventListener('DOMContentLoaded', () => displayQuotes(quotes));