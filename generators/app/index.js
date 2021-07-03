"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const glob = require("glob");

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What project name would you like?",
        validate: (s) => {
          if (/^[a-zA-Z0-9_-]*$/g.test(s)) {
            return true;
          }

          return "Please only use alphanumeric characters for the project name.";
        },
        default: "anubhavhanaadp",
      },
      {
        type: "confirm",
        name: "newDir",
        message: "Would you like to create a new directory for this project?",
        default: true,
      },
      {
        type: "input",
        name: "hdiContainerName",
        message: "What is the name of your HDI container (Copy from BTP HANA Explorer)?",
        default: "myhanacon",
      },
      {
        type: "confirm",
        name: "authorization",
        message: "Would you like authorization?",
        default: true,
      },
      {
        type: "input",
        name: "clientHostname",
        message: "What is the hostname of the client application that will be accessing HAA? Use * for wildcard.",
        validate: (s) => {
          if (s === "*") {
            return true;
          }
          if (/^[a-zA-Z0-9.-]*$/g.test(s)) {
            return true;
          }
          return "Please only use alphanumeric characters for the client application hostname or use * for wildcard.";
        },
        default: "*"
      },
      {
        type: "confirm",
        name: "personalizeJWT",
        message: "Would you like HAA to propagate the application user to SAP HANA Cloud?",
        default: false
      },
      {
        type: "confirm",
        name: "useNamedUser",
        message: "Would you like HAA to connect to SAP HANA Cloud via JWT-based SSO (this implies shadow users in SAP HANA Cloud)?",
        default: false
      }
    ]).then((answers) => {
      if (answers.newDir) {
        this.destinationRoot(`${answers.projectName}`);
      }
      this.config.set(answers);
    });
  }

  writing() {
    this.sourceRoot(path.join(__dirname, "templates"));
    glob
      .sync("**", {
        cwd: this.sourceRoot(),
        nodir: true,
      })
      .forEach((file) => {
        const sOrigin = this.templatePath(file);
        const sTarget = this.destinationPath(file);
        this.fs.copyTpl(sOrigin, sTarget, this.config.getAll());
      });
  }

  install() {
    /*
    This.installDependencies({
      bower: false,
      npm: true
    });
    */
  }

  end() {
    this.log("");
    this.log("Success! Thanks for choosing AnubhavTrainings.com, You can download the SAP HANA Analytics Adapter from https://tools.hana.ondemand.com/#hanatools ");
    this.log("");
  }
};
