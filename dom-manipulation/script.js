document.addEventListener('DOMContentLoaded', function() {
    // Array to store quote objects
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    ];

    // Select DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const categoryFilter = document.getElementById('categoryFilter');

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

            // Update the category filter
            populateCategories();

            // Clear the input fields
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';

            alert("Quote added successfully!");
            showRandomQuote(); // Optionally display the newly added quote
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

    // Function to save quotes as JSON for export using Blob
    function exportToJsonFile() {
        const dataStr = JSON.stringify(quotes);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const exportFileDefaultName = 'quotes.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.setAttribute('download', exportFileDefaultName);
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    }

    // Function to import quotes from JSON file
    function importFromJsonFile(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedQuotes = JSON.parse(e.target.result);
                    if (Array.isArray(importedQuotes)) {
                        quotes = quotes.concat(importedQuotes); // Merge with existing quotes
                        localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
                        alert("Quotes imported successfully!");
                        populateCategories(); // Update categories after import
                        showRandomQuote(); // Optionally show a random quote
                    } else {
                        alert("Invalid file format. Please upload a valid JSON file.");
                    }
                } catch (error) {
                    alert("Error reading file. Please upload a valid JSON file.");
                }
            };
            reader.readAsText(file);
        }
    }

    // Populate category filter options
    function populateCategories() {
        // Clear existing options
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';

        // Extract unique categories from quotes
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Restore last selected category
        const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
        if (lastSelectedCategory) {
            categoryFilter.value = lastSelectedCategory;
            filterQuotes();
        }
    }

    // Function to filter quotes based on the selected category
    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('lastSelectedCategory', selectedCategory); // Save selected category

        const filteredQuotes = selectedCategory === 'all'
            ? quotes
            : quotes.filter(quote => quote.category === selectedCategory);

        // Display a random quote from the filtered list
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
    }

    // Event listener for showing a new random quote
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Call createAddQuoteForm to display the form on page load
    createAddQuoteForm();

    // Initial call to display a random quote on page load
    showRandomQuote();

    // Add a button for exporting quotes to JSON
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes';
    exportButton.onclick = exportToJsonFile;
    document.body.appendChild(exportButton);

    // Add an input for importing quotes from JSON file
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.onchange = importFromJsonFile;
    document.body.appendChild(importInput);

    // Populate categories on load and set up event listener for category filtering
    populateCategories();
    categoryFilter.addEventListener('change', filterQuotes);
});
