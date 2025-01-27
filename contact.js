function sendData(name, email, message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (name && email && message) {
                resolve("Message sent successfully!");
            } else {
                reject("Failed to send message. Please fill all fields.");
            }
        }, 1000); // Simulierte Verzögerung von 1 Sekunde
    });
}

// Event-Listener für das Formular
const form = document.getElementById("contact-form");
form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const responseMessage = document.getElementById("response-message");
    responseMessage.style.display = "none"; // Verstecke vorherige Nachrichten

    try {
        // Ladeanzeige anzeigen
        responseMessage.style.display = "block";
        responseMessage.textContent = "Sending your message...";

        // Simulierter Datenversand mit `async/await`
        const result = await sendData(name, email, message);
        responseMessage.textContent = result; // Erfolgsmeldung anzeigen
        responseMessage.style.color = "green";
    } catch (error) {
        responseMessage.textContent = "Failed to send message. Please try again.";
        responseMessage.style.color = "red";
    }
});
