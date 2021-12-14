let randomNumber = Math.floor((Math.random ()  *100) + 1);

const userGuess = document.getElementById('guess');

const submitBtn = document.getElementById('submit-Btn');

let resultDiv = document.querySelector('[data-output-div]');

let previousGuess = document.getElementById('previous-guess');

let hlOutput = document.querySelector('[data-highLow]');

let triesOutput = document.querySelector('[data-tries]');

let pgArray = [];

let tries = 1;

let play = true;

let p = document.createElement('p');

function startGame() {
		submitBtn.removeAttribute('disabled');
		userGuess.removeAttribute('disabled');
		submitBtn.style.backgroundColor = '';
		pgArray = [];
		previousGuess.textContent = `Previous Guesses:`
		play = true;
		triesOutput.textContent = 'Tries Left: ';
		tries = 1;
		//this will generate a new number
		randomNumber = Math.floor((Math.random ()  *100) + 1);
		//remove the start button from page
		resultDiv.removeChild(p);
		//remove the Game over message from page
		displayMessages();
}

function gameOver() {
			userGuess.value = '';
			submitBtn.setAttribute('disabled', '');
			userGuess.setAttribute('disabled', '');
			submitBtn.style.backgroundColor = 'grey';
			play = false;
			p.innerHTML = `<button id="start-Btn"> Start Game Again?</button>`;
			resultDiv.appendChild(p);
			const startBtn = document.getElementById('start-Btn')
			startBtn.addEventListener('click', startGame);
}

function turns(userInputGuess) {
		userGuess.value = '';
		previousGuess.textContent += ` ${userInputGuess} `;
		tries++;
		triesOutput.textContent = `Tries Left: ${10- pgArray.length} `;
}

//It will check the user guess and show the message according to that
function checkGuess(userInputGuess) {
		if (tries === 10) {
				displayMessages(`Game Over! Random Number was ${randomNumber}`);
			hlOutput.style.color = "red"
				gameOver();
		} else if (userInputGuess > randomNumber) {
				displayMessages('Too High! Try Again');
		} else if (userInputGuess < randomNumber) {
				displayMessages('Too Low! Try again');
		}
}

function gameRecord(userInputGuess) {
		if (isNaN(userInputGuess)) {
				alert('Dude! it\'s a number guessing game.! (╯°□°）╯︵ ┻━┻')
		} else if (userInputGuess <= 0) {
				alert('Number can\'t be lower than 0');
				userGuess.value = '';
		} else if (userInputGuess > 100) {
				alert('Number can\'t be greater than 100');
				userGuess.value = '';
		} else {
				pgArray.push(userInputGuess);
				
				if (userInputGuess == randomNumber) {
						displayMessages('You guessed it correctly!');
						hlOutput.style.color = "Green"
						hlOutput.style.fontWeight = "bold"
						hlOutput.style.fontFamily = "Times New Roman"
						gameOver()
				} else {
						//we call this function here to tell us if the number is too high or low
						checkGuess(userInputGuess);
						turns(userInputGuess)		
				}
		}
}

function displayMessages(message) {
		hlOutput.textContent = message;
}

if (play) {
		submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		let userGuessNumber = parseInt(userGuess.value);
		gameRecord(userGuessNumber);
		});
}
console.log(randomNumber)