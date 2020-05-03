const body = document.querySelector('body');

const IMG_NUM = 3;

function onImageLoaded() {
    console.log("image loaded");
}

function paintImage(imageNumber) {
    const image = new Image();
    image.src = `images/${imageNumber + 1}.jpg`;
    image.classList.add('bgImage')
    body.prepend(image);
}

function generateRand() {
    const num = Math.floor(Math.random() *  7);
    return num;
}

function init() {
    const randNum = generateRand();
    paintImage(randNum);
}

init(); 