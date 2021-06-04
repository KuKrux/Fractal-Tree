const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
const clearButton = document.querySelector('.clear-canvas-button');
const textBox = document.querySelector('.copy-seed-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
var tempSplits = 0;
var maxSplits = 0;

function clearScreen() { // "Clear Canvas" Button
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function copySeed() { // "Click To Copy Seed" Button

}

function generateTree() { // "Generate Tree" Button
    console.log(maxSplits);
    tempSplits = 0;
    maxSplits = 0;
    drawTree(canvas.width/2, canvas.height - 80, getRandomArbitrary(100, 150), getRandomArbitrary(-4, 4), 15, getRandomHexcolor(), getRandomHexcolor())
}

function drawTree(startX, startY, len, angle, branchWidth, color1, color2,) {
    if (len < getRandomArbitrary(1, 20)) { //change behaviour after a certain length
        ctx.strokeStyle = color2;
        ctx.fillStyle = color2;
        branchWidth *= (getRandomArbitrary(5, 10)*0.1+1);
    } else {  //if no specific length is reached
        ctx.strokeStyle = color1;
        ctx.fillStyle = color1;
    }
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/getRandomArbitrary(60, 350));
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
    if (len < 10) { //length limiter
        ctx.restore();
        if (tempSplits > maxSplits) {
             maxSplits = tempSplits;
             return;
        } 
        return;
    }
    tempSplits += 1;
    drawTree(0, -len, len*0.8, angle + getRandomArbitrary(5, 10), branchWidth * (getRandomArbitrary(5, 10)*0.1), color1, color2); // generate two more lines out of one
    drawTree(0, -len, len*0.8, angle - getRandomArbitrary(5, 10), branchWidth * (getRandomArbitrary(5, 10)*0.1), color1, color2); //
    ctx.restore();
}

function getRandomArbitrary(min, max) { 
    return Math.random() * (max - min) + min;
}

function getRandomHexcolor() {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
} 

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawTree(canvas.width/2, canvas.height - 80, getRandomArbitrary(100, 150), getRandomArbitrary(-4, 4), 15, getRandomHexcolor(), getRandomHexcolor())
});