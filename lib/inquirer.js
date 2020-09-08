const inquirer = require ('inquirer');

module.exports = {
    askProjectDetails: () => {
        const questions = [
            {
                type: 'list',
                name: 'projectType',
                message: 'Choose what type of project you wish to create:',
                choices: ['Create React App', 'React Native - Expo', 'Express', 'Python'],
                validate: function(value) {
                    if (this.choices.includes(value)) {
                        return true;
                    } else {
                        return 'Please enter the type of App you would like to create';
                    }
                }
            },
            {
                name: 'projectName',
                type: 'input',
                message: 'Enter the name of your project:',
                validate: function(value) {
                    if(value.length) {
                        return true;
                    } else {
                        return 'Please enter the name of your project.'
                    }
                }
            },
        ]
        return inquirer.prompt(questions);
    },

    askGithubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your GitHub username or e-mail address:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your username or e-mail address';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your GitHub password',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your password.';
                    }
                }
            }
        ]
        return inquirer.prompt(questions);
    },

    getTwoFactorAuthenticationCode: () => {
        return inquirer.prompt({
            name: 'tyowFactorAuthenticationCode',
            type: 'input',
            message: 'Enter your two-factor authentication code:',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please input your two-factor authentication code.'
                }
            }

        });
    },

    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter your repository name:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a name for the repository';
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: 'Optionally enter a description of the repository:'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or Private: ',
                choices: ['public', 'private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
    }
};