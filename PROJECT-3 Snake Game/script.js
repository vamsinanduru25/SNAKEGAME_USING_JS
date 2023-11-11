// Game Constants and Game variables

let inputDir={x:0,y:0};
const moveSound = new Audio("move.mp3");
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
let speed=5;
let lastPaintTime=0;
let snakeArray=[{x: 13,y: 15}];
let food={x:6, y:7};
let score=0;




// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime) / 1000  < 1/speed){
        return ;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function collide(snake){
    // If you bump into yourself
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x ===snake[0].x && snake[i].y ===snake[0].y){
            return true;
        }
        
    }

    // If you bump into wall
    
    if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
        return true;
    }
    return false;

}



function gameEngine(){
    // Part1
    if(collide(snakeArray)){
        gameOverSound.play();
        inputDir = {x: 0, y: 0};
        alert("Game over :( Press ctrl+r to refresh the game");
        snakeArray = [{x: 13,y: 15}];
        score=0;
    }

    // If you have eaten the food


    // Part2 =>Display or render snake food,regenerate the food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score++;
        if(score >hiscoreval){
            hiscoreval =score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML ="HISCORE: " +hiscoreval;
        }
        scorebox.innerHTML= "SCORE: " + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x , y: snakeArray[0].y+ inputDir.y });
        let a=2, b=16 ;
        food = {x : Math.round(a+(b-a)*Math.random()), y : Math.round(a+(b-a)*Math.random())};
        // food = {y : Math.round(a+(b-a)*Math.random())};

    }

    // Move the snake

    for(let i=snakeArray.length-2;i>=0;i--){
        snakeArray[i+1]={...snakeArray[i]};
    }
    snakeArray[0].x +=inputDir.x;
    snakeArray[0].y +=inputDir.y;


    // Display snake
    playArea.innerHTML = "";
    snakeArray.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;
    

    if(index===0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    playArea.appendChild(snakeElement);
});

// Display food
foodElement=document.createElement('div');
        foodElement.style.gridRowStart =food.y;
        foodElement.style.gridColumnStart =food.x;
        foodElement.classList.add('food');
        playArea.appendChild(foodElement);



}



// Main logic behind running the game
let hiscore =localStorage.getItem("hiscore");
if(hiscore === null) {
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML ="HISCORE: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1};
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
    case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
    case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
    case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    default:
        break;
    }
})