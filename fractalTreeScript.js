const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
const clearButton = document.querySelector('.clear-canvas-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

function drawTree(startX, startY, len, angle, branchWidth, color1, color2,) {
    if (len < getRandomArbitrary(1, 20)) { //change behaviour after a certain length
        ctx.strokeStyle = color2;
        ctx.fillStyle = color2;
        branchWidth *= getRandomArbitrary(1, 4);
    } else {  //if no specific length if reached
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
        return;
    }
    drawTree(0, -len, len*0.8, angle+6, branchWidth * 0.7, color1, color2); // generate two more lines out of one
    drawTree(0, -len, len*0.8, angle-6, branchWidth * 0.7, color1, color2); //
    ctx.restore();
}

function getRandomArbitrary(min, max) { 
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