const winnerDisplay = document.getElementById('winningNum');
const spin = document.getElementById('spinButton');





spin.addEventListener('click', spinToWin)

function spinToWin(){
 const winningNumber =  Math.floor(Math.random(0) * 36);
 console.log(winningNumber)
 if(winningNumber% 2 === 0 && winningNumber != 0){
  winnerDisplay.innerHTML = `${winningNumber} Black`;

 }

 else if(winningNumber !== 0){
  winnerDisplay.innerHTML = `${winningNumber} Red`;
 }

 else{
  winnerDisplay.innerHTML = winningNumber;
 }






}
