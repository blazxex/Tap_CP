export let WIDTH = window.innerWidth-10;
export let HEIGHT = window.innerHeight-10;

export const updateWidthAndHeight = () => {
    WIDTH = window.innerWidth - 10;
    HEIGHT = window.innerHeight - 10;
};
// offset from orgin (WIDTH, HEIGHT) by offset 
export const OffsetFromOrigin = (origin, offset) => origin/2 + offset * origin; 
