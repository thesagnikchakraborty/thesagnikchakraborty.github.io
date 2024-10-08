document.getElementById("sendButton").addEventListener("click", function() {
    let userInput = document.getElementById("userInput").value;
    if (userInput) {
        addMessage(userInput, "user");
        document.getElementById("userInput").value = "";
        getAIResponse(userInput);
    }
});

function addMessage(text, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getAIResponse(userInput) {
    const apiKey = "AIzaSyAZUHfmV8QkcG9bKtZK3MO03SZ8sHa3ABc";
    const url = `https://generativeai.googleapis.com/v1beta2/chat:generateMessage?key=${apiKey}`;

    const requestBody = {
        "prompt": userInput,
        "model": "chat-bison-001"  // You can use different models if available
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.response && data.response.generations[0].text) {
            addMessage(data.response.generations[0].text, "bot");
        } else {
            addMessage("Sorry, I couldn't process that.", "bot");
        }
    })
    .catch(error => {
        console.error("Error fetching AI response:", error);
        addMessage("An error occurred. Please try again.", "bot");
    });
}
