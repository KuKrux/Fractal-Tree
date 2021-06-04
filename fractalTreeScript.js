const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
const clearButton = document.querySelector('.clear-canvas-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

function drawTree(startX, startY, len, angle, branchWidth, color1, color2,) {
    if (len < getRandomArbitrary(1, 20)) {
        ctx.strokeStyle = color2;
        ctx.fillStyle = color2;
        branchWidth *= getRandomArbitrary(1, 4);
    } else {
        ctx.strokeStyle = color1;
        ctx.fillStyle = color1;
    }
    ctx.beginPath();
    ctx.save();
    color1 = color1;
    color2 = color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/getRandomArbitrary(60, 350));
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
    if (len < 10) {
        ctx.restore();
        return;
    }
    drawTree(0, -len, len*0.8, angle+6, branchWidth * 0.7, color1, color2);
    drawTree(0, -len, len*0.8, angle-6, branchWidth * 0.7, color1, color2);
    ctx.restore();
}

function getRandomArbitrary(min, max) { //getRandomArbitrary(1, 4)
    return Math.random() * (max - min) + min;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawTree(canvas.width/2, canvas.height - 80,100,0, 15, 'brown', 'green');
});