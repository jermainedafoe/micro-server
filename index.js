const http = require('http');
const sleep = require('then-sleep');
const { send, sendError, serve } = require('micro');

const server = new http.Server(
  serve(async (req, res) => {
    await sleep(500);
    try {
      send(res, 200, await requestHandler(req, res));
    } catch (err) {
      sendError(req, res, err);
    }
  }),
);

server.listen(8888, () => console.log('Listening on port 8888'));

async function requestHandler(req, res) {

  // console.log(req);

  const buf = await buffer(req)
  // console.log(buf)
  const txt = await text(req)
  // console.log(txt)
  const js = await json(req)
  // console.log(js);
}

const shutDown = () => {
  let closed = false;
  const gracefulShutdown = () => {
    if (closed) {
      return;
    }
    console.log("Shutting down....");
    server.close(() => {
      console.log("Server closed.")
    });

    closed = true;
  };
  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
  process.on("exit", gracefulShutdown);
};

shutDown();