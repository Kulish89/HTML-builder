const fs = require("fs");
const process = require("process");
const path = require("path");

const writeStream = fs.createWriteStream(path.join(__dirname, "text.txt"));

process.stdout.write("Hello my friend! You can write your message.\n");

process.stdin.on("data", (data) => {
  if (data.toString().trim() == "exit") {
    process.exit(0);
  } else if (data.toString().length === 2) {
    process.stdout.write("Please, inter your message!!!\n");
  } else {
    writeStream.write(data);
  }
});
process.on("exit", () => console.log("Ok, good bye!"));
process.on("SIGINT", () => {
  process.exit(0);
});
