#!/usr/bin/env node
const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")
const files = require("./lib/files")
const github = require("./lib/github")
const project = require("./lib/project")

clear();

console.log(
    chalk.yellow(
        figlet.textSync('R2-D2', { horizontalLayout: 'full'})
    )
)

/*if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a local Git Repo!'));
    process.exit();
}*/

const run = async () => {
    const projDir = project.createLocalProject();
}

const runGithub = async () => {
    let token = github.getStoredGithubToken();
    if (!token) {
        token = await github.getPersonalAccessToken();
    }

    console.log(token)
    run();
}

runGithub();