"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { readAllFilePaths } = require("./helper");
const path = require("path");

module.exports = class extends Generator {
    prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(
                `Welcome to the prime ${chalk.red(
                    "generator-rollup-project"
                )} generator!`
            )
        );

        const prompts = [
            {
                type: "input",
                name: "projectName",
                message: "Your project name",
                default: this.appname
            }
        ];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
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
        this.installDependencies({
            npm: true,
            bower: false
        });
    }

    end() {
        console.log(chalk.green("success!!!"));
    }
};
