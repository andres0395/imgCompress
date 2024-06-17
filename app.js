import fse from "fs-extra";
import imagemin from "imagemin";
import imageminGifsicle from "imagemin-gifsicle";
import imageminJpegtran from "imagemin-jpegtran";
// import imageminWebp from "imagemin-webp";
import imageminPngquant from "imagemin-pngquant";
// import imageminSvgo from "imagemin-svgo";
import sharp from "sharp";

let inputFolder = "src",
    outputFolder = "opt",
    targetWidth = 1920;
console.log('object');
const processImg = async()=>{
    try {
        const files = await fse.readdir(inputFolder);
        console.log(files);
        for (const file of files) {
            console.log(file);
            let inputPath = `${inputFolder}/${file}`;
            let outputPath = `${outputFolder}/${file}`;
            await sharp(inputPath).resize(targetWidth).toFile(outputPath);

            await imagemin([outputPath],{
                destination:outputFolder,
                plugins:[
                    imageminJpegtran({quality:80}), // comprimir jpg al 80
                    imageminPngquant(),
                    // imageminSvgo(),
                    // imageminWebp({quality:80}),
                    imageminGifsicle()
                ]
            });
            console.log('terminated successfully');
        }
    } catch (error) {
        console.error(error);
    }
}
console.log('75556');
processImg();