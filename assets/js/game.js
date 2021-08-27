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

  console.log(enemyName + " attacks " + playerName);
  playerHealth = playerHealth - enemyAttack;
  console.log(playerName + "'s health is " + playerHealth);
};

fight();