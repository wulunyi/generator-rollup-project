/** 调试文件 */
const yeoman = require("yeoman-environment");
const yeomanRuntime = yeoman.createEnv();

yeomanRuntime
    .register(require.resolve("./generators/app/index"), "rollu-project")
    .run("rollu-project debug_target", err => {
        console.log(err);
    });
