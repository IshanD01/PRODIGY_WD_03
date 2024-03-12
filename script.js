let btnRef =document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
// Winnning pattern Array
let WinnningPattern = [ 
 [0, 1, 2],
 [0, 3, 6],
 [2, 5, 8],
 [6, 7, 8],
 [3, 4, 5],
 [1, 4, 7],
 [0, 4, 8],
 [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disabled all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enabled popup
    popupRef.classList.remove("hide");
};

//Enable all buttons ( for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText ="";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};


//This functio will execute when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw" ;
};




//New game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//Win logic
const winChecker = () => {
    //Loop through all win patters
    for (let i of WinnningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are filled        
        //3 empty elements are same and would give win as would
        if (element1 != "" && (element2 != "") & (element3 !="")) {
            if (element1 == element2 && element2 == element3) {
                //If all three elements have same values then
                // passs the value to win function
                winFunction(element1);
            }
        }
    }
};
//Display x/o on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //Display x
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //display Y
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click
        count += 1;
        if (count == 9){
          drawFunction();
        }
        //Check for win on every click
        winChecker();
    });
});
// Enable button and disable popup on page load
window.onload = enableButtons;
