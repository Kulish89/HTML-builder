const path = require("path");
const fs = require("fs");
const myPath = path.join(__dirname, "secret-folder");

function getFilesinFolder(pathToFolder) {
  fs.readdir(pathToFolder, { withFileTypes: true }, (error, files) => {
    if (!error) {
      for (const file of files) {
        if (file.isDirectory()) {
          let newPathToFolder = path.join(pathToFolder, file.name);
          getFilesinFolder(newPathToFolder);
        } else {
          fs.stat(path.join(pathToFolder, file.name), (err, stats) => {
            if (err) console.log(err);
            else {
              if (path.parse(file.name).ext) {
                console.log(
                  `${path.parse(file.name).name} - ${path
                    .parse(file.name)
                    .ext.slice(1)} - ${stats.size}kb`
                );
              } else {
                console.log(
                  `${path.parse(file.name).name.slice(1)} - ${stats.size}kb`
                );
              }
            }
          });
        }
      }
    } else {
      console.log(error);
    }
  });
}
getFilesinFolder(myPath);
