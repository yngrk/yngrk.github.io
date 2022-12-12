const canvas = document.querySelector(".canvas-content");
const plusBtn = document.querySelector(".btn.nav-plus");
const minusBtn = document.querySelector(".btn.nav-minus");
const clearBtn = document.querySelector(".btn.clear");
const colorPicker = document.querySelector("#fg-color");
const bgColorPicker = document.querySelector("#bg-color");
const userColors = document.querySelectorAll(".btn.user");

let mouseDown = false;
let currentSize;

onmousedown = () => { mouseDown = true; };
onmouseup = () => { mouseDown = false; };

function createGrid(size) {
    currentSize = size;
    const factor = 9/(16/size);
    canvas.style["grid-template-columns"] = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size*factor; i++) {
        const grid = document.createElement("div");
        grid.classList.add("canvas-pixel");
        grid.style["background-color"] = bgColorPicker.value;
        grid.dataset.color = bgColorPicker.value;
        canvas.appendChild(grid);
    }
}

function clear() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function increaseSize() {
    if (currentSize >= 128) {return;}
    checkSizeFormat();
    clear();
    createGrid(currentSize+16);
    canvas.firstChild.classList.add("preview");
    addListenerToPixels();
}

function decreaseSize() {
    if (currentSize <= 16) {return;}
    checkSizeFormat();
    clear();
    createGrid(currentSize-16);
    canvas.firstChild.classList.add("preview");
    addListenerToPixels();
}

function checkSizeFormat() {
    if (currentSize % 16 !== 0) {currentSize = 16};
}

function getColor() {
    return colorPicker.value;
}

// EventListeners

// clear button
clearBtn.addEventListener("click", () => {
    clear();
    createGrid(currentSize);
    addListenerToPixels();
})

// plus button
plusBtn.addEventListener("click", increaseSize);
plusBtn.addEventListener("mouseover", function () {
    canvas.firstChild.classList.add("preview");
});
plusBtn.addEventListener("mouseout", function () {
    canvas.firstChild.classList.remove("preview");
});

// minus button
minusBtn.addEventListener("click", decreaseSize);
minusBtn.addEventListener("mouseover", function () {
    canvas.firstChild.classList.add("preview");
});
minusBtn.addEventListener("mouseout", function () {
    canvas.firstChild.classList.remove("preview");
});

// user colors
userColors.forEach(color => color.addEventListener("click", function (e) {
    if (e.altKey) {
        const col = getColor();
        color.firstChild.style["background-color"] = col;
        color.dataset.color = col;
    } else {
        console.log(color.dataset.color);
        colorPicker.value = color.dataset.color;
    }
}));

// pixel paint
function addListenerToPixels() {
    canvas.childNodes.forEach(pixel => pixel.addEventListener("mouseenter", function(e) {
        if (mouseDown) {
            pixel.style["background-color"] = colorPicker.value;
            pixel.dataset.color = colorPicker.value;
        } 
    }));
    canvas.childNodes.forEach(pixel => pixel.addEventListener("mousedown", function(e) {
        if (e.altKey) {
            colorPicker.value = pixel.dataset.color;
        } else {
            pixel.style["background-color"] = colorPicker.value;
            pixel.dataset.color = colorPicker.value;
        }
    }));
}

if (window.innerWidth < 854) {
    // Remove every Element and create a "Viewport too small Info Screen"
} else {
    createGrid(16);
    addListenerToPixels();
}

