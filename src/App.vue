<template>
  <div
    class="font-['Quicksand'] max-w-xl bg-white p-8 shadow-2xl rounded absolute m-auto left-0 right-0 mt-32"
  >
    <h1 class="text-center text-3xl text-indigo-700">Vue Filters</h1>
    
    <AppUpload v-if="!store.file" />

    <AppEditor v-else/>

    <div class="my-8">
      <canvas width="448" height="448"></canvas>
      <div class="text-white text-xl mt-4">
        <div class="flex justify-center gap-4">
          <button type="button" class="bg-pink-600 py-4 w-full">Filter</button>
          <button type="button" class="bg-pink-600 py-4 w-full">Filter</button>
          <button type="button" class="bg-pink-600 py-4 w-full">Filter</button>
        </div>
        <a class="bg-indigo-700 py-4 block w-full mt-2 text-center">
          Download
        </a>
      </div>
    </div>
  </div>
  <AppBG />
</template>

<script setup lang="ts">
import { useImageStore } from './stores/image';

const store = useImageStore();
</script>