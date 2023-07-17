import { ref } from "vue";

export default function useCanvas() {
const canvasEl = ref<HTMLCanvasElement | null>(null);
let canvasCtx: CanvasRenderingContext2D | null = null;

const imgEl = new Image();

function loadImage(url: string) {
    if(!canvasEl.value) return;

    canvasCtx = canvasEl.value.getContext("2d");

    imgEl.addEventListener("load", drawOriginalImage);

    imgEl.src = url;

}
function drawOriginalImage () {
    if(!canvasCtx || !canvasEl.value) return;

    canvasCtx.drawImage(imgEl, 0, 0);
}

return {
    canvasEl,
    loadImage,
}
}