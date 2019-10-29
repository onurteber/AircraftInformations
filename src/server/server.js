const io = require("socket.io"),
  server = io.listen(8000);

let informationItemByClient = new Map();

server.on("connection", socket => {
  console.info(`Client connected [id=${socket.id}]`);
  const https = require("https");

  setInterval(() => {
    https
      .get(
        "https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226",
        resp => {
          let data = "";

          resp.on("data", chunk => {
            data += chunk;
          });

          if (resp.statusCode == 200) {
            try {
              resp.on("end", () => {
                informationItemByClient.set(socket, JSON.parse(data));
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      )
      .on("error", err => {});
  }, 1000);

  socket.on("disconnect", () => {
    informationItemByClient.delete(socket);
    console.log(`Client disconnected [id=${socket.id}]`);
  });
});

setInterval(() => {
  for (const [client, informationItem] of informationItemByClient.entries()) {
    client.emit("aircraft-imf", informationItem);
    informationItemByClient.set(client, informationItem);
  }
}, 100);
