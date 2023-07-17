import { ref } from "vue";

export default function useCanvas() {
const canvasEl = ref<HTMLCanvasElement | null>(null);
let canvasCtx: CanvasRenderingContext2D | null = null;

function loadImage() {
    if(!canvasEl.value) return;

    canvasCtx = canvasEl.value.getContext("2d");
}
}