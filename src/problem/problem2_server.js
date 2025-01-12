const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected.');

    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log('Received from client:', message);

        // 3초 대기 후 응답 전송
        setTimeout(() => {
            const response = message === 'Ping' ? 'Pong' : message;
            socket.write(response + '\n');
            console.log('after 3secs, Sent to client:', response);
        }, 3000);
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
