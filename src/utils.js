import download from "download-git-repo";
import ora from "ora";
import { PROJECT_LIST } from './constant.js'

const spinner = ora('下载中...')

/**
 * 获取所有项目名称
 * @returns 
 */
export const getAllProject = () => {
    return PROJECT_LIST.map(item => {
        return {
            name: item.name,
            value: item.name
        }
    })
}


export const downloadTemplate = async (templateName, projectName) => {
    return new Promise((resolve, reject) => {
        const project = PROJECT_LIST.find(item => item.name === templateName)
        spinner.start()
        download(`direct:${project.url}#${project.branch}`, `${projectName}`, { clone: true }, function (error) {
            if (error) {
                spinner.fail('error')
                reject(error)
            } else {
                spinner.succeed('下载完成')
                resolve(true)
            }

        })
    })
}
