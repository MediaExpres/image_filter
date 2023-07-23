"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var pinia_1 = require("pinia");
var App_vue_1 = require("./App.vue");
require("./assets/main.css");
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use((0, pinia_1.createPinia)());
app.mount("#app");
// let example =5;
// function sum(a: number, b: number): number {
//     return a + b;
// }
// console.log(sum(5, 2));
