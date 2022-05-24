const path = require("path");
const fs = require("fs");

function getFilesinFolder(pathToFolder) {
  fs.readdir(pathToFolder, { withFileTypes: true }, (error, files) => {
    if (!error) {
      for (const file of files) {
        if (file.isDirectory()) {
          getFilesinFolder(path.join(__dirname, "secret-folder", "image.jpg"));
        } else {
          // fs.stat("index.js",
          //   (err, stats) => {
          //     if (err) console.log(err);
          //     else {
          //       console.log(stats.size);
          //     }
          //   }
          // );
          if (path.parse(file.name).ext) {
            console.log(
              `${path.parse(file.name).name} - ${path
                .parse(file.name)
                .ext.slice(1)}`
            );
          } else {
            console.log(`${path.parse(file.name).name.slice(1)}`);
          }
        }
      }
    } else {
      console.log(error);
    }
  });
}
getFilesinFolder(path.join(__dirname, "secret-folder"));
