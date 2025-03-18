document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("imageSlider");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const quoteOverlay = document.querySelector(".quote-overlay");
    const featureRows = document.querySelectorAll(".feature-row");

    const quotes = [
        "AI is the new electricity. – Andrew Ng",
        "The future belongs to those who innovate. – Elon Musk",
        "Artificial intelligence is the key to unlocking human potential. – Sundar Pichai",
        "Technology is best when it brings people together. – Matt Mullenweg"
    ];

    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        quoteOverlay.textContent = quotes[currentIndex];

        // Update active dot
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");

        currentIndex = (currentIndex + 1) % slides.length;
    }

    // Change image every 5 seconds
    setInterval(updateSlider, 5000);

    // Manual slide control using dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Initial setup
    quoteOverlay.textContent = quotes[0];

    // ✅ Contact Form Submission with Notification
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        fetch("/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification(data.message || "Email sent successfully!", false);
                document.getElementById("contactForm").reset(); // Clear form fields
            } else {
                throw new Error(data.message || "Error sending email. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showNotification(error.message, true);
        });
    });

    // ✅ Function to Show Notification Bar (Fixed)
    function showNotification(message, isError = false) {
        let notificationBar = document.getElementById("notificationBar");

        // If notification bar does not exist, create it dynamically
        if (!notificationBar) {
            notificationBar = document.createElement("div");
            notificationBar.id = "notificationBar";
            document.body.appendChild(notificationBar);
        }

        // Set message and styles
        notificationBar.textContent = message;
        notificationBar.className = `notification-bar ${isError ? "error" : "success"}`;

        // Reset styles before animation
        notificationBar.classList.remove("hide-notification");
        notificationBar.classList.add("show-notification");

        // Show notification
        notificationBar.style.display = "block";
        notificationBar.style.opacity = "1";  // Ensure full visibility

        // Hide notification after 5 seconds
        setTimeout(() => {
            notificationBar.style.opacity = "0"; // Fade out smoothly

            // Fully remove after fade-out transition
            setTimeout(() => {
                notificationBar.style.display = "none";
            }, 500);
        }, 5000);
    }

    // ✅ Navbar Hide on Scroll Logic
    let lastScrollTop = 0;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
            navbar.classList.add("visible");
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    function revealOnScroll() {
        featureRows.forEach((row) => {
            const rect = row.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                row.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});
