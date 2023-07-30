const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let confeti = document.querySelector("#my-canvas")
let currentPlayer;
let gameGrid;
//createing an object of arrays of winning positions
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//lets create a function to initialise the game

function initGame(){

    confeti.classList.remove("active");
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","" ];
    //Ui me bhi change karna padega boxes ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //one more thing to do is initialise box with css propertires again
        box.classList = `box box${index +1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText =  `Current Player - ${currentPlayer}`;
};
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    //Ui update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function cheakGameOver(){
    let answer = "";
    winningPosition.forEach((position) => {
        //all three boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            
            //cheak if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else{
                answer = "O";
            }
            //disable pointer events

            boxes.forEach((box) =>{
                box.style.pointerEvents ="none";
            });
            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    //it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        setTimeout(function(){
            newGameBtn.classList.add("active");
            confeti.classList.remove("active");
        },5000)
        confeti.classList.add("active");
        return;
    }

    //lets cheak whether game is tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    });

    //board is filled game is tie 
    if(fillCount === 9 ){
        gameInfo.innerText = "Game is Tie!";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer; 
        boxes[index].style.pointerEvents = "none";
        //swap karo turn karo
        swapTurn();
        //cheak koi jeet to nhi gya
        cheakGameOver();
    }
}
//sare boxes pe event listener laga diya
boxes.forEach((box,index) =>{
    box.addEventListener("click" , () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

//confetis
var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();