"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { readAllFilePaths } = require("./helper");
const path = require("path");
const { spawnSync } = require("child_process");

module.exports = class extends Generator {
    constructor(...args) {
        super(...args);

        this.argument("projectName", {
            type: String,
            optional: true,
            default: ""
        });
    }

    prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(
                `Welcome to the prime ${chalk.red(
                    "generator-rollup-project"
                )} generator!`
            )
        );

        const prompts = this.options.projectName
            ? []
            : [
                  {
                      type: "input",
                      name: "projectName",
                      message: "Your project name"
                  }
              ];

        return this.prompt(prompts).then(props => {
            this.props = Object.assign(
                {
                    projectName: this.options.projectName
                },
                props
            );
        });
    }

    writing() {
        this.destinationRoot(this.props.projectName);

        const copyFiles = readAllFilePaths(
            path.resolve(__dirname, "./templates"),
            {
                excludeDir: ["node_modules", "coverage", "lib"]
            }
        );

        copyFiles.forEach(item => {
            this.fs.copy(this.templatePath(item), this.destinationPath(item));
        });
    }

    install() {
        try {
            spawnSync("git", ["init"]);
            console.log(chalk.green("git init success"));
        } catch {
            console.log(chalk.yellow("git init failed"));
        }

        this.installDependencies({
            npm: true,
            bower: false
        });
    }

    end() {
        console.log(chalk.green("success!!!"));
    }
};
