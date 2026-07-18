export function sendData(name, email, message, delay = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (name && email && message) {
                resolve("Message sent successfully!");
            } else {
                reject(new Error("Please fill in all fields."));
            }
        }, delay);
    });
}

function initializeContactForm() {
    const form = document.getElementById("contact-form");
    const responseMessage = document.getElementById("response-message");

    if (!form || !responseMessage) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        responseMessage.hidden = false;
        responseMessage.textContent = "Sending your message...";
        responseMessage.className = "status-message";

        try {
            const result = await sendData(
                formData.get("name")?.trim(),
                formData.get("email")?.trim(),
                formData.get("message")?.trim()
            );
            responseMessage.textContent = result;
            responseMessage.classList.add("status-message--success");
            form.reset();
        } catch (error) {
            responseMessage.textContent = error.message;
            responseMessage.classList.add("status-message--error");
        }
    });
}

if (typeof document !== "undefined") {
    initializeContactForm();
}
