document.getElementById("play-pause").addEventListener("click", playPause);

let arms = document.getElementsByClassName("arm");
let INTERVAL = 100;
let intervalId = setInterval(rotate, INTERVAL);
let animating = true;

function rotate() {
    for (arm of arms) {
        rotateArm(arm);
    }
}

function rotateArm(arm) {
    let angle = getRotationAngle(arm) + 1;
    arm.style.transform = "rotate(" + angle + "deg)";
}

function playPause() {
    if(animating) {
        animating = false;
        clearInterval(intervalId);
    } else {
        animating = true;
        intervalId = setInterval(rotate, INTERVAL);
    }
}

function getRotationAngle(target) {
    const obj = window.getComputedStyle(target, null);
    const matrix = obj.getPropertyValue('-webkit-transform') ||
        obj.getPropertyValue('-moz-transform') ||
        obj.getPropertyValue('-ms-transform') ||
        obj.getPropertyValue('-o-transform') ||
        obj.getPropertyValue('transform');
    
    let angle = 0;

    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    }
    return (angle < 0) ? angle += 360 : angle;
}

//Add windmill event listeners
let windmills = document.getElementsByClassName("windmill");
for (windmill of windmills) {
    windmill.addEventListener("click", windmillClick);
}
let grabbed = nulllet moveWindmillEventId = null;
let mouseX = null;
let mouseY = null;

function windmillClick(event) {
    let windmill = event.target;
    if (grabbed != null) {
        grabbed = null;
        window.removeEventListener("mousemove", moveWindmill);
        windmill.style.cursor = "grab";
        console.log("ungrabbed!");
    } else {
        grabbed = event.target;
        moveWindmillEventId = window.addEventListener("mousemove", moveWindmill);
        windmill.style.cursor = "grabbed";
        console.log("grabbed!");
    }
}

function moveWindmill(event) {
    event.preventDefault();
    if (mouseX == null) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    let diffX = event.clientX - mouseX;
    let diffY = event.clientY - mouseY;

    grabbed.style.left = grabbed.offsetLeft + diffX + "px";
    grabbed.style.top = grabbed.offestTop + diffY + "px";
}