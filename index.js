/* jshint node: true */
"use strict";

const FileType = require("file-type");
const exiftool = require("exiftool-vendored").exiftool;
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
// const path = require("path");
const sprite = require("ffmpeg-generate-video-preview");
const audioMetadata = require("music-metadata");

// Get File Type Function
const getFileType = (path) => {
	return new Promise((resolve, reject) => {
		FileType.fromFile(path).then((fileType) => {
			// console.log(fileType);

			if (fileType) {
				let fileString = fileType.mime;
				let index = fileString.indexOf("/");
				if (index > -1) {
					let type = fileString.substring(0, index).trim();
					resolve(type);
				} else {
					resolve(fileString);
				}
			} else {
				let output = JSON.stringify({ status: "failed", error: e });
				reject(output);
			}
		});
	});
};

const getPhotoThumbnail = (path, thumbsPath) => {
	return new Promise((resolve, reject) => {
		try {
			// console.log(thumbsPath);
			sharp(path)
				.resize(160)
				.jpeg({
					quality: 50,
				})
				.toFile(thumbsPath)
				.then(() => {
					let output = JSON.stringify({ status: "success" });
					resolve(output);
				});
			// console.log(thumbsOutput);
		} catch (e) {
			let output = JSON.stringify({ status: "failed", error: e });
			console.error("Thumbnail Generation Error: ", err);
			reject(output);
		}
	});
};

const getVideoThumnail = (path, thumbsFolder, fileName) => {
	return new Promise((resolve, reject) => {
		try {
			// let thumbsPath = thumbsFolder + fileName + "_thumbs";

			ffmpeg(path).screenshots({
				count: 1,
				filename: fileName + "_thumbs",
				folder: thumbsFolder,
				size: "160x160",
			});
			let output = JSON.stringify({ status: "success" });
			resolve(output);

			// console.log(metadata);
		} catch (e) {
			let output = JSON.stringify({ status: "failed", error: e });
			reject(output);
		}
	});
};

const getVideoSprite = (path, spriteFolder, fileName) => {
	return new Promise((resolve, reject) => {
		try {
			let spritePath = spriteFolder + fileName + "sprite.jpg";

			const metadata = sprite({
				input: path,
				output: spritePath,
				width: 96,
				cols: 5,
				rows: 5,
			}).then(() => {
				let output = JSON.stringify({ status: "success" });
				resolve(output);
			});

			// console.log(metadata);
		} catch (e) {
			let output = JSON.stringify({ status: "failed", error: e });
			reject(output);
		}
	});
};

const getAudioArt = (path) => {
	return new Promise((resolve, reject) => {
		try {
			audioMetadata.parseFile(path).then((metadata) => {
				// console.log(metadata);
				let audioArt = audioMetadata.selectCover(metadata.common.picture);

				// console.log(audioArt);

				let output = JSON.stringify({ status: "success", thumbnail: audioArt });
				resolve(output);
			});
		} catch (error) {
			let output = JSON.stringify({ status: "failed", error: e });
			reject(output);
		}
	});
};

const getMetadata = (path) => {
	return new Promise((resolve, reject) => {
		try {
			exiftool.read(path).then((tags) => resolve(tags));
		} catch (error) {
			let output = JSON.stringify({ status: "failed", error: e });
			reject(output);
		}
	});
};

// Don't Use unless needed, Exiftool is better
const getAudioMetadata = (path) => {
	return new Promise((resolve, reject) => {
		try {
			audioMetadata.parseFile(path).then((metadata) => {
				resolve(metadata);
			});
		} catch (error) {
			let output = JSON.stringify({ status: "failed", error: e });
			reject(output);
		}
	});
};

module.exports = {
	getFileType,
	getPhotoThumbnail,
	getVideoThumnail,
	getVideoSprite,
	getAudioArt,
	getMetadata,
	getAudioMetadata,
};
