import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'

const CLI = require('clui');
const fs = require('fs');
const Spinner = CLI.Spinner;
const touch = require('touch');
const _ = require('lodash');
const inquirer = require('./inquirer');

const inquirer = require('./inquirer');
const gh = require('./github');

module.exports = {
    createRemoteRepo: async () => {
        const github = gh.getInstance();
        const answers = await inquirer.askRepoDetails();

        const data = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility === 'private')
        };

        const status = new Spinner('Creating remote repository... ');
        status.start();

        try {
            const response = await github.repos.createForAuthenticatedUser(data);
            return response.data.ssh_url;
        } finally {
            status.stop();
        }
    },

    setupRepo: (repoDir, url) => {
        const status = new Spinner('Initializing local repo and pushing to remote...');
        status.start()
        
        const options = new SimpleGitOptions({
            baseDir: repoDir,
            binary: 'git',
            maxConcurrentProcesses: 6,
        })

        const git = new SimpleGit(simpleGit(options));

        return git.init()
            .then(git.add('.gitignore'))
            .then(git.add('./*'))
            .then(git.commit('Initial commit'))
            .then(git.addRemote('origin', url))
            .then(git.push('origin', 'master'))
            .finally(status.stop());
    },
}

