const fs = require("fs");
const path = require("path");

const copyDir = (dirSource, dirTarget) => {
  fs.rm(dirTarget, { recursive: true }, (err) => {
    fs.promises
      .mkdir(dirTarget, { recursive: true })
      .then(function () {
        console.log("Copy dir " + dirSource + " to " + dirTarget);

        fs.promises.readdir(dirSource, { withFileTypes: true }).then((files) =>
          files.forEach((file) => {
            if (file.isFile()) {
              fs.promises.copyFile(
                path.join(dirSource, file.name),
                path.join(dirTarget, file.name)
              );
            } else if (file.isDirectory()) {
              copyDir(
                path.join(dirSource, file.name, "/"),
                path.join(dirTarget, file.name, "/")
              );
            }
          })
        );
      })
      .catch(function () {
        console.log("Failed to create directory!");
      });
  });
};

console.log("Application start!");

const source = path.join(__dirname, "files/");
const target = path.join(__dirname, "files-copy/");

copyDir(source, target);
