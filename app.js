new Vue ({
  el: '#app',

  data: {

    playerHP: 100,
    monsterHP: 100,
    gameStarted: false,
    damage: 0,
    heal: 0,
    turns: []

  },

  methods: {

    startGame: function() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.gameStarted = true;
    },

    calculateAttack: function () {

      this.damage = this.calculateDamage(1, 20);

      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for : ' + this.damage
      });

      this.monsterHP -= this.damage;

      this.winCheck();


      this.damage = this.calculateDamage(1, 20);

      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Monster for : ' + this.damage
      });

      this.playerHP -= this.damage;

      this.winCheck();
    },

    calculateSpeacialAttack: function () {
      var missChance = Math.floor(Math.random() * 4);

      if (missChance === 0) {
        this.damage = this.calculateDamage(10, 40);
        this.monsterHP -= this.damage;

        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster for : ' + this.damage
        });

      } else {
        this.turns.unshift({
          isPlayer: true,
          text: 'Player missed'
        });
      }

      this.winCheck();


      this.damage = this.calculateDamage(1, 20);
      this.playerHP -= this.damage;

      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for : ' + this.damage
      });

      this.winCheck();
    },

    calculateHeal: function () {
      this.heal = Math.floor(Math.random() * 20);
      this.playerHP += this.heal;

      this.turns.unshift({
        isPlayer: true,
        text: 'Player Healed for : ' + this.heal
      });


      this.damage = this.calculateDamage(1, 20);
      this.playerHP -= this.damage;

      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for : ' + this.damage
      });

      this.winCheck();
    },

    finish: function () {
      this.gameStarted = false;
      this.turns = [];
    },

    calculateDamage: function (min, max) {
      return Math.floor(Math.random() * max) + min;
    },

    winCheck: function () {
      if (this.monsterHP <= 0 || this.playerHP <= 0) {
        if (confirm("Game Over! New Game ?") == true) {
          this.gameStarted = false;
          this.startGame();
        } else {
          this.gameStarted = false;
        }
      }
    }
  }
})
