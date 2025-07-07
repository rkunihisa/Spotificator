import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("Hello, World!");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
