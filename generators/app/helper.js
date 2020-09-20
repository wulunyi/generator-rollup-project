const fs = require("fs");
const path = require("path");

const DEFAULT_OPTIONS = {
    absolute: false,
    excludeDir: ["node_modules"],
    rootDir: ""
};

module.exports.readAllFilePaths = function readAllFilePaths(dir, options) {
    options = Object.assign(DEFAULT_OPTIONS, options);

    if (!options.absolute && options.rootDir === "") {
        options.rootDir = dir;
    }

    return fs.readdirSync(dir).reduce((final, curPath) => {
        const realpath = path.resolve(dir, curPath);

        const stat = fs.statSync(realpath);

        if (stat.isDirectory()) {
            if (!options.excludeDir.includes(curPath)) {
                final.push(...readAllFilePaths(realpath, options));
            }
        } else {
            final.push(
                options.absolute
                    ? realpath
                    : path.relative(options.rootDir, realpath)
            );
        }

        return final;
    }, []);
};
