const fs = require("fs");
const path = require("path");

const copyDir = (dirSource, dirTarget) => {
  fs.rm(dirTarget, { recursive: true }, (err) => {
    fs.promises
      .mkdir(dirTarget, { recursive: true })
      .then(function () {
        console.log("Copy dir " + dirSource + " to " + dirTarget);

        fs.promises.readdir(dirSource, { withFileTypes: true }).then((files) =>
          files.forEach((v) => {
            if (v.isFile()) {
              fs.promises.copyFile(
                path.join(dirSource, v.name),
                path.join(dirTarget, v.name)
              );
            } else if (v.isDirectory()) {
              copyDir(
                path.join(dirSource, v.name, "/"),
                path.join(dirTarget, v.name, "/")
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
