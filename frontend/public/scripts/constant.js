export let WIDTH = window.innerWidth-10;
export let HEIGHT = window.innerHeight-10;

export const updateWidthAndHeight = () => {
    WIDTH = window.innerWidth - 10;
    HEIGHT = window.innerHeight - 10;
};
export const scaleX = WIDTH/1920;
export const scaleY = HEIGHT/1080;
export const ratio = WIDTH/HEIGHT;
export const scale = (scaleX> scaleY) ? scaleX: scaleY;
export const scale_m = (scaleX< scaleY) ? scaleX: scaleY;
// offset from orgin (WIDTH, HEIGHT) by offset 
export const OffsetFromOrigin = (origin, offset) => origin/2 + offset * origin; 
console.log(scaleX,scaleY);

