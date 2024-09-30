const winnerDisplay = document.getElementById('winningNum');
const spin = document.getElementById('spinButton');
const selection = document.getElementsByClassName('selection');
const spinImage = document.getElementById('spinImage');
const bet = document.querySelectorAll('.bet-amount');
const walletValue = document.getElementById('wallet');
const clearBetsButton = document.getElementById('clear-bets-button');
const restartButton = document.getElementById('restart-button');
const resultMessage = document.getElementById('result-message');
let wallet = 1000;
let betAmount = 0;
let totalPayout = 0;



  // Set  wallet value inside html

 // document.getElementById('wallet').textContent = wallet;

  function updateWallet(amount){
   wallet += amount;
   walletValue.textContent = wallet;
  }

  spin.addEventListener('click', spinToWin)

  function spinToWin() {
   if (wallet < betAmount) {
       alert('Insufficient funds!');
       return;
   }

   if (betAmount === 0) {
    alert('Please select a bet amount first!');
    return;
}

  
 


   // Subtract the bet amount from the wallet
   updateWallet(-betAmount);

   // Display the image and start spinning
   spinImage.style.display = 'block';

   // Hide the image after 5 seconds with fade out effect
   setTimeout(() => {
       spinImage.style.animation = 'fadeOut 1s forwards';
       setTimeout(() => {
           spinImage.style.display = 'none';
           spinImage.style.animation = ''; // Reset animation
       }, 1000);
   }, 5000);

   const winningNumber = Math.floor(Math.random() * 36);
   console.log(winningNumber);
   const isOdd = winningNumber % 2 !== 0;
   const isRed = winningNumber % 2 !== 0;
   const isEven = winningNumber % 2 === 0;
   const isBlack = winningNumber % 2 === 0;
   const color = isRed ? 'Red' : 'Black';

   if (winningNumber !== 0) {
       winnerDisplay.textContent = `${winningNumber} ${color}`;
   } else {
       winnerDisplay.textContent = `${winningNumber}`;
   }

   // Calculate payouts
   totalPayout = 0;
   for (let i = 0; i < selection.length; i++) {
       const value = selection[i].value;
       let payout = 0;

       if (value === 'odd' && isOdd) {
           payout = betAmount * 2;
       } 
       else if (value === 'even' && isEven) {
           payout = betAmount * 2;
       } 
       else if (value === 'red' && isRed) {
           payout = betAmount * 2;
       } 
       else if (value === 'black' && isBlack) {
           payout = betAmount * 2;
       } 
       else if (value === winningNumber) {
        payout = betAmount * 35;
       }

       totalPayout += payout;
   }

   updateWallet(totalPayout);

   const netResult = totalPayout - betAmount;
   if (netResult > 0) {
       resultMessage.innerHTML = `You won $${netResult}!`;
       resultMessage.style.color = 'green';
   } else if (netResult < 0) {
       resultMessage.innerHTML = `You lost $${-netResult}.`;
       resultMessage.style.color = 'red';
   } else {
       resultMessage.innerHTML = `It's a draw.`;
       resultMessage.style.color = 'white';
   }
}



for (let i = 0; i < selection.length; i++) {
 selection[i].addEventListener('click', function() {
     if (betAmount === 0) {
         alert('Please select a bet amount first!');
         return;
     }

     if (wallet < betAmount) {
         alert('Insufficient funds!');
         return;
     }

     if (selection[i].classList.contains('selected')) {
      selection[i].classList.remove('selected');
      updateWallet(betAmount);
  } else {
      selection[i].classList.add('selected');
      updateWallet(-betAmount);
     }
 })
};

for (let i = 0; i < bet.length; i++) {
 bet[i].addEventListener('click', function() {
     betAmount = bet[i].value - 0; // Convert string to number
 });
};

clearBetsButton.addEventListener('click', function() {
 for (let i = 0; i < selection.length; i++) {
     if (selection[i].classList.contains('selected')) {
         selection[i].classList.remove('selected');
         updateWallet(betAmount);
     }
 }
});

restartButton.addEventListener('click', function() {
 wallet = 1000; // Reset wallet amount to 1000
 walletValue.textContent = wallet;
 winnerDisplay.textContent = '';
 resultMessage.textContent = '';
 betAmount = 0;
 for (let i = 0; i < selection.length; i++) {
     selection[i].classList.remove('selected');
 }
});