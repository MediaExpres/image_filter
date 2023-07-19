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
    // next line provides execution of below code only if canvas exists, the same below at filterImage
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
}

return {
    canvasEl,
    loadImage,
    drawOriginalImage,
}
}