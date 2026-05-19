// Get form element
const form = document.querySelector('form');

// Listen for form submission
form.addEventListener('submit', async (e) => {
    // Prevent default form behavior (page reload)
    e.preventDefault();

    try {
        // Step 1: Get form data
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const message = document.querySelector('textarea').value;

        // Step 2: Validate on frontend (before sending to backend)
        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        // Step 3: Create data object
        const data = {
            name: name,
            email: email,
            message: message
        };

        // Step 4: Send POST request to backend
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Tell server we're sending JSON
            },
            body: JSON.stringify(data)  // Convert object to JSON string
        });

        // Step 5: Parse response
        const result = await response.json();

        // Step 6: Check if successful
        if (result.success) {
            // Show success message
            alert('✓ Message sent successfully!');
            
            // Clear form
            form.reset();
        } else {
            // Show error message
            alert('✗ Error: ' + result.message);
        }

    } catch (error) {
        // Network error or other issue
        console.error('Error:', error);
        alert('✗ Error sending message: ' + error.message);
    }
});
