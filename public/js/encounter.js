const encounterWindow = document.querySelector('.encounter-window');
const enemyDesc = document.querySelector('.enemy-description');
const eventDisplay = document.querySelector('.event-display');
const controls = document.querySelector('.encounter-controls');

class Enemy {
  constructor(type, hp, atk, reward) {
    this.type = type;
    this.maxHP = hp;
    this.attack = atk;
    this.reward = reward;
  }
};

class Goblin extends Enemy {
  constructor() {
    super('Goblin', 20, 3, 15);
  }
};

class Orc extends Enemy {
  constructor() {
    super('Orc', 35, 6, 30);
  }
};

class Ogre extends Enemy {
  constructor() {
    super('Ogre', 50, 10, 75);
  }
};

const enemyClasses = [ Goblin, Orc, Ogre ];

const selectEnemy = () => enemyClasses[Math.floor(Math.random() * enemyClasses.length)];

const startEncounter = () => {
  let enemy = new (selectEnemy())();
  console.log(enemy.type);
  enemy.hp = enemy.maxHP;
  let player = {hp: 50, atk: 10};

  enemyDesc.textContent = `You see a ${enemy.type}. It has ${enemy.hp} hit points.`;
  controls.querySelector('.encounter-fight').addEventListener('click', (ev) => {
    eventDisplay.textContent = `You win! Adding ${enemy.reward} points!`;
    victoryHandler()
  });
}

const victoryHandler = async (enemy) => {
  let result = await fetch(`${window.location.protocol}//${window.location.host}/api/encounter/win`, {
    method: 'POST',
    // mode: "same-origin",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(enemy)
  });
  console.log(result);
  eventDisplay.textContent = result;
}

startEncounter();

// module.exports = {Enemy, Goblin, Orc, Ogre};
