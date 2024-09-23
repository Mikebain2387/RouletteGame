const winnerDisplay = document.getElementById('winningNum');
const spin = document.getElementById('spinButton');





spin.addEventListener('click', spinToWin)

function spinToWin(){
 const winningNumber =  Math.floor(Math.random(0) * 36);
 winnerDisplay.innerHTML = winningNumber;
 console.log(winningNumber)
}
