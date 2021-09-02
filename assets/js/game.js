// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less



//fight or skip round
var fightOrSkip = function () {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();

    // Conditional Recursive Function Call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerInfo.moneyfor skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // return true if player wants to leave
            return true;
        }
    }
    return false;
}

//Fight function
var fight = function (enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        //If it is the player-robot's turn:
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            // Check if the enemy-robot has enough health to continue fighting
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }
        // If it is not the player-robot's turn:
        else {
            //Remove player's health by subtracting the amount set in the enemy.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            // Check if the player-robot has enough health to continue fighting
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break; //breaks out of fight loop after player dies
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // After the turn is done, switch turns for the next bout of fighting:
        isPlayerTurn = !isPlayerTurn;
    }
};

// function to start a new game
var startGame = function () {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the picked Enemy object into the fight function
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    //When the game has ended and we've survived facing all the robots:
    // Retrieve the current high score from localStorage
    var highScore = localStorage.getItem("highScore");
    highScore = highScore || 0; //if no high score, set to zero

    // Compare the player-robot score with the current high score
    // If the current high score is higher
    if (highScore > playerInfo.money) {
        // Send player the message that the player did not beat the high score
        window.alert("You did not beat the high score.");
    }
    // If the player score is higher
    else {
        // Set new high score object into localStorage
        localStorage.setItem("highScore", playerInfo.money);
        // Set new player-robot's name object into localStorage
        localStorage.setItem("highScorePlayer", playerInfo.name);
        // Send player the message that they beat the high score
        window.alert("WOOHOO! You beat the high score!");
    }
    
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function () {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    // use switch to carry out action
    switch (parseInt(shopOptionPrompt)) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name)
    return name;
    ;
}


// Player Robot
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (playerInfo.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// Enemy robots
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start the game when the page loads
startGame();