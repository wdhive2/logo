console.clear()
const fs = require('fs')
const path = require('path')
const { convertFile } = require('convert-svg-to-png')

const inputDirPath = path.join(__dirname + '/svg')
const outputDirPath = path.join(__dirname + '/png')
const fileSizes = [
  16, 24, 48, 57, 60, 64, 72, 76, 96, 114, 120, 128, 144, 152, 180, 192, 256,
  384, 512, 1024, 2048, 3072, 4096
]

if (fs.existsSync(outputDirPath)) {
  fs.rmSync(outputDirPath, { recursive: true, force: true })
}
fs.mkdirSync(outputDirPath)

const converter = async (fileSrc, fileName, fileSize) => {
  const fileNameNoExt = fileName.replace('.svg', '')
  const outputFileName = `${fileNameNoExt}_${fileSize}.png`

  await convertFile(fileSrc, {
    width: fileSize,
    height: fileSize,
    outputFilePath: path.join(outputDirPath, outputFileName),
  })

  console.log('\x1b[0m\x1b[32m%s', 'Created:\x1b[0m', outputFileName)
}

fs.readdirSync(inputDirPath).forEach(async fileName => {
  if (!fileName.endsWith('.svg')) return
  for (let fileSize of fileSizes) {
    const fileSrc = path.join(inputDirPath, fileName)
    await converter(fileSrc, fileName, fileSize)
  }
})
