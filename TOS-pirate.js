/* TOWN OF SALEM PIRATE DUEL SELECTOR */
// ...for picking a dueling option as pirate...

/* This program will tell you who to plunder, and generate a dueling option for player to use */

// GLOBAL VARIABLES
const prompt = require('prompt-sync')({sigint: true}); // prompt-sync function
const lines = process.stdout.getWindowSize()[1]; // for clearing screen
const playerNum = Number(process.argv[2]); // the player's number from command line
let input = '';
let deadNums = [playerNum]; // for excluding numbers from target selection
let plunderTarget = '';
let num15 = null;
let plunderDirective = null;


/* FUNCTIONS */

// RANDOM NUMBER FUNCTION
// for generating a player number to plunder
const rando = () => { // can be anyone who's not dead or yourself or someone recently plundered
    num15 = null;
    num15 = (Math.ceil(Math.random() * 15)); // RANDOM number
    // Generated number validation process
    if (num15 === playerNum || deadNums.includes(num15)) { // Explicitly excluded numbers
        rando();
    } else {
        plunderTarget = num15;
    }
}; 

// DEAD NUMBER VALIDATION FUNCTION
// for removing duplicate numbers from the deadNums array
// and adding unique numbers to the deadNums array
const numValid = (number) => {
    if (deadNums.includes(number)) {
        return false; // Number for exclusion is a duplicate
    } else if (!deadNums.includes(number)) {
        return true; // Number is unique
    }
};

// DIRECTIVE RANDOMIZER
// picks an action for you to take
const action = () => {
    plunderDirective = null;
    const plunderDirectives = ['slash em wit yerr scimitar!', 'stab em wit yerr rapier!', 'shoot em wit yerr pistol!']
    let n = Math.floor(Math.random() * 3);
    plunderDirective = plunderDirectives[n];
}

// MAIN PROMPT
// for calling the rando function for target number and directive
// and for adding/removing dead players
const plunder = (type) => {

    // PRESSING ENTER
    // blank input generates plunder directive
    if (type === '' || (type === 'plunder' || type === 'p')) {
    rando();
    action();
    console.log(`\nYarr... plunder ${plunderTarget}, and ${plunderDirective}\n`)

        // Reusable prompt
        console.log('Press ENTER to receive a Plunder Directive \nOr a number for exclusion')
        input = prompt('>> ');
        plunder(input.toLowerCase());

    // HANDLING DEAD PLAYERS
    /* When a valid player number is entered, it will populate a deadNums array */
    } else if ((Number(type) >= 1 && Number(type) <= 15)) {
    
    // call validation functions
        if (numValid(Number(type))) { 
            deadNums.push(Number(type)); // If number is unique, add it
        } else if (!numValid(Number(type))) {
            for (let i = 0; i < deadNums.length; i++) {
                if (deadNums[i] === Number(type)) {
                    deadNums.splice(i, 1) // If number is a duplicate, remove it
                }
            }
        };

        // output the excluded nuymbers
        deadNums.sort(function(a, b){return a-b}); // Sorts the deadNums array in ascending order
        console.log('\nExcluded Numbers:')
        console.log(deadNums, '\n');

        // Reusable prompt
        console.log('Press ENTER to receive a Plunder Directive \nOr a number for exclusion')
        input = prompt('>> ');
        plunder(input.toLowerCase());

    // EXITING
    } else if (type.toLowerCase() === 'exit' || type.toLowerCase() === 'x') {
        process.exitCode = 1;
        
    // IMPROPER SELECTION
    } else {
        input = prompt('Specify a vision type, or dead player>> ');
        plunder(input.toLowerCase());
    }
};

/* END FUNCTIONS */

/* RUN the program */
// clear the screen
for(var i = 0; i < lines; i++) {
    console.log('\r\n');
}
// print title
console.log('+++++= TOWN OF SALEM =+++++' + '\n' + '-{pirate plunders planner}-' + '\n\n')
// print user number
console.log('Blessed be, ' + typeof(playerNum) + ' ' + playerNum + '...\n');
// prompt user for input
console.log('Press ENTER to receive a Plunder Directive \nOr enter a number for exclusion');
input = prompt('>> ')
plunder(input.toLowerCase());

/*THIS SPACE INTENTIONALLY LEFT BLANK // DO NOT WRITE BELOW THIS LINE








OK*/
