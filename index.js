const http = require("http");
const request = require("request");

/**
 * Returns a server on which you call .listen
 *
 * @param {Object} [options]
 * @param {Number} [options.port] port number (Only used to be displayed on home page) - specify port on .listen()
 * @param {String} [options.localIp] localIp of the computer (Only used to be displayed on home page)
 */
const makeServer = ({ port, localIp }) => {
  return http.createServer((req, res) => {
    const match = req.url.match(/^\/delay\/(\d+)\/(.*)/);
    if (match) {
      let delay = parseInt(match[1], 10);
      const proxyUrl = match[2];

      if (isNaN(delay) || delay < 0 || delay > 20000) {
        delay = 0;
      }

      if (proxyUrl) {
        // retrieve original request headers (traffic might be rejected for host mismatch)
        const { host, ...headers } = req.headers;

        var proxyReq = request(
          {
            url: proxyUrl,
            method: req.method,
            headers: {
              ...headers,
              "X-Forwarded-Host": host
            }
          },
          error => {
            if (error) {
              console.error(error);
            }
          }
        );
        if (delay) {
          proxyReq.on("response", proxyRes => {
            proxyRes.pause();
            setTimeout(() => {
              proxyRes.pipe(res);
            }, delay);
          });
        } else {
          req.pipe(proxyReq).pipe(res);
        }
      } else {
        return res.end(`No url specified`);
      }
    } else {
      return res.end(`
      Use the /delay/:milliseconds/:url endpoint to delay a response.

      Examples of a call:
      
        * http://localhost:${port}/delay/1000/https://jsonplaceholder.typicode.com/posts/1/comments
        * http://${
          localIp ? localIp : "0.0.0.0"
        }:${port}/delay/1000/https://jsonplaceholder.typicode.com/posts/1/comments
        * http://localhost:${port}/delay/2000/https://via.placeholder.com/350x150/F00000/FFFFFF?text=Hello+world!
        * http://${
          localIp ? localIp : "0.0.0.0"
        }:${port}/delay/2000/https://via.placeholder.com/350x150/F00000/FFFFFF?text=Hello+world!
      `);
    }
  });
};

module.exports.makeServer = makeServer;
