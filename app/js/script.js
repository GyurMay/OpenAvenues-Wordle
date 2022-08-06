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
	main();
});
const words = ["About","Alert","Argue","Beach","Above","Alike","Arise","Began","Abuse","Alive","Array","Begin","Actor","Allow","Aside","Begun","Acute","Alone","Asset","Being","Admit","Along","Audio","Below","Adopt","Alter","Audit","Bench","Adult","Among","Avoid","Billy","After","Anger","Award","Birth","Again","Angle","Aware","Black","Agent","Angry","Badly","Blame","Agree","Apart","Baker","Blind","Ahead","Apple","Bases","Block","Alarm","Apply","Basic","Blood","Album","Arena","Basis","Board","Boost","Buyer","China","Cover","Booth","Cable","Chose","Craft","Bound","Calif","Civil","Crash","Brain","Carry","Claim","Cream","Brand","Catch","Class","Crime","Bread","Cause","Clean","Cross","Break","Chain","Clear","Crowd","Breed","Chair","Click","Crown","Brief","Chart","Clock","Curve","Bring","Chase","Close","Cycle","Broad","Cheap","Coach","Daily","Broke","Check","Coast","Dance","Brown","Chest","Could","Dated","Build","Chief","Count","Dealt","Built","Child","Court","Death","Debut","Entry","Forth","Group","Delay","Equal","Forty","Grown","Depth","Error","Forum","Guard","Doing","Event","Found","Guess","Doubt","Every","Frame","Guest","Dozen","Exact","Frank","Guide","Draft","Exist","Fraud","Happy","Drama","Extra","Fresh","Harry","Drawn","Faith","Front","Heart","Dream","False","Fruit","Heavy","Dress","Fault","Fully","Hence","Drill","Fiber","Funny","Henry","Drink","Field","Giant","Horse","Drive","Fifth","Given","Hotel","Drove","Fifty","Glass","House","Dying","Fight","Globe","Human","Eager","Final","Going","Ideal","Early","First","Grace","Image","Earth","Fixed","Grade","Index","Eight","Flash","Grand","Inner","Elite","Fleet","Grant","Input","Empty","Floor","Grass","Issue","Enemy","Fluid","Great","Irony","Enjoy","Focus","Green","Juice","Enter","Force","Gross","Joint","Jones","Links","Media","Newly","Judge","Lives","Metal","Night","Known","Local","Might","Noise","Label","Logic","Minor","North","Large","Loose","Minus","Noted","Laser","Lower","Mixed","Novel","Later","Lucky","Model","Nurse","Laugh","Lunch","Money","Occur","Layer","Lying","Month","Ocean","Learn","Magic","Moral","Offer","Lease","Major","Motor","Often","Least","Maker","Mount","Order","Leave","March","Mouse","Other","Legal","Maria","Mouth","Ought","Level","Match","Movie","Paint","Lewis","Maybe","Music","Panel","Light","Mayor","Needs","Paper","Limit","Meant","Never","Party","Peace","Power","Radio","Round","Peter","Press","Raise","Route","Phase","Price","Range","Royal","Phone","Pride","Rapid","Rural","Photo","Prime","Ratio","Scale","Piece","Print","Reach","Scene","Pilot","Prior","Ready","Scope","Pitch","Prize","Refer","Score","Place","Proof","Right","Sense","Plain","Proud","Rival","Serve","Plane","Prove","River","Seven","Plant","Queen","Robin","Shall","Plate","Quick","Roger","Shape","Point","Quiet","Roman","Share","Pound","Quite","Rough","Sharp","Sheet","Spare","Style","Times","Shelf","Speak","Sugar","Tired","Shell","Speed","Suite","Title","Shift","Spend","Super","Today","Shirt","Spent","Sweet","Topic","Shock","Split","Table","Total","Shoot","Spoke","Taken","Touch","Short","Sport","Taste","Tough","Shown","Staff","Taxes","Tower","Sight","Stage","Teach","Track","Since","Stake","Teeth","Trade","Sixth","Stand","Terry","Train","Sixty","Start","Texas","Treat","Sized","State","Thank","Trend","Skill","Steam","Theft","Trial","Sleep","Steel","Their","Tried","Slide","Stick","Theme","Tries","Small","Still","There","Truck","Smart","Stock","These","Truly","Smile","Stone","Thick","Trust","Smith","Stood","Thing","Truth","Smoke","Store","Think","Twice","Solid","Storm","Third","Under","Solve","Story","Those","Undue","Sorry","Strip","Three","Union","Sound","Stuck","Threw","Unity","South","Study","Throw","Until","Space","Stuff","Tight","Upper","Upset","Whole","Waste","Wound","Urban","Whose","Watch","Write","Usage","Woman","Water","Wrong","Usual","Women","Wheel","Wrote","Valid","World","Where","Yield","Value","Worry","Which","Young","Video","Worse","While","Youth","Virus","Worst","White","Worth","Visit","Would","Vital","Voice"];

let curr_row_inx = 1;
const chooseWord = () => {
	// let a = new XMLHttpRequest(), r;
	// a.onreadystatechange = () => {
	// 	if(a.readyState === 4){
	// 	  if(a.status === 200){
	// 			r = a;
	// 		}
	// 	}
	// }
	// a.open('GET', 'http://random-word-api.herokuapp.com/word?length=5', false);
	// a.send();
	// r = r.response;
	// r = r.substr(2, WORD_LENGTH);
	let randomItem = Math.floor(Math.random() * (words.length - 1)) + 1;
  return words[randomItem].toLowerCase();
};

const GUESS_LIMIT = 5;
const WORD_LENGTH = 5;
let GUESS_COUNT = 0;
const answer_word_global = chooseWord();
const user_guess = [];
const guessed_letters = [];

const vulnerable_solution = () => {
	document.querySelector(`#keyboard.krow`).forEach(elem => {
		addLetter(elem.target.id, answer_word);
	});
	window.onkeydown = (e) => {
		addLetter(e.key.toLowerCase());
	};
};

const secure_solution = () => {
	const answer_word = chooseWord();
	// console.log(answer_word);	
	document.querySelectorAll(`#keyboard .krow`).forEach(elem => {
		elem.onclick = (elem) => {
			addLetter(elem.target.id, answer_word);
		}
		// console.log(elem);
	});
	window.onkeydown = (e) => {
		addLetter(e.key.toLowerCase(), answer_word); //make the solution unaccessible from browser console i.e to function scope it and pass as an param
	};
}; 

function main(){
	grid_setup();
	keyboard_setup();
	// vulnerable_solution();

	secure_solution(); //will show answer on browser console but a wrong one
}

const grid_setup = () => {
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
};

const keyboard_setup = () =>{
	const keys1 = ["q","w","e","r","t","y","u","o","i","o","p"];
	const keys2 = ["a", "s", "d", "f", "g", "h", "i", "j", "k", "l"];
	const keys3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "del"];
	
	// #keyboard is the id for keyboard box

	let krow1 = document.createElement("div");
	krow1.classList.add("krow");
	keys1.forEach(key => {
		let button = document.createElement("button");
		button.classList.add('kb_keys');
		button.textContent = key;
		button.id = key;
		krow1.appendChild(button);
	});
	keyboard.appendChild(krow1);

	let krow2 = document.createElement("div");
	krow2.classList.add("krow");
	keys2.forEach(key => {
		let button = document.createElement("button");
		button.classList.add('kb_keys')
		button.textContent = key;
		button.id = key;
		krow2.appendChild(button);
	});
	keyboard.appendChild(krow2);

	let krow3 = document.createElement("div");
	krow3.classList.add("krow");
	keys3.forEach(key => {
		let button = document.createElement("button");
		button.classList.add('kb_keys')
		button.textContent = key;
		button.id = key;
		krow3.appendChild(button);
	});
	keyboard.appendChild(krow3);
};

const showLetter = () => {
	let currentBox = document.querySelector(`${currentrow}`).children[user_guess.length - 1];
	currentBox.dataset.animation = 'pop';
	currentBox.textContent = user_guess[user_guess.length - 1];
	setTimeout(() => currentBox.dataset.animation = 'tbd', 100);
};

const popLetter = () => {
	let currentBox = document.querySelector(`${currentrow}`).children[user_guess.length];
	currentBox.textContent = user_guess[user_guess.length];
	currentBox.dataset.animation = 'idle';
};

const flipTiles = (answer_word) => {
	for(let i=0;i<5;i++){
		if(answer_word.includes(user_guess[i])){
			let state = answer_word.charAt(i) == user_guess[i] ? 'correct' : 'present';
			document.querySelector(currentrow).children[i].dataset.state = state;
			setTimeout(() => document.querySelector(currentrow).children[i].classList.add(state), (i+1) *250);
		} else {
			document.querySelector(currentrow).children[i].dataset.state = 'absent';
			setTimeout(() => document.querySelector(currentrow).children[i].classList.add('absent'), (i+1) *250);
		}
		flipAnim(i, answer_word);
	}
	// console.log(answer_word, user_guess.join(''));
	if(answer_word == user_guess.join('')){
		for(let i=0;i<5;i++)
			flipAnim(i);
		setTimeout(() => gameWon(), 5*250 + 100);
	}
};

const gameLost = (answer_word) => {
	alert("you've lost the game, Try again.\nThe correct word was "+answer_word);
}

const flipAnim = (i, answer_word = answer_word_global) => {
	setTimeout(() => document.querySelector(currentrow).children[i].classList.add('flip-in'), i*250);
	setTimeout(() => {
		document.querySelector(currentrow).children[i].classList.remove('flip-in');
		document.querySelector(currentrow).children[i].classList.add('flip-out');
	}, (i+1) * 250);
	if(i == 4) {
		setTimeout(() => {
			for(let i=0;i<5;i++){
				let letter_elem = document.querySelector(`#row${curr_row_inx}`).children[i];
				console.log(letter_elem.textContent);
				document.querySelector(`#${letter_elem.textContent}`).classList.add(letter_elem.dataset.state);
			}
			if(GUESS_COUNT >= GUESS_LIMIT){
				gameLost(answer_word);
			}
			curr_row_inx++;
			user_guess.length = 0; //clear the array
		}, 5 * 250); //can type in the next guess only if tiles are done being revealed
	}
};

const gameWon = () => {
	if(confirm('gameWon, great!\nPlay again?')) document.location.reload();
	window.onkeydown = () => {};
};

const word_not_found = () => {
	alert('no such word exist. Try another');
};

const addLetter = (key, answer_word = answer_word_global) => {
	currentrow = `#row${curr_row_inx}`;
	
	if(key == "backspace"){
		user_guess.pop();
		document.querySelector(currentrow).dataset.letters = user_guess.join(''); //update dataset
		popLetter(user_guess);
		return;
	}else if(user_guess.length == 5 && key === "enter"){
		fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+user_guess.join('')).then(res => {
			if(res.status == 404){
				word_not_found();
			}else if(res.status == 200){
				flipTiles(answer_word);	
				GUESS_COUNT++;
				flipTiles(answer_word);
			}
		});
	}
	const lettersRegex = /[a-z]/;
	
	if(!lettersRegex.test(key) || (user_guess.length >= WORD_LENGTH) || key.length > 1){
		return;		
	}

	user_guess.push(key);
	document.querySelector(currentrow).dataset.letters = user_guess.join(''); //update dataset
	showLetter(user_guess);
};
