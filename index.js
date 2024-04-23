#!/usr/bin/env node
import fs from 'node:fs'
import { program } from 'commander'
import inquirer from 'inquirer'
import { getAllProject, downloadTemplate } from './src/utils.js'

const packageJSON = JSON.parse(fs.readFileSync('./package.json').toString())
program.version(packageJSON.version)
program
    .command('create <projectName>')
    .alias('c')
    .description('创建项目')
    .action((projectName) => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: '请输入项目名称',
                    default: projectName
                },
                {
                    type: 'list',
                    name: 'templateName',
                    message: '请选择模板',
                    choices: getAllProject()
                }
            ]).then(res => {
                const name = res.projectName
                if (fs.existsSync(name)) {
                    console.log('文件夹已存在');
                    return
                }
                downloadTemplate(res.templateName, res.projectName)
            })
    });

program.parse(process.argv);