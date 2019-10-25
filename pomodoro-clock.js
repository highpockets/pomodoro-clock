document.getElementById("resetImg").addEventListener("click", FindAction);
document.getElementById("stopImg").addEventListener("click", FindAction);
document.getElementById("pauseImg").addEventListener("click", FindAction);
document.getElementById("playImg").addEventListener("click", FindAction);
document.getElementById("downRestImg").addEventListener("click", FindAction);
document.getElementById("upRestImg").addEventListener("click", FindAction);
document.getElementById("downIntervalImg").addEventListener("click", FindAction);
document.getElementById("upIntervalImg").addEventListener("click", FindAction);

const intervalSetDisplay = document.getElementById("int-set-display");
const restSetDisplay = document.getElementById("rest-set-display");
const intervalDisplay = document.getElementById("int-display");
const elapsedDisplay = document.getElementById("elapsed-display");

const initialInterval = intervalSetDisplay.innerHTML;
const initialRest = restSetDisplay.innerHTML;

let inProgress = false;
let isInterval = true;
let playing = false;

let countdown;


function Reset(){
    intervalSetDisplay.innerHTML = initialInterval;
    restSetDisplay.innerHTML = initialRest;
    intervalDisplay.innerHTML = initialInterval + ":00";
    elapsedDisplay.innerHTML = "00:00";
    inProgress = false;
    isInterval = true;
    playing = false;
    intervalSetDisplay.classList.remove('greyed-out');
    restSetDisplay.classList.remove('greyed-out');
    clearInterval(countdown);
}

function Stop(){
    Reset();
}

function Pause(){
    clearInterval(countdown);
    playing = false;
}

function Play(){
    
    if(!playing){
        intervalSetDisplay.className += ' greyed-out';
        restSetDisplay.className += ' greyed-out';
        playing = true;
        inProgress = true;
        countdown = setInterval(Playing, 1000);
    }
}

function RestUp(){

    if(!inProgress){
        restSetDisplay.innerHTML = Number(restSetDisplay.innerHTML) + 1;
    }
}

function RestDown(){

    if(!inProgress){
        if(Number(restSetDisplay.innerHTML) > 1){
            restSetDisplay.innerHTML = Number(restSetDisplay.innerHTML) - 1;
        }
    } 
}

function IntervalUp(){
    
    if(!inProgress){
        intervalSetDisplay.innerHTML = Number(intervalSetDisplay.innerHTML) + 1;
        intervalDisplay.innerHTML = intervalSetDisplay.innerHTML + ':00'
    }
}

function IntervalDown(){
    
    if(!inProgress){
        if(Number(intervalSetDisplay.innerHTML) > 1){
            intervalSetDisplay.innerHTML = Number(intervalSetDisplay.innerHTML) - 1;
            intervalDisplay.innerHTML = intervalSetDisplay.innerHTML + ':00'
        }
    }
}

function FindAction(e){
  
    const elementId = e.srcElement.id;

    ImageAnim(elementId);

    switch(elementId){
        
        case "resetImg":
            Reset();  
            break;

        case "pauseImg":
            Pause();
            break;

        case "stopImg":
            Stop();
            break;

        case "playImg":
            Play();
            break;

        case "downRestImg":
            RestDown();
            break;

        case "upRestImg":
            RestUp();
            break;

        case "downIntervalImg":
            IntervalDown();
            break;

        case "upIntervalImg":
            IntervalUp();
            break;
    }
}

function ImageAnim(id){
    const element = document.getElementById(id);
    element.src = "pomodoro-clock-click-sprite.png";
    setTimeout(SetInitialImage, 100, element);
}

function SetInitialImage(e){
    e.src = "pomodoro-clock-sprite.png";
}

function Playing(){
    
    let intervalArr = intervalDisplay.innerHTML.split(':');
    let elapsedArr = elapsedDisplay.innerHTML.split(':')
    
    if(intervalArr[0] === '00' && intervalArr[1] === '00'){

        if(isInterval){
            isInterval = false;

            if(restSetDisplay.innerHTML.length === 1){
                intervalDisplay.innerHTML = '0' + restSetDisplay.innerHTML + ':00';
            }
            else{
                intervalDisplay.innerHTML = restSetDisplay.innerHTML + ':00';
            }
            elapsedDisplay.innerHTML = '00:00';
        }
        else{
            isInterval = true;

            if(intervalSetDisplay.innerHTML.length === 1){
                intervalDisplay.innerHTML = '0' + intervalSetDisplay.innerHTML + ':00';
            }
            else{
                intervalDisplay.innerHTML = intervalSetDisplay.innerHTML + ':00';
            }
            elapsedDisplay.innerHTML = '00:00';
        }
        return;
    }
    else if(intervalArr[1] === '00'){
        
        intervalArr[1] = '59';
        elapsedArr[1] = '01';
        intervalArr[0] = Number(intervalArr[0]) - 1;

        if(Number(intervalArr[0]) < 10){
            intervalArr[0] = '0' + Number(intervalArr[0]);
        }
    }
    else{
        intervalArr[1] = Number(intervalArr[1]) - 1;
        elapsedArr[1] = Number(elapsedArr[1]) + 1;
    }
    
    if(Number(intervalArr[1]) < 10){
        intervalArr[1] = '0' + intervalArr[1];
    }

    if(intervalArr[1] === '00'){
        
        elapsedArr[1] = '00';
        let display;

        if(isInterval){
            display = intervalSetDisplay.innerHTML; 
        }
        else{
            display = restSetDisplay.innerHTML;
        }

        elapsedArr[0] = display - intervalArr[0];

        if(Number(elapsedArr[0]) < 10){
            elapsedArr[0] = '0' + elapsedArr[0];
        }
    }
    else if(Number(elapsedArr[1]) < 10){
        elapsedArr[1] = '0' + Number(elapsedArr[1]);
    }
    
    intervalDisplay.innerHTML = intervalArr.join(':');
    elapsedDisplay.innerHTML = elapsedArr.join(':');
}