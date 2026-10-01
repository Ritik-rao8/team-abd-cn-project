const http = require('http');

const PORT = 3002;
const BACKEND_NAME = 'B';

const server = http.createServer((req, res) => {
  // Request logging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60',
      'ETag': '"v1-status"' // Added ETag header
    });
    res.end(JSON.stringify({ message: `Backend ${BACKEND_NAME} is running` }));
  } else if (req.url === '/api/status') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Backend': BACKEND_NAME,
      'Cache-Control': 'max-age=60',
      'ETag': '"v1-status"' // Added ETag header
    });
    res.end(JSON.stringify({ backend: BACKEND_NAME, status: 'ok' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
  }
});

// IMPORTANT: '0.0.0.0' means "listen on every network interface",
// not just this Mac. If you use '127.0.0.1' here, no other machine
// on the network will ever be able to reach this server.
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend ${BACKEND_NAME} listening on port ${PORT}`);
});