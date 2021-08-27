var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
  window.alert("Welcome to Robot Gladiators!");
  enemyHealth = enemyHealth - playerAttack;
  console.log(playerName + " attacks " + enemyName);
  console.log(enemyName + "'s health is " + enemyHealth);
  // check enemy's health
  if (enemyHealth <= 0) {
    window.alert(enemyName + " has died!");
  } 
  else {
    window.alert(enemyName + " still has " + enemyHealth + " health left.");
  }

  console.log(enemyName + " attacks " + playerName);
  playerHealth = playerHealth - enemyAttack;
  console.log(playerName + "'s health is " + playerHealth);

  // check player's health
  if (playerHealth <= 0) {
    window.alert(playerName + " has died!");
  } 
  else {
    window.alert(playerName + " still has " + playerHealth + " health left.");
  }
};

fight();
// check to see if the value of the playerHealth variable is greater than 0
if (playerHealth > 0) {
    console.log("Your player is still alive!");
}