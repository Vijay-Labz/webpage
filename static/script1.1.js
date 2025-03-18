document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page refresh

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMessage = document.getElementById("responseMessage");

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Please enter a valid email address!";
        return;
    }

    // Check if fields are filled
    if (!email || !message) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "All fields are required!";
        return;
    }

    // Show loading message
    responseMessage.style.color = "blue";
    responseMessage.textContent = "Sending email... Please wait.";

    try {
        // Send data to Flask backend
        const response = await fetch("/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, message })
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.style.color = "green";
            responseMessage.textContent = result.message;

            // Wait for 5 seconds before clearing the form
            setTimeout(() => {
                document.getElementById("contactForm").reset();
                responseMessage.textContent = ""; // Clear message after 5 sec
            }, 5000);
        } else {
            responseMessage.style.color = "red";
            responseMessage.textContent = result.error || "Failed to send email.";
        }
    } catch (error) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Network error. Please try again later.";
    }
});

// Mobile Menu Toggle
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}
