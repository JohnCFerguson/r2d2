const CLI = require('clui');
const Configstore = require('configstore');
const Octokit = require('@octokit/rest');
const Spinner = CLI.Spinner;
const { createBasicAuth } = require('@octokit/auth-basic');
const { createAppAuth } = require('@octokit/auth-app');

const inquirer = require('./inquirer');
const pkg = require('../package.json')

const conf = new Configstore(pkg.name);

let octokit;

module.exports = {
    getInstance: () => {
        return octokit;
    },

    getStoredGithubToken: () => {
        return conf.get('github.token');
    },

    getPersonalAccessToken: async () => {
        const credentials = await inquirer.askGithubCredentials();
        const status = new Spinner('Authenticating you, please wait...');

        status.start();

        const auth = createAppAuth({
            
        })

        /*const auth = createBasicAuth({
            username: credentials.username,
            password: credentials.password,
            async on2Fa() {
                status.stop();
                const res = await inquirer.getTwoFactorAuthenticationCode();
                status.start();
                return res.tyowFactorAuthenticationCode;
            },
            token: {
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'r2d2 - the cli for initializing multiple different kinds of projects (React, NodeJS, Express, React-Native, Python, etc...)'
            }
        });*/

        try {
            const res = await auth();

            if(res.token) {
                conf.set('github.token', res.token);
                return res.token;
            } else {
                throw new Error("Github token was not found in the response");
            }
        } finally {
            status.stop();
        }
    },

    githubAuth: (token) => {
        octokit = new Octokit({
            auth: token
        })
    },
}