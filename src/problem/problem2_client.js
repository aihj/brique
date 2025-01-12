const net = require('net');

const client = new net.Socket();

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 4000;

client.connect(SERVER_PORT, SERVER_HOST, () => {
    console.log('Connected to server.');

    // 여러 메시지를 비동기로 보냄
    const messages = ['Ping', 'Hello', 'Ping', 'How are you?'];
    messages.forEach((message, index) => {
        setTimeout(() => {
            console.log('Sending to server:', message);
            client.write(message + '\n');
        }, index * 1000); // 1초 간격으로 메시지 전송
    });
});

client.on('data', (data) => {
    console.log('Received from server:', data.toString().trim());
});

client.on('close', () => {
    console.log('Connection closed.');
});

client.on('error', (err) => {
    console.error('Client error:', err.message);
});
