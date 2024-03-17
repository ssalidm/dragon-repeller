let xp = 0;
let health = 100;
let gold = 50;
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


initializeGameAttributes()
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

/**
 * An array containing monster objects used in the game.
 * Each element represents a monster with the following properties:
 *    * name: The name of the monster (string).
 *    * level: The difficulty or strength level of the monster (number).
 *    * health: The monster's health points (number).
 */
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    },
];

let maxWeaponsAllowed = weapons.length; // Maximum number of weapons allowed
let numOfcurrentWeapons = 1; // The number of current weapons in the inventory

/**
 * An array storing data about different locations in the game.
 * Each element represents a location with these properties:
 *   * name: The name of the location.
 *   * buttonText: An array of text labels for the navigation buttons.
 *   * buttonFunctions: An array of functions to execute when corresponding
 *     buttons are clicked.
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
    {
        name: "fight",
        buttonText: ["Attack", "Dodge", "Run"],
        buttonFunctions: [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        buttonText: ["🏙️ Go to town square", "🏙️ Go to town square", "🏙️ Go to town square"],
        buttonFunctions: [easterEgg, goTown, goTown],
        text: "The 👹monster screams \"Arg!!\" as it dies. You gain experience points and find 🪙 gold."
    },
    {
        name: "lose",
        buttonText: ["REPLAY", "REPLAY", "REPLAY"],
        buttonFunctions: [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        buttonText: ["REPLAY?", "REPLAY?", "REPLAY?"],
        buttonFunctions: [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎆"
    },
    {
        name: "easter egg",
        buttonText: ["2", "8", "🏙️ Go to town square"],
        buttonFunctions: [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly selected between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    },
];

// Initialize buttons
button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;


/**
 * Initializes the game attributes such as experience points, health, gold,
 * current weapon, and inventory.
 * Sets the initial values for experience points (xp), health, gold,
 * currentWeapon, and inventory.
 * @returns {void}
 */
function initializeGameAttributes() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
}


/**
 * Updates the UI elements with location information.
 *
 * @param {object} location An object from the `locations` array,
 * containing data about the new location to display.
 *  @returns {void}
 */
function update(location) {
    // monsterStats.style.display = "none";

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
 *  @returns {void}
 */
function goTown() {
    update(locations[0]);
    monsterStats.style.display = "none";
    button2.style.display = "inline-block";
    button3.style.display = "inline-block";

}


/**
 * Navigates the player to the store location.
 *  @returns {void}
 */
function goToStore() {
    update(locations[1]);
}


/**
 * Navigates the player to the cave location.
 * @returns {void}
 */
function goToCave() {
    update(locations[2]);
}


/**
 * Initiates a fight with a slime monster.
 * Sets the fighting mode to 0 and calls the goFight function.
 * @returns {void}
 */
function fightSlime() {
    fighting = 0;
    goFight();
}


/**
 * Initiates a fight with a fanged beast monster.
 * Sets the fighting mode to 1 and calls the goFight function.
 * @returns {void}
 */
function fightBeast() {
    fighting = 1;
    goFight();
}


/**
 * Initiates a fight with a dragon monster.
 * Sets the fighting mode to 2 and calls the goFight function.
 * @returns {void}
 */
function fightDragon() {
    fighting = 2;
    goFight();
}


/**
 * Prepares the game for a fight.
 */
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}


/**
 * Handles a player's attack action during combat.
 */
