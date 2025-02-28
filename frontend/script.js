async function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chatWindow = document.getElementById("chat-window");

    if (input.trim() === "") return; // Prevent sending empty messages

    chatWindow.innerHTML += `<p>You: ${input}</p>`;
    document.getElementById("user-input").value = ""; // Clear input

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });

        if (!response.ok) {
            throw new Error("Server response was not OK");
        }

        const data = await response.json();
        chatWindow.innerHTML += `<p>MindMate: ${data.reply}</p>`;

        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
    } catch (error) {
        chatWindow.innerHTML += `<p style="color:red;">Error: Unable to connect to backend.</p>`;
        console.error("Fetch error:", error);
    }
}
