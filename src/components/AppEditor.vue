<template>
    <div class="my-8">
      <canvas width="448" height="448" ref="canvasEl"></canvas>
      <div class="text-white text-xl mt-4">
        <div class="flex justify-center gap-4">
          <button type="button" class="py-4 w-full"
          v-for="(filter, index) in filters"
          :key="index"
          :class="{
            'bg-pink-600': store.filter !== filter,
            'bg-green-600': store.filter === filter,

          }"
        @click="store.filter = store.filter === filter ? '' : filter"

        >{{filter}}</button>

        </div>
        <a class="bg-indigo-700 py-4 block w-full mt-2 text-center" 
        :href="canvasImageUrl"
        download="filtered_image.png"
        >
          Download
        </a>
      </div>
    </div>
</template>

<script setup lang="ts">

import { useImageStore } from "@/stores/image";
import useReader from "@/composables_or_hooks/use-reader";
import useCanvas from "@/composables_or_hooks/use-canvas";


const filters=["oceanic", "vintage", "rosetint"];
const store = useImageStore();
// filterImage was added last in the coursea, and canvasImageURL even later together with the Download button updated above at line 20 and 21
const { canvasEl, loadImage, drawOriginalImage, filterImage, canvasImageUrl } = useCanvas();
const { reader } = useReader(store.file, () => {
  if(!reader.result) return;

  const dataURL = reader.result.toString();
  loadImage(dataURL);
});

// below function notify us of mutations of the state which was added last int the course
// after adding filterImage(state.filter); we can put the app to a test 
store.$subscribe((mutation, state) => {
  drawOriginalImage();
  filterImage(state.filter);
});
</script>