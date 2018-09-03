#!/usr/bin/env node

const chalk = require("chalk");
const argv = require("minimist")(process.argv.slice(2));
const pkg = require("../package.json");

const myLocalIp = require("my-local-ip")();

const { makeServer } = require("../index");

const port = argv.p || argv.port || 8001;

const help = () => {
  console.log(chalk`
  {bold.cyan delay-proxy} - Proxy http requests with custom delay for response

  {bold USAGE}
      {bold $} {cyan delay-proxy} --help
      {bold $} {cyan delay-proxy} --version
      {bold $} {cyan delay-proxy} [-p {underline port}]

      By default, {cyan delay-proxy} will listen on {bold 0.0.0.0:8001}.

  {bold OPTIONS}
      --help                              Shows this help message
      -v, --version                       Displays the current version of delay-proxy
      -p, --port {underline port}                     Specify a port on which to listen
  `);
};

if (argv.h || argv.help) {
  help();
  return;
}

if (argv.v || argv.version) {
  console.log(pkg.version);
  return;
}

// create and launch server
makeServer({ port, localIp: myLocalIp }).listen(port, () =>
  console.log(chalk`
{bold delay-proxy} server started

  {bold Local:}            http://localhost:{bold ${port}}
  {bold On Your Network:}  http://${myLocalIp}:{bold ${port}}`)
);
