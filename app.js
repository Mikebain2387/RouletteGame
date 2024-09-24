const winnerDisplay = document.getElementById('winningNum');
const spin = document.getElementById('spinButton');
const selection = document.getElementsByClassName('selection');
let walletValue = document.getElementById('wallet');
let wallet = 500;

  // Set  wallet value inside html
  document.getElementById('wallet').textContent = wallet;

for (let i = 0; i < selection.length; i++) {
 selection[i].addEventListener('click', () => {
     if (selection[i].classList.contains('selected')) {
         selection[i].classList.remove('selected');
         wallet += 5; // Add back to wallet when unselected
     } else {
         if (wallet >= 5) {
             selection[i].classList.add('selected');
             wallet -= 5; // Subtract from wallet when selected
         } else {
             alert('Insufficent Funds');
         }
     }
     document.getElementById('wallet').textContent = wallet;
 });
}




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


