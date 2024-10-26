document.addEventListener('DOMContentLoaded', function() {
    // Array to store quote objects
    const quotes = [
        { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        // Add more initial quotes if needed
    ];

    // Select DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.querySelector('button[onclick="addQuote()"]');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    // Function to display a random quote
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteDisplay.innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
    }

    // Function to add a new quote to the array and update the DOM
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText && quoteCategory) {
            // Add the new quote to the array
            quotes.push({ text: quoteText, category: quoteCategory });

            // Clear the input fields
            newQuoteText.value = '';
            newQuoteCategory.value = '';

            // Optionally show feedback
            alert("Quote added successfully!");

            // Optionally display the newly added quote
            displayRandomQuote();
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

    // Event listener for showing a new random quote
    newQuoteButton.addEventListener('click', displayRandomQuote);

    // Event listener for adding a new quote when the "Add Quote" button is clicked
    addQuoteButton.addEventListener('click', addQuote);

    // Initial call to display a random quote on page load
    displayRandomQuote();
});
