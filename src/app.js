import {Hand} from 'pokersolver';
console.log(Hand);

export class App {
  constructor() {
    this.cardshref = "https://everymatrix.com/front-end-academy/alex/img/cards/";

    this.singleHandRank = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      'T': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
    };
    this.singleHandRankReversed = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    this.singleHandColor = ['c', 'd', 'h', 's'];

    this.deck = ['2c', '2d', '2h', '2s', '3c', '3d', '3h', '3s', '4c', '4d', '4h', '4s', '5c', '5d', '5h', '6s', '6c', '6d', '6h', '6s', '7c', '7d', '7h', '7s', '8c', '8d', '8h', '8s', '9c', '9d', '9h', '9s', 'Tc', 'Td', 'Th', 'Ts', 'Jc', 'Jd', 'Jh', 'Js', 'Qc', 'Qd', 'Qh', 'Qs', 'Kc', 'Kd', 'Kh', 'Ks', 'Ac', 'Ad', 'Ah', 'As'];
    this.deckInit = ['2c', '2d', '2h', '2s', '3c', '3d', '3h', '3s', '4c', '4d', '4h', '4s', '5c', '5d', '5h', '6s', '6c', '6d', '6h', '6s', '7c', '7d', '7h', '7s', '8c', '8d', '8h', '8s', '9c', '9d', '9h', '9s', 'Tc', 'Td', 'Th', 'Ts', 'Jc', 'Jd', 'Jh', 'Js', 'Qc', 'Qd', 'Qh', 'Qs', 'Kc', 'Kd', 'Kh', 'Ks', 'Ac', 'Ad', 'Ah', 'As'];
    this.handinput;
    this.insertedhand;
    this.flop = [];
    this.turn = '';
    this.river = '';
    this.playerHand = [];

  }

  change(event) {
    let value = event.target.value;
    let target = document.getElementById('YourHand');
    this.insertedhand = updateHand(this.handinput);
    console.log(this.insertedhand);

    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }

    if (this.insertedhand.length !== 0) {
      if (this.insertedhand.length === 1) {
        target.insertAdjacentHTML('beforeend', `<img class="Img" src="${this.cardshref + this.insertedhand[0]}.png"/>`);
      } else {
        target.insertAdjacentHTML('beforeend', `<img class="Img" src="${this.cardshref + this.insertedhand[0]}.png"/>`);
        target.insertAdjacentHTML('beforeend', `<img class="Img" src="${this.cardshref + this.insertedhand[1]}.png"/>`);
      }

    }
    this.playerHand = updatePlayerHand(this.playerHand, this.insertedhand, this.flop, this.turn, this.river);
    console.log(this.playerHand);
    if (this.playerHand.length !== 0 && this.playerHand.length !== 1) {
      let result = Hand.solve(this.playerHand).descr;
      if (document.getElementById('HandStrength')) {
        document.getElementById('HandStrength').parentNode.removeChild(document.getElementById('HandStrength'))
      }

      document.getElementById('YourHandStrength').insertAdjacentHTML('beforeend', `<p id="HandStrength" class="HandStrength">${result}</p>`);
      console.log(Hand.solve(this.playerHand));
    }
  }

  generateFlop() {
    let target = document.getElementById('Flop');
    let generatedCard;
    let removecards = [];
    this.flop = [];

    removecards.push.apply(removecards, this.insertedhand);


    if (this.insertedhand !== 'undefined' && this.insertedhand.length === 2) {
      this.deck = this.deckInit.slice(0);
      this.deck = removeCardFromDeck(this.deck, removecards);
      console.log(removecards);
      while (target.firstChild) {
        target.removeChild(target.firstChild);
      }

      for (let i = 0; i < 3; i++) {

        generatedCard = this.deck[getRandomInt(0, this.deck.length)];
        removeCardFromDeck(this.deck, generatedCard);
        target.insertAdjacentHTML('beforeend', `<img class="Img" src="${this.cardshref + generatedCard}.png">`);
        this.flop.push(generatedCard);
      }


    }

    this.playerHand = updatePlayerHand(this.playerHand, this.insertedhand, this.flop, this.turn, this.river);


    console.log(this.deck);
    console.log(this.flop);
    console.log(this.playerHand);

    if (this.playerHand.length !== 0 && this.playerHand.length !== 1) {
      let result = Hand.solve(this.playerHand).descr;
      document.getElementById('HandStrength').parentNode.removeChild(document.getElementById('HandStrength'));
      document.getElementById('YourHandStrength').insertAdjacentHTML('beforeend', `<p id="HandStrength" class="HandStrength">${result}</p>`);
      console.log(Hand.solve(this.playerHand));
    }
  }

  generateTurn() {
    console.log("clicked Turn");
    let target = document.getElementById('Turn');
    let generatedCard;
    let removecards = [];
    this.turn = '';
    this.deck = this.deckInit.slice(0);


    removecards.push.apply(removecards, this.insertedhand);
    removecards.push.apply(removecards, this.flop);

    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    removeCardFromDeck(this.deck, removecards);

    generatedCard = this.deck[getRandomInt(0, this.deck.length)];
    removeCardFromDeck(this.deck, generatedCard);
    target.insertAdjacentHTML('beforeend', `<img class="Img" src="${this.cardshref + generatedCard}.png">`);
    this.turn = generatedCard;

    this.playerHand = updatePlayerHand(this.playerHand, this.insertedhand, this.flop, this.turn, this.river);

    if (this.playerHand.length !== 0 && this.playerHand.length !== 1) {
      let result = Hand.solve(this.playerHand).descr;
      document.getElementById('HandStrength').parentNode.removeChild(document.getElementById('HandStrength'));
      document.getElementById('YourHandStrength').insertAdjacentHTML('beforeend', `<p id="HandStrength" class="HandStrength">${result}</p>`);
      console.log(Hand.solve(this.playerHand));
    }
    simulateRiver( this.deck ,this.playerHand);

  }

  generateRiver() {
    console.log("clicked River");

    let target = document.getElementById('River');
    let generatedCard;
    let removecards = [];
    this.river = '';
    this.deck = this.deckInit.slice(0);


    removecards.push.apply(removecards, this.insertedhand);
    removecards.push.apply(removecards, this.flop);
    removecards.push(this.turn);

    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    removeCardFromDeck(this.deck, removecards);

    generatedCard = this.deck[getRandomInt(0, this.deck.length)];
    removeCardFromDeck(this.deck, generatedCard);
    target.insertAdjacentHTML('beforeend', `<img class="Img" src="${this.cardshref + generatedCard}.png">`);
    this.river = generatedCard;

    this.playerHand = updatePlayerHand(this.playerHand, this.insertedhand, this.flop, this.turn, this.river);


    if (this.playerHand.length !== 0 && this.playerHand.length !== 1) {
      let result = Hand.solve(this.playerHand).descr;
      document.getElementById('HandStrength').parentNode.removeChild(document.getElementById('HandStrength'));
      document.getElementById('YourHandStrength').insertAdjacentHTML('beforeend', `<p id="HandStrength" class="HandStrength">${result}</p>`);
      console.log(Hand.solve(this.playerHand));
    }


  }

}

