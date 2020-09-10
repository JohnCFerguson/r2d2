const { exec, spawn } = require("child_process");
const CLI = require('clui');
const Spinner = CLI.Spinner;
const files = require('./files');
const inquirer = require('./inquirer');

function execShellCommand(cmd) {
    console.log(cmd);
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return;
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

function spawnShellCommand(cmd, args, spinner) {
    console.log(cmd, args);
    const runCmd = spawn(cmd, args);
    spinner.start();
    runCmd.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    runCmd.stderr.on('data', (data) => {
        console.error(`${data}`);
    });

    runCmd.on('close', (code) => {
        spinner.stop();
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = {
    createLocalProject: async () => {
        const projectDetails = await inquirer.askProjectDetails();
        const projectType = projectDetails.projectType;
        const projectName = projectDetails.projectName;

        const spinner = new Spinner(`Creating new ${projectType} application, this may take a while...`);

        if (!files.directoryExists(projectName)) {
            files.mkDir(projectName);
            switch(projectType) {
                case "Create React App":
                    try{
                        spawnShellCommand("npx", ["create-react-app", projectName], spinner)
                    } catch (err) {
                        throw err;
                    }
                    break;
                case "React Native - Expo":
                    console.log('trying to create Expo App');
                    try{
                        spawnShellCommand(`expo`, ["init", projectName, "--template", "blank"], spinner);
                    } catch (err) {
                        throw err;
                    }
                    break;
                default:
                    process.exit();
            }
        }
    }
}