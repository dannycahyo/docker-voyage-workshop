const http = require("http");

const PORT = 3000;

const requestHandler = (request, response) => {
  console.log("Request received");
  response.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  response.end("Hello from the server!");
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.error("Server failed to start", err);
  }
  console.log(`Server is listening on port ${PORT}`);
});
