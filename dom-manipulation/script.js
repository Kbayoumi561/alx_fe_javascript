document.addEventListener('DOMContentLoaded', function() {
    // Array to store quote objects
    const quotes = [
        { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    ];

    // Select DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');

    // Function to display a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteDisplay.innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
    }

    // Function to create and display the add quote form
    function createAddQuoteForm() {
        const formContainer = document.createElement('div');
        
        // Input for quote text
        const quoteInput = document.createElement('input');
        quoteInput.id = 'newQuoteText';
        quoteInput.type = 'text';
        quoteInput.placeholder = 'Enter a new quote';
        
        // Input for quote category
        const categoryInput = document.createElement('input');
        categoryInput.id = 'newQuoteCategory';
        categoryInput.type = 'text';
        categoryInput.placeholder = 'Enter quote category';

        // Add quote button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Quote';
        addButton.onclick = addQuote;

        // Append inputs and button to the form container
        formContainer.appendChild(quoteInput);
        formContainer.appendChild(categoryInput);
        formContainer.appendChild(addButton);

        // Add the form to the document
        document.body.appendChild(formContainer);
    }

    // Function to add a new quote to the array and update the DOM
    function addQuote() {
        const quoteText = document.getElementById('newQuoteText').value.trim();
        const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (quoteText && quoteCategory) {
            // Add the new quote to the array
            quotes.push({ text: quoteText, category: quoteCategory });

            // Clear the input fields
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';

            // Optionally show feedback
            alert("Quote added successfully!");

            // Optionally display the newly added quote
            showRandomQuote();
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

    // Event listener for showing a new random quote
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Call createAddQuoteForm to display the form on page load
    createAddQuoteForm();

    // Initial call to display a random quote on page load
    showRandomQuote();
});