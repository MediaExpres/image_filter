import { ref } from "vue";
import { open_image, filter, putImageData } from "@silvia-odwyer/photon";

export default function useCanvas() {
const canvasEl = ref<HTMLCanvasElement | null>(null);
let canvasCtx: CanvasRenderingContext2D | null = null;

const imgEl = new Image();

function calculateAspectRatio(
    srcWidth: number, 
    srcHeight: number, 
    maxWidth: number, 
    maxHeight: number) 
{
const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
return { width: srcWidth * ratio, height: srcHeight * ratio };
}

function loadImage(url: string) {
    if(!canvasEl.value) return;

    canvasCtx = canvasEl.value.getContext("2d");

    imgEl.addEventListener("load", drawOriginalImage);

    imgEl.src = url;

}
function drawOriginalImage () {
    // MEMO: next line provides execution of below code only if canvas exists, the same below at filterImage
    // canvasCtx is a variable, canvasEl is a value :)))) 

    if(!canvasCtx || !canvasEl.value) return;

    const newImageDimension = calculateAspectRatio(
        imgEl.naturalWidth,
        imgEl.naturalHeight,
        448,
        448
    );

    canvasEl.value.width = newImageDimension.width;
    canvasEl.value.height = newImageDimension.height;

    canvasCtx.drawImage(imgEl, 0, 0, newImageDimension.width, newImageDimension.height);
}

function filterImage(filterName: string) {
    if(!canvasCtx || !canvasEl.value) return;
    const photonImage = open_image(canvasEl.value, canvasCtx);

    if(filterName.length) {
        filter(photonImage, filterName)
    }
    // now the filtered image exist only in memory, we have to put it down as follows:
    putImageData(canvasEl.value, canvasCtx, photonImage)
}

return {
    canvasEl,
    loadImage,
    drawOriginalImage,
    // below line exposes filterImage to external sources
    filterImage
}
}