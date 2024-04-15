export const WIDTH = window.innerWidth-10;
export const HEIGHT = window.innerHeight-10;

// offset from orgin (WIDTH, HEIGHT) by offset 
export const OffsetFromOrigin = (origin, offset) => origin/2 + offset * origin; 
