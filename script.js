document.addEventListener('DOMContentLoaded', () => {
    let hours = document.querySelector('#hours');
    let minutes = document.querySelector('#minutes');
    let seconds = document.getElementById('seconds');

    function updateClock() {
        let clock = new Date();
        let hour = clock.getHours();
        let minute = clock.getMinutes();
        let second = clock.getSeconds();

        hours.textContent = hour < 10 ? '0' + hour : hour;
        minutes.textContent = minute < 10 ? '0' + minute : minute;
        seconds.textContent = second < 10 ? '0' + second : second;
    }

    updateClock();
    setInterval(updateClock, 1000);

    const el = document.querySelector('.clock');


    el.style.left = el.offsetLeft + 'px';
    el.style.top = el.offsetTop + 'px';

    el.addEventListener('mousedown', mousedown);

    function mousedown(e) {
        el.style.cursor = 'grabbing'; // optional visual feedback
        let prevX = e.clientX;
        let prevY = e.clientY;

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);

        function mousemove(e) {
    let newX = e.clientX - prevX;
    let newY = e.clientY - prevY;

    const rect = el.getBoundingClientRect();

    let newLeft = rect.left + newX;
    let newTop = rect.top + newY;

    
    const maxLeft = window.innerWidth - el.offsetWidth;
    const maxTop = window.innerHeight - el.offsetHeight;

    
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    el.style.left = newLeft + 'px';
    el.style.top = newTop + 'px';

    prevX = e.clientX;
    prevY = e.clientY;
}


        function mouseup() {
            el.style.cursor = 'grab';
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);
        }
    }
});


const cell = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById("turnX");
const result = document.getElementById("result");
const resetButton = document.getElementById("reset");
const resetScore = document.querySelector(".resetScore")

let scoreX = document.querySelector('.playerXScore');
let scoreY = document.querySelector('.playerYScore')

let currentPlayer = "X";
let gameBoard = Array(9).fill("")
let gameActive = true;
let playerXScore = 0;
let playerYScore = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8],[2, 4, 6]
]

function checkWin(){
    for (let condition of winningConditions){
        let [a,b,c] = condition;

        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
            gameActive = false;
            result.textContent = `${currentPlayer} Win!`;
            condition.forEach(index => cell[index].classList.add("winner"));
            resetButton.style.display = "block";

            if(currentPlayer === 'X'){
                playerXScore++;
                scoreX.textContent = playerXScore;
            }

            else if(currentPlayer === 'O'){
                playerYScore++;
                scoreY.textContent = playerYScore;
            }

            if (scoreX.textContent > 1 || scoreY.textContent > 1){
                resetScore.style.display = "block";
            }
            else{
                resetScore.style.display = "none";
            }

            return;
        }
    }

    if(!gameBoard.includes("")){
        gameActive = false;
        result.textContent = "It's a Draw!";
        resetButton.style.display = "block";
    }
}
    function handleCellClick(e){
        const index = e.target.dataset.index;

        if(gameBoard[index] || !gameActive)return;
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnIndicator.textContent = currentPlayer;
    }

    function resetGame(){
        gameBoard.fill("");
        cell.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });

        gameActive = true;
        currentPlayer = "X"
        turnIndicator.textContent = currentPlayer;
        result.textContent = "";
        resetButton.style.display = "none";
    }

    if (scoreX.textContent > 1 || scoreY.textContent > 1){
        resetScore.style.display = "block";
    }

    resetScore.addEventListener("click", function(){
        let confirmation = confirm("Are you sure you want to set the scores?")

        if(confirmation){
            playerXScore = 0;
            playerYScore = 0;
            scoreX.textContent = playerXScore;
            scoreY.textContent = playerYScore;
            resetScore.style.display = "none";
        }
    })

    cell.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame)

