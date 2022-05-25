const fs = require("fs");
const { format } = require("path");
const path = require("path");
const { stdout, stdin } = process;

const writeStream = fs.createWriteStream(path.join(__dirname, "text.txt"));

stdout.write("Hello my friend! You can write your message.\n");
const readStream = fs.createReadStream(
  path.join(__dirname, "text.txt"),
  "utf-8"
);

stdin.on("data", (data) => {
  const buffer = Buffer.from("exit");
  if (data == buffer) {
    process.exit(0);
  } else if (data.toString().length === 2) {
    stdout.write("Please, inter your message!!!\n");
  } else {
    writeStream.write(data);
  }
});
process.on("exit", () => console.log("Ok, good by!"));
