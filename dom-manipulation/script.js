// Function to create a form for adding new quotes dynamically
function createAddQuoteForm() {
    const formDiv = document.createElement('div');  // Create a div to hold the form

    // Create input field for the quote text
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('placeholder', 'Enter a new quote');

    // Create input field for the quote category
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter quote category');

    // Create add quote button
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Quote';
    addButton.onclick = addQuote;

    // Append all elements to the form div
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);
    
    // Function to display a random quote
    function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
    }

    // Append the form div to the body or any other part of the document
    document.body.appendChild(formDiv);
}

// Call the function to generate the form on page load or whenever required
document.addEventListener('DOMContentLoaded', createAddQuoteForm);