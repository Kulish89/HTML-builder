const fs = require("fs");
const path = require("path");

const readFiles = async (files, data = "") => {
  if (files.length === 0) return data;
  const file = files.pop();
  const info = path.parse(file);
  let s = "";
  if (info.ext === ".css") s = await fs.promises.readFile(file);
  return readFiles(files, data + s);
};

const build = (dir) => {
  const styleBundle = path.join(dir, "project-dist/", "bundle.css");
  fs.rm(styleBundle, { recursive: true }, (err) => {
    console.log("Start build");
    fs.promises
      .readdir(path.join(dir, "styles/"), { withFileTypes: true })
      .then((files) => {
        const list = files.map((f) => path.join(dir, "styles/", f.name));
        readFiles(list).then((data) => {
          fs.writeFile(styleBundle, data, (err) => {
            if (err) console.error(err);
            else {
              console.log("Bundle created!");
            }
          });
        });
      });
  });
};

build(__dirname);
