// var Hand = require('pokersolver').Hand;
import { Hand } from 'pokersolver';
console.log(Hand)

export class App {
  constructor() {
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

  }

  change(event) {
    let value = event.target.value;
    this.insertedhand = updateHand(this.handinput);
    if(this.insertedhand) {
        document.getElementById('YourHandSection').insertAdjacentHTML('beforeend', `<img class="Img" src="static/cards/${this.insertedhand[0]}.png"/>`);
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
        target.insertAdjacentHTML('beforeend', `<img class="Img" src="./static/cards/${generatedCard}.png">`);
        this.flop.push(generatedCard);
      }

    }


    console.log(this.deck);
    console.log(this.flop);
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
    target.insertAdjacentHTML('beforeend', `<img class="Img" src="./cards/${generatedCard}.png">`);
    this.turn = generatedCard;
    console.log(generatedCard);
    console.log(removecards);
    console.log(this.deck);


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
    target.insertAdjacentHTML('beforeend', `<img class="Img" src="./cards/${generatedCard}.png">`);
    this.river = generatedCard;
    console.log(generatedCard);
    console.log(removecards);
    console.log(this.deck);

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
