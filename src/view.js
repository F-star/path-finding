import SVG from './simplySVG.js'

const paper = window.paper = SVG('canvas', '100%', '100%');
const gLines = paper.group();
const gPoints = paper.group();
const gGuideLine = paper.group();

export {
    paper,
    gPoints,
    gLines,
    gGuideLine,
}