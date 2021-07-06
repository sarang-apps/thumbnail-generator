"use strict";

var thumbnailGen = require("./index");
const path = require("path");

// var filePath = "/Users/computerroom/Desktop/test_files/job_queue.json";
// var filePath = "/Users/computerroom/Desktop/test_files/WhatsApp Audio 2020-09-06 at 4.58.53 PM.mp4";
// var filePath = "/Users/computerroom/Desktop/test_files/Mumay Smruty 3's.tif";
// var filePath = "/Users/computerroom/Desktop/test_files/test.jpg";
// var filePath = "/Users/computerroom/Desktop/test_files/World ending.mp4";
var filePath = "/Users/computerroom/Desktop/test_files/test.mp3";
// var filePath = "/Users/computerroom/Desktop/Screenshots/Output_Test/test1.jpg";

var thumbsPath = "/Users/computerroom/Desktop/test_files/thumbnail.jpg";
let thumbsFolder = "/Users/computerroom/Desktop/test_files/";
var spriteFolder = "/Users/computerroom/Desktop/test_files/";

// TESTING
(async () => {
	thumbnailGen.getMetadata(filePath).then((result) => {
		console.log(result);
	});

	thumbnailGen.getAudioMetadata(filePath).then((result) => {
		console.log(result);
	});

	thumbnailGen.getFileType(filePath).then((type) => {
		var fileName = path.basename(filePath, path.extname(filePath));
		var thumbsPath = "/Users/computerroom/Desktop/test_files/thumbnail3.jpg";

		if (type) {
			// console.log(type);
			switch (type) {
				case "image":
					thumbnailGen.getPhotoThumbnail(filePath, thumbsPath);
					break;
				case "video":
					var thumbsPath = thumbnailGen
						.getVideoThumnail(filePath, thumbsFolder, fileName)

						.catch((error) => {
							console.log(error);
						});
					var thumbsPath = thumbnailGen
						.getVideoSprite(filePath, spriteFolder, fileName)
						.catch((error) => {
							console.log(error);
						});
					break;
				case "audio":
					thumbnailGen.getAudioArt(filePath);
					break;

				default:
					break;
			}
		}
	});
})();
