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

  console.log(req);
}