function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks!";
    text.innerText += "\n You attack it with your " + weapons[currentWeapon].name + ".";

    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText = "You miss.";
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;

    if (monsterHealth < 0) {
        monsterHealth = 0;
    } else if (health < 0) {
        health = 0;
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if (health === 0) {
        lose();
    } else if (monsterHealth === 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (weaponBreaks()) {
        let weapon = inventory.pop();
        text.innerText += "Your " + weapon + " breaks.";
        currentWeapon--;
        numOfcurrentWeapons--;
        text.innerText += "\nYou're now holding a " + weapons[currentWeapon].name + ".";
    }
}


/**
 * Calculates the attack value of a monster based on its level.
 * The attack value is determined by multiplying the level of the monster by 5
 * and then subtracting a random value between 0 and the player's experience points (xp).
 * @param {number} level - The level of the monster.
 * @returns {number} - The calculated attack value of the monster.
 */
function getMonsterAttackValue(level) {
    return (level * 5) - (Math.floor(Math.random() * xp));
}


/**
 * Determines whether the monster is hit during an attack.
 * Generates a random number between 0 and 1 and checks if it's greater than 0.2.
 * Returns true if the generated number is greater than 0.2, indicating the monster is hit.
 * Or if the player's health is less than 20.
 * @returns {boolean} - True if the monster is hit, false otherwise.
 */
function isMonsterHit() {
    return (Math.random() > 0.2) || (health < 20);
}


/**
 * Determines whether the player's weapon breaks.
 * Generates a random number between 0 and 1 and checks if it's less than 0.1,
 * indicating a 10% chance of the weapon breaking. Also checks if the player
 * has more than one weapon remaining in their inventory.
 * @returns {boolean} - True if the weapon breaks and the player has more than
 * one weapon, false otherwise.
 */
function weaponBreaks() {
    console.log(numOfcurrentWeapons)
    return (Math.random() < 0.9) && (numOfcurrentWeapons > 1);
}


/**
 * Handles the player's dodge action during combat.
 */
function dodge() {
    let monster = monsters[fighting];
    text.innerText = "You dodge the attack from the " + monster.name + ".";
}


/**
 * Updates game state when a monster is defeated. Assumes 'locations' array has a post-victory location.
 */
function defeatMonster() {
    let monster = monsters[fighting];
    gold += (monster.level * 6.7) | 0;
    xp += monster.level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    button2.style.display = "none";
    button3.style.display = "none";
    update(locations[4]);
}


/** 
 * Updates game state when the player loses. Assumes 'locations' array has a loss/game-over location.
 */
function lose() {
    button2.style.display = "none";
    button3.style.display = "none";
    update(locations[5]);
}


/**
 * Player wins the game after defeating the dragon.
 */
function winGame() {
    update(locations[6]);
}


/**
 * Restarts the game by resetting player's progress and returning to town.
 * Calls the initializeGameAttributes() function to reset player's stats and inventory,
 * updates the UI display,
 * then calls the goTown function to return to the town.
 * @returns {void}
 */
function restart() {
    initializeGameAttributes();
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown();
}


/**
 * Allows the player to purchase health if they have enough gold.
 */
function buyHealth() {
    if (gold >= 10) {
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
    if ((gold >= 30)) {

        if (numOfcurrentWeapons >= maxWeaponsAllowed) {
            text.innerText = "You already have the most powerful weapon.";
            button2.innerText = "Sell weapon (15x🪙)";
            button2.onclick = sellWeapon;
            return;
        }

        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += "\nYour Inventory: [" + inventory + "]";
        numOfcurrentWeapons++;
    } else {
        text.innerText = "You do not have enough gold 🪙 to buy weapons.";
    }
}


/**
 * Sells a weapon from the player's inventory.
 *  * If the player has more than one weapon, the function sells the first
 *    weapon in the inventory, adds 15 gold to the player's gold count, updates 
 *    the displayed gold amount, and updates the inventory.
 *  * If the player has only one weapon, the function informs the player that
 *    they can't sell their only weapon.
 * @returns {void}
 */
function sellWeapon() {
    if (numOfcurrentWeapons > 1) {
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


/**
 * Activates an Easter egg event in the game.
 * Updates the game location to the specified location at index 7 in the 'locations' array.
 * Hides the monster stats and displays two additional buttons.
 * @returns {void}
 */
function easterEgg() {
    update(locations[7]);
    monsterStats.style.display = "none";
    button2.style.display = "inline-block";
    button3.style.display = "inline-block";
}


/**
 * Initiates a guess for the Easter egg event, picking the number 2.
 * Calls the 'pick' function with the guess value 2.
 * @returns {void}
 */
function pickTwo() {
    pick(2);
}


/**
 * Initiates a guess for the Easter egg event, picking the number 8.
 * Calls the 'pick' function with the guess value 8.
 * @returns {void}
 */
function pickEight() {
    pick(8);
}


/**
 * Initiates a guess for the Easter egg event, picking a specified number.
 * Generates an array of random numbers and displays them along with the player's guess.
 * Determines whether the player wins or loses based on the guess.
 * @param {number} guess - The player's guess for the Easter egg event.
 * @returns {void}
 */
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.ceil(Math.random() * 10));
    }

    text.innerText = "You picked [" + guess + "]. Here are the random numbers:\n";
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        text.innerText += num + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        let extraGold = 20;
        text.innerText += "Congratulations! You win! [" + extraGold + " x 🪙]";
        gold += extraGold;
        goldText.innerText = gold;
    } else {
        let healthLost = 10;
        text.innerText += "Oops! You lose [-" + healthLost + " x ❤️]"
        health -= healthLost;
    
        if (health <= 0) {
            health = 0;
            lose();
        } 
        healthText.innerText = health;
    }
}