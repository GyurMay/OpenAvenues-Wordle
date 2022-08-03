console.log("Load script.js");

// Instantiating the global app object
var app = {};

/**
 * div#grid
 * 		div.tile * 5
 * div#keyboard
 * 		(div.keys * 10) x 3
 * */
// dorjee lama - basic layout
window.addEventListener('load', (e) => {
	// console.log('loaded'); 
	main();
});

function main(){
	grid_setup();
	keyboard_setup();
	const user_guess = [];
	window.onkeydown = (key) => {
		keydown_handler(key, user_guess);
		};
}

const GUESS_LIMIT = 5;
const WORD_LENGTH = 5;

function grid_setup()
{
	let grid_div = document.querySelector("#grid");
	for(let j=1; j<=GUESS_LIMIT; j++){
		let row = document.createElement("div");
		row.dataset.letters = '';
		row.id = `row${j}`;
		grid_div.appendChild(row);
		for(let i=1; i<=WORD_LENGTH; i++){
			let tileDiv = document.createElement("div");
			tileDiv.className = "tile";
			row.appendChild(tileDiv);
		}
	}
}

function keyboard_setup()
{
	const keys1 = ["q","w","e","r","t","y","u","o","i","o","p"];
	const keys2 = ["a", "s", "d", "f", "g", "h", "i", "j", "k", "l"];
	const keys3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "del"];
	
	// #keyboard is the id for keyboard box
	// let button;

	let krow1 = document.createElement("div");
	krow1.classList.add("krow");
	keys1.forEach(key => {
		let button = document.createElement("button");
		button.classList.add('kb_keys')
		button.textContent = key;
		krow1.appendChild(button);
	});
	keyboard.appendChild(krow1);

	let krow2 = document.createElement("div");
	krow2.classList.add("krow");
	keys2.forEach(key => {
		let button = document.createElement("button");
		button.classList.add('kb_keys')
		button.textContent = key;
		krow2.appendChild(button);
	});
	keyboard.appendChild(krow2);

	let krow3 = document.createElement("div");
	krow3.classList.add("krow");
	keys3.forEach(key => {
		let button = document.createElement("button");
		button.classList.add('kb_keys')
		button.textContent = key;
		krow3.appendChild(button);
	});
	keyboard.appendChild(krow3);

}
const addLetter = (currentrow, user_guess) => {
	let currentBox = document.querySelector(`${currentrow}`).children[user_guess.length - 1];
	currentBox.dataset.animation = 'pop';
	setTimeout(() => currentBox.dataset.animation = 'tbd', 100);
	currentBox.textContent = user_guess[user_guess.length - 1];
}
const popLetter = (currentrow, user_guess) => {
	let currentBox = document.querySelector(`${currentrow}`).children[user_guess.length];
	currentBox.textContent = user_guess[user_guess.length];
	currentBox.dataset.animation = 'idle';
}
function keydown_handler(event, user_guess)
{
	let curr_row_inx = 1; //temp purposes
	let currentrow = `#row${curr_row_inx}`; //temporarily stored row

	let key = event.key.toLowerCase();
	let keyCharCode = key.charCodeAt(0);
	if(event.code.toLowerCase() == "backspace"){
		user_guess.pop();
		// console.log(`user input: ${key}, user guess: ${user_guess.join('')}`, user_guess);
		document.querySelector(currentrow).dataset.letters = user_guess.join(''); //update dataset
		popLetter(currentrow, user_guess);
		return;
	}
	if( (!(keyCharCode >= ('a'.charCodeAt(0)) && keyCharCode <= 'z'.charCodeAt(0))) || (user_guess.length >= WORD_LENGTH) || event.key.length > 1){
		return;
	}
	user_guess.push(key);
	document.querySelector(currentrow).dataset.letters = user_guess.join(''); //update dataset
	addLetter(currentrow, user_guess);
	// console.log(`user input: ${key}, user guess: ${user_guess.join('')}`, user_guess);

}
