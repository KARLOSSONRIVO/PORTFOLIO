import {copyFile} from "node:fs/promises";
import sharp from "sharp";

/** Encode source raster art for deployment; copy fonts and vectors unchanged. */
export async function copySampleAsset(source,target){
  if(/\.png$/i.test(source)&&/\.webp$/i.test(target)){
    const image=sharp(source);
    const [lossless,nearLossless]=await Promise.all([
      image.clone().webp({lossless:true,effort:6}).toBuffer(),
      image.clone().webp({nearLossless:true,quality:90,effort:6}).toBuffer(),
    ]);
    const {writeFile}=await import("node:fs/promises");
    await writeFile(target,lossless.length<=nearLossless.length?lossless:nearLossless);
  }else await copyFile(source,target);
}
