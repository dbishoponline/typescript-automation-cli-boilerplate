import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import screenshot from 'screenshot-desktop'
import moment from 'moment'

import config from '../config'

import { exec } from 'child_process'

const executeCommandAsync = promisify(exec)

const getFrontmostApplicationName = async (command: string): Promise<string> => {
  try {
    const { stdout } = await executeCommandAsync(command)
    const applicationName = stdout.trim()
    return applicationName
  } catch (error) {
    throw error
  }
}

// responds with info of what the user is looking.
const printFrontmostApplicationName = async () => {
  const command1 = `osascript -e 'tell application "System Events" to get name of (processes whose frontmost is true)'`
  const command2 = `osascript -e 'tell application "System Events" to get name of window 1 of (processes whose frontmost is true)'`

  try {
    const res1 = await getFrontmostApplicationName(command1)
    const res2 = await getFrontmostApplicationName(command2)

    console.log(`Name: ${res1}`)
    console.log(`Name of window 1: ${res2}`)

  } catch (error) {
    console.error('Error getting frontmost application:', error)
  }
}




const getScreenshotFilename = (index: number): string => `screenshot_${moment().format()}_${index}.png`

const writeFileAsync = promisify(fs.writeFile)

const takeScreenshotAndSave = async (screenshotPath: string): Promise<void> => {
  try {
    const imageBuffer = await screenshot()
    await writeFileAsync(screenshotPath, imageBuffer)
    console.log(`Screenshot saved at: ${screenshotPath}`)
  } catch (error) {
    console.error('Error taking and saving screenshot:', error)
  }
}

const createFolderIfNotExists = (folderPath: string): void => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
}

const takeSingleScreenshot = async (screenshotsFolderPath: string, index: number): Promise<void> => {
  const screenshotPath = path.join(screenshotsFolderPath, getScreenshotFilename(index + 1))
  await takeScreenshotAndSave(screenshotPath)
  await new Promise((resolve) => setTimeout(resolve, 10 * 1000))
}

export const trackWorkingActivity = async (interval: number, numberOfScreenshots: number): Promise<void> => {
  const screenshotsFolderPath = process.env.screenshots_path || path.join(__dirname, 'screenshots')
  createFolderIfNotExists(screenshotsFolderPath)

  for (let i = 0; i < numberOfScreenshots; i++) {
    console.log(``)
    await printFrontmostApplicationName()
    await takeSingleScreenshot(screenshotsFolderPath, i)
  }
}

// trackWorkingActivity(config.interval_seconds, config.number_of_screenshots).catch(console.error)
export default {
  trackWorkingActivity,
}