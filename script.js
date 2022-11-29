// Constant variables
const screen = document.querySelector('#screen');
const knob = document.querySelectorAll('.arrow');
const sizeSlider = document.querySelector('#slider');
const sizeLabel = document.querySelector('#label');
const tool = document.querySelectorAll('.tool');
const color = document.querySelector('#color');
const reset = document.querySelector('#reset');

// Other variables
let selectedTool = 0;
let mouseDown = false;

// Tracks button clicks
tool.forEach(item => {
    item.addEventListener('click',setTool);
});

// Sets the selected tool and highlights button
function setTool() {
    for (i = 0; i < tool.length; i++) {
        if (tool[i] === event.target) {
            tool[i].classList.add('selected');
            selectedTool = i;
        } else {
            tool[i].classList.remove('selected');
        }
    }
}


// Track when mouse is clicked / not clicked
document.addEventListener('mousedown',() => mouseDown = true);
document.addEventListener('mouseup',() => mouseDown = false);

// Change color based on selected tool
function changeColor() {
    if (mouseDown === false) return;
    if (selectedTool === 0) {
        event.target.classList.remove('outline');
        event.target.style.backgroundColor = color.value;
    } else if (selectedTool === 1) {
        event.target.classList.remove('outline');
        const red = Math.floor(Math.random() * 255) + 1;
        const blue = Math.floor(Math.random() * 255) + 1;
        const green = Math.floor(Math.random() * 255) + 1;
        event.target.style.backgroundColor = `rgb(${red},${blue},${green},1)`;
    } else if (selectedTool === 2 && !event.target.classList.contains('outline')) {
        event.target.style.opacity = parseFloat(event.target.style.opacity) + 0.2;
    } else if (selectedTool === 3 && !event.target.classList.contains('outline')) {
        event.target.style.opacity = parseFloat(event.target.style.opacity) - 0.2;
    } else if (selectedTool === 4) {
        event.target.style.backgroundColor = 'white';
        event.target.style.opacity = '1';
        event.target.classList.add('outline');
    }
}

// Load / reload grid based on selected size
function loadGrid() {
    const size = sizeSlider.value;
    screen.innerHTML = '';
    screen.style.gridTemplateRows = `repeat(${size},1fr)`;
    screen.style.gridTemplateColumns = `repeat(${size},1fr)`; 
    for (i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('outline');
        cell.style.opacity = '1';
        cell.addEventListener('mouseover',changeColor);
        screen.appendChild(cell);
    }
}

// Move knobs based on mouse position
document.addEventListener('mousemove',() => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const minX = screen.getBoundingClientRect().left;
    const minY = screen.getBoundingClientRect().top;
    if (mouseX > minX && mouseY > minY && mouseX < minX + 400 && mouseY < minY + 400) {
        const hor = (mouseX - minX) / 400 * 360;
        const ver = (mouseY - minY) / 400 * 360;
        knob[0].style.transform = `rotate(${hor}deg)`;
        knob[1].style.transform = `rotate(${ver}deg)`;
    }
});

// Update grid size and cooresponding label based on slider input
sizeSlider.addEventListener('input',() => {
    sizeLabel.innerText = sizeSlider.value + ' x ' + sizeSlider.value  + ' Grid';
    loadGrid();
});

// Resets grid when reset button is clicked
reset.addEventListener('click',loadGrid);

loadGrid();