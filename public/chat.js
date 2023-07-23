const socket = io.connect('http://localhost:3000');

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

submitBtn.addEventListener("click", () => {
    const trimmedSender = sender.value.trim();
    const trimmedMessage = message.value.trim();

    if (trimmedSender !== '' && trimmedMessage !== '') {
        socket.emit('chat', {
            message: trimmedMessage,
            sender: trimmedSender
        });
    }
});

socket.on('chat', (data) => {
    feedback.innerHTML = "";

    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';

    message.value = "";

    const el = document.getElementById('chat-window');
    el.scrollTo(0, el.scrollHeight); // Scroll'u her zaman en altta tut
});

message.addEventListener('keypress', () => {
    const trimmedSender = sender.value.trim();

    if (trimmedSender !== '') {
        socket.emit('typing', trimmedSender);
    } else {
        feedback.innerHTML = "";
    }
});

socket.on('typing', data => {
    feedback.innerHTML = `<p>${data} typing...</p>`;

    const el = document.getElementById('chat-window');
    el.scrollTo(0, el.scrollHeight); // Scroll'u her zaman en altta tut
});
