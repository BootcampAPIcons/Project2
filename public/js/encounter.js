
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

// module.exports = {Enemy, Goblin, Orc, Ogre};
