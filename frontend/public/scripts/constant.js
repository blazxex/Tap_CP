const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
export const WIDTH = screenWidth;
export const HEIGHT = screenHeight;
// (0,0) is top left, WHY...

// offset from orgin (WIDTH, HEIGHT) by offset 
export const OffsetFromOrigin = (origin, offset) => origin/2 + offset * origin; 
