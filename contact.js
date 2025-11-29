document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('feedbackMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Récupération des valeurs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const messageRaw = document.getElementById('message').value;
            
            // Construction du mailto
            const fullMessage = encodeURIComponent(messageRaw + "\n\n--\n" + name + " (" + email + ")");
            const mailto = `mailto:fersihamdi@gmail.com?subject=${encodeURIComponent(subject)}&body=${fullMessage}`;

            // Feedback visuel
            feedback.style.display = "block";
            feedback.style.opacity = 1;

            setTimeout(() => {
                window.location.href = mailto;
                feedback.style.display = "none";
            }, 1500);
        });
    }
});