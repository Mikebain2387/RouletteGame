const winnerDisplay = document.getElementById('winningNum'); // Get the element to display the winning number
const spin = document.getElementById('spinButton'); // Get the spin button element
const selection = document.querySelectorAll('.selection'); // Get all selection elements on the board
const spinImage = document.getElementById('spinImage'); // Get the spin image element
const bet = document.querySelectorAll('.bet-amount'); // Get all bet amount buttons
const walletValue = document.getElementById('wallet'); // Get the wallet display element
const clearButton = document.getElementById('clear-bets-button'); // Get the clear bets button element
const restartButton = document.getElementById('restart-button'); // Get the restart button element
const resultMessage = document.getElementById('result-message'); // Get the result message display element
let wallet = 1000; // Initialize the wallet amount
let betAmount = 0; // Initialize the bet amount
let totalPayout = 0; // Initialize the total payout
const betAmounts = new Map(); // creates a new Map object and assigns it to the betAmounts variable. This map will store the bet amounts for each selection on the roulette board. ex. [1:100],[odd: 100]

document.getElementById('wallet').textContent = wallet; // Display the initial wallet amount

function updateWallet(amount) {
    wallet += amount; // Update the wallet amount
    walletValue.textContent = wallet; // Display the updated wallet amount
}

spin.addEventListener('click', spinToWin); // event listener for the spin button

function spinToWin() {
    if (betAmounts.size === 0) {
        alert('Please place your bets first!'); // Prompt the user to place bets if no bets are placed
        return;
    }

    winnerDisplay.textContent = '';//remove previous winning number display on new spin
    resultMessage.textContent = '';//remove previous results message on new spin

    for (let i = 0; i < selection.length; i++) {
        selection[i].classList.remove('highlight'); //remove previous winning selection on spin
    }
    console.log('Bets before spinning:', Array.from(betAmounts.entries())); // Log bets before spinning

    // Subtract the total bet amount from the wallet
    let totalBetAmount = 0;
    for (let [value, amount] of betAmounts) {
        totalBetAmount += amount; // Calculate the total bet amount.  
    }

    if (wallet < totalBetAmount) {
        alert('Insufficient funds!'); // Prompt the user if they have insufficient funds
        return;
    }

    updateWallet(-totalBetAmount); // subtract the total bet amount from the wallet

    // Display the image and start spinning
    spinImage.style.display = 'block';

    // Hide the image after 5 seconds with fade out effect
    setTimeout(() => {
        spinImage.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            spinImage.style.display = 'none';
            spinImage.style.animation = ''; // Reset animation

            // Highlight the winning number after the animation is completed
            const winningNumber = Math.floor(Math.random() * 36); // Generate a random winning number
            console.log(`Winning Number: ${winningNumber}`);
            const isOdd = winningNumber % 2 !== 0; // Determine if the winning number is odd
            const isEven = winningNumber % 2 === 0; // Determine if the winning number is even
            const color = isOdd ? 'Red' : 'Black'; // Determine the color based on odd/even

            winnerDisplay.textContent = winningNumber !== 0 ? `${winningNumber} ${color}` : `${winningNumber}`; // Display the winning number and color, unless 0 then only shows 0

            // Calculate payouts
            totalPayout = 0;
            //  for of loop that iterates over each entry in the betAmounts map. The betAmounts map stores the users bets, where value is the bet type (number, ‘odd’, ‘even’, ‘red’, ‘black’) and amount is the amount of money bet on that type
            for (let [value, amount] of betAmounts) {
                let payout = 0; //initializes payout is 0, this variable stores the payout for the current bet

                if (winningNumber === 0) {
                    if (value == '0') {
                        payout = amount * 35; // Payout for winning on 0, 0 is neither odd or even, neither red or black
                    }
                } else {
                    if ((value === 'odd' && isOdd) || (value === 'even' && isEven) || (value === 'red' && isOdd) || (value === 'black' && isEven)) {
                        payout = amount * 2; // Payout for odd/even/red/black
                    } else if (value == winningNumber) {
                        payout = amount * 35; // Payout for matching the winning number
                    }
                }

                console.log(`Selection: ${value}, Payout: ${payout}`);
                totalPayout += payout; // Calculate the total payout
            }

            updateWallet(totalPayout); // Update the wallet with the total payout

            const netResult = totalPayout - totalBetAmount; // Calculate the net result
            if (netResult > 0) {
                resultMessage.innerHTML = `You won $${netResult}!`; // Display win message
                resultMessage.style.color = 'green';
            } else if (netResult < 0) {
                resultMessage.innerHTML = `You lost $${-netResult}.`; // Display loss message
                resultMessage.style.color = 'red';
            } else {
                resultMessage.innerHTML = `It's a draw.`; // Display draw message
                resultMessage.style.color = 'white';
            }

            // Highlight the winning number
            for (let i = 0; i < selection.length; i++) {
                if (selection[i].getAttribute('data-value') == winningNumber) {
                    selection[i].classList.add('highlight'); // Highlight the winning number
                } else {
                    selection[i].classList.remove('highlight'); // Remove highlight from non-winning numbers
                }
            }

            // Check if the user has lost all their money
            if (wallet <= 0) {
                alert('Game Over! You have lost all your money.  Click ok to start a new game'); // Display game over message
                //  you can reset the game here
                wallet = 1000; // Reset wallet amount
                updateWallet(0); // Update wallet display
                betAmounts.clear(); // Clear all bets
                betAmount = 0; // Reset bet amount
                winnerDisplay.textContent = ''; // Clear winning number display
                resultMessage.innerHTML = ''; // Clear result message
                for (let i = 0; i < selection.length; i++) {
                    selection[i].classList.remove('selected'); // Clear all selections
                    selection[i].classList.remove('highlight'); // Clear all highlights
                }
            }
        }, 1000); //wait for the fade-out animation to complete
    }, 5000); //spin duration
}//end of spin to win function

for (let i = 0; i < selection.length; i++) {
    selection[i].addEventListener('click', function() {
        const value = selection[i].getAttribute('data-value'); //retrieves the value of the data-value attribute from the current element.
        if (selection[i].classList.contains('selected')) {
            selection[i].classList.remove('selected'); // Deselect the selection
            betAmounts.delete(value); // Remove the bet amount for the deselected selection
        } else {
            if (betAmount === 0) {
                alert('Please select a bet amount first!'); // Prompt the user to select a bet amount
                return;
            }
            selection[i].classList.add('selected'); // Select the selection
            betAmounts.set(value, betAmount); // Add the bet amount for the selected selection
        }  
    });
}

for (let i = 0; i < bet.length; i++) {
    bet[i].addEventListener('click', function() {
        betAmount = +bet[i].value; // retrieves the value of the current bet, the "+" operator converts the string value to a number and sets the bet amount to a numeric value
    });
}

// Clear button functionality
clearButton.addEventListener('click', function() {
    for (let i = 0; i < selection.length; i++) {
        selection[i].classList.remove('selected'); // Clear all selections
        selection[i].classList.remove('highlight'); // Clear all highlights
    }
    betAmounts.clear(); // Clear all bet amounts
    betAmount = 0; // Reset bet amount
    winnerDisplay.textContent = ''; // Clear winning number display
    resultMessage.innerHTML = ''; // Clear result message
});

restartButton.addEventListener('click', function() {
 wallet = 1000; // Reset wallet amount to 1000
 walletValue.textContent = wallet;
 winnerDisplay.textContent = ''; //removes winning number from display
 resultMessage.textContent = ''; //remove result message
 betAmount = 0; //set bet amount back to 0
 for (let i = 0; i < selection.length; i++) {
     selection[i].classList.remove('selected'); //removes selections on restart
     selection[i].classList.remove('highlight'); //removes highlighted winning number on restart
 }
});