let ws;

function connect() {
    ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = (event) => {
        const msg = event.data;
        document.getElementById('chat').innerHTML += `<p>${msg}</p>`;
    };
}

function sendMessage() {
    const message = document.getElementById('message').value;
    ws.send(message);
}

window.onload = connect;
