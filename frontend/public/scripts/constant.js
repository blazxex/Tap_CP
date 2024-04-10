export const WIDTH = 1920-50;
export const HEIGHT = 1080-50;
// (0,0) is top left, WHY...

// offset from orgin (WIDTH, HEIGHT) by offset 
export const OffsetFromOrigin = (origin, offset) => origin/2 + offset * origin; 
