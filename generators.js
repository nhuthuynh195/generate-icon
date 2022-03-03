/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const { execSync } = require('child_process')
const { readFileSync, writeFileSync } = require('fs')

const generateReactNativeAsset = (icons, { dir, fontName, fontDir }) => {
	const generatorOptions = {
		name: String(fontName),
		output: fontDir,
		'font-types': ['ttf'],
		'asset-types': ['json'],
		normalize: true,
	}
	const optionString = Object.entries(generatorOptions)
		.map(([option, value]) => `--${option} ${String(value)}`)
		.join(' ')

	execSync(`yarn run fantasticon ${optionString} ${String(dir)}`)

	const glyphMap = JSON.parse(
		readFileSync(`./${String(fontDir)}/${String(fontName)}.json`),
	)
	const customFontContent = [
		'{',
		icons
			.map((value) => {
				return `    "${String(value)}": ${Number(glyphMap[value])}`
			})
			.join(',\n'),
		'}',
	].join('\n')

	writeFileSync(
		`./${String(fontDir)}/${String(fontName)}.json`,
		customFontContent,
	)
	console.log('React Native Asset generated! ✅')
}

module.exports = {
	generateReactNativeAsset,
}
