const fs = require("fs");
const path = require("path");
const { stdout, stdin, stderr } = process;

const writeStream = fs.createWriteStream(path.join(__dirname, "text.txt"));

stdout.write("Hello my friend! You can write your message.\n");
const readStream = fs.createReadStream(
  path.join(__dirname, "text.txt"),
  "utf-8"
);

stdin.on("data", (data) => {
  if (data.toString().length === 2) {
    stdout.write("Please, inter your message!!!\n");
  } else {
    writeStream.write(data);
  }
});

process.on("exit", (code) => {
  if (code === 0) {
    stdout.write("Ok, good by!");
  } else {
    stderr.write(`Ooops, something happens, error - ${code}`);
  }
});