function updateHand(handinsert) {
  let arr = [];
  let regex2 = /([AKQJTakqjt2-9][cdshCDSH])([AKQJTakqjt2-9][cdshCDSH])|[AKQJTakqjt2-9]+[cdshCDSH]/i;

  let result = regex2.exec(handinsert);

  if (result) {
    if (result[0].length === 2) {
      arr.push(result[0]);

    } else {
      arr = [];
      arr.push(result[1]);
      arr.push(result[2]);
    }

  }
  console.log(result);

  return arr;
}


function removeCardFromDeck(arr, removeCard) {

  if (typeof(removeCard) === 'string') {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === removeCard) {
        arr.splice(i, 1);
      }
    }
  }
  else if (typeof(removeCard) === 'object') {
    for (let j = 0; j < removeCard.length; j++) {
      let k = removeCard[j];
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === k) {
          arr.splice(i, 1);
        }
      }
    }
  }
  return arr;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function addToArray(arr, input) {
  if (typeof(input) === 'string' && input !== '') {
    arr.push(input);
  } else if (typeof(input) === 'object') {
    for (let i = 0; i < input.length; i++) {
      arr.push(input[i]);
    }
  }

  return arr;
}

function updatePlayerHand(playerHand, insertHand, flop, turn, river) {
  playerHand = [];
  playerHand = addToArray(playerHand, insertHand);
  playerHand = addToArray(playerHand, flop);
  playerHand = addToArray(playerHand, turn);
  playerHand = addToArray(playerHand, river);

  return playerHand;
}

function simulateTurnRiver() {

}

function simulateRiver(deck, playerHand) {

    let result=[];
    let indexToRemove = deck.length;
    console.log(indexToRemove);

    console.log(deck);
    console.log(playerHand);
    for( let i=0; i <deck.length; i++) {
        playerHand.splice(indexToRemove, 1)
        playerHand.push(deck.shift());

        console.log(playerHand);
    }


}
