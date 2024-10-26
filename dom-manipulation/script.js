document.addEventListener('DOMContentLoaded', function() {
    // Array to store quote objects
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
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
        
        // Save last viewed quote to session storage (Optional)
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
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

            // Save updated quotes array to local storage
            localStorage.setItem('quotes', JSON.stringify(quotes));

            // Clear the input fields
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';

            alert("Quote added successfully!");
            showRandomQuote(); // Optionally display the newly added quote
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

    // Function to save quotes as JSON for export
    function exportToJson() {
        const dataStr = JSON.stringify(quotes);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'quotes.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    // Function to import quotes from JSON file
    function importFromJsonFile(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const importedQuotes = JSON.parse(e.target.result);
                quotes = quotes.concat(importedQuotes); // Merge with existing quotes
                localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
                alert("Quotes imported successfully!");
                showRandomQuote(); // Optionally show a random quote
            };
            reader.readAsText(file);
        }
    }

    // Event listener for showing a new random quote
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Create add quote form on page load
    createAddQuoteForm();

    // Initial call to display a random quote on page load
    showRandomQuote();

    // Add a button for exporting quotes to JSON
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes';
    exportButton.onclick = exportToJson;
    document.body.appendChild(exportButton);

    // Add an input for importing quotes from JSON file
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.onchange = importFromJsonFile;
    document.body.appendChild(importInput);
});
