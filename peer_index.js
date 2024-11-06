
const { PeerServer } = require("peer");

PeerServer({ port: 9000, path: "/" });

console.log("Peer server running on port 9000");

