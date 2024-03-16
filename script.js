let xp = 0;
let health = 100;
let gold = 150;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

xpText.innerText = xp;
healthText.innerText = health;
goldText.innerText = gold;

/**
 * An array containing weapon objects used in the game.
 * Each element represents a weapon with the following properties:
 *    * name: The name of the weapon (string).
 *    * power: The damage potential of the weapon (number).
 */
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

let maxWeaponsAllowed = weapons.length; // Maximum number of weapons allowed
let numOfcurrentWeapons = 1; // The number of current weapons in the inventory

/**
 * An array storing data about different locations in the game.
 * Each element represents a location with these properties:
 *   * name: The name of the location.
 *   * buttonText: An array of text labels for the navigation buttons.
 *   * buttonFunctions: An array of functions to execute when corresponding buttons are clicked.
 *   * text:  The descriptive text about the location.
 */
const locations = [
    {
        name: "town square",
        buttonText: ["🛒 Go to store", "🗻 Go to cave", "🐉 Fight dragon"],
        buttonFunctions: [goToStore, goToCave, fightDragon],
        text: "You are in town square. You see a sign that says \"Store.\""
    },
    {
        name: "store",
        buttonText: ["Buy 10x❤️ (10x🪙)", "Buy weapon (30x🪙)", "🏙️ Go to town square"],
        buttonFunctions: [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        buttonText: ["Fight slime", "Fight fanged beast", "🏙️ Go to town square"],
        buttonFunctions: [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
];

// Initialize buttons
button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;

/**
 * Updates the UI elements with location information.
 *
 * @param {object} location An object from the `locations` array, containing data about the new location to display.
 */
function update( location ) {
    button1.innerText = location.buttonText[0];
    button2.innerText = location.buttonText[1];
    button3.innerText = location.buttonText[2];
    
    button1.onclick = location.buttonFunctions[0];
    button2.onclick = location.buttonFunctions[1];
    button3.onclick = location.buttonFunctions[2];

    text.innerText = location.text;
}


/**
 * Navigates the player to the town square location.
 */
function goTown() {
    update( locations[0] );
}


/**
 * Navigates the player to the store location.
 */
function goToStore() {
    update( locations[1] );
}


/**
 * Navigates the player to the cave location.
 */
function goToCave() {
    update(locations[2]);
}


function fightDragon() {
    console.log( "Fight Dragon" );   
}


function fightSlime() {
    console.log( "Fight Slime" );   
}


function fightBeast() {
    console.log( "Fight Beast" );
}


/**
 * Allows the player to purchase health if they have enough gold.
 */
function buyHealth() {
    if ( gold >= 10 ) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold 🪙 to buy health.";
    }
}

/**
 * Allows the player to buy weapons if they have enough gold and haven't reached
 * the maximum weapon limit. Also provides the option to sell weapons.
 */
function buyWeapon() {
    if ( (gold >= 30) ) {

        if ( numOfcurrentWeapons >= maxWeaponsAllowed ) {
            text.innerText = "You already have the most powerful weapon.";
            button2.innerText = "Sell weapon (15x🪙)";
            button2.onclick = sellWeapon;
            return;
        }

        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon +  ".";
        inventory.push(newWeapon);
        text.innerText += "\nYour Inventory: [" + inventory + "]";
        numOfcurrentWeapons++;
    } else {
        text.innerText = "You do not have enough gold 🪙 to buy weapons.";
    }
}


function sellWeapon() {
    if ( numOfcurrentWeapons > 1 ) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += "\nYour Inventory: [" + inventory + "]";
        numOfcurrentWeapons--;
    } else {
        text.innerText = "You can't sell your only weapon!"
        text.innerText += "\nYour Inventory: [" + inventory + "]";
    }
}

