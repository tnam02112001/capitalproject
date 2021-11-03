import Deck from "./deck.js"
import axios from "./node_modules/axios"

const CARD_DICT = {
    "2": 0,
    "3": 1,
    "4": 2,
    "5": 3,
    "6": 4,
    "7": 5,
    "8": 6,
    "9": 7,
    "10": 8,
    "J": 9,
    "Q": 10,
    "K": 11,
    "A": 12
  };

const p1DeckElement = document.querySelector(".p1-deck")
const p2DeckElement = document.querySelector(".p2-deck")
const statusElement = document.querySelector(".status")
const p1ScoreElement = document.querySelector(".p1Score")
const p2ScoreElement = document.querySelector(".p2Score")


let p1Deck, p2Deck, p1Cards, p2Cards, p1Score, p2Score, game, btStart, btStop
let inRound = false
let cardPulled = false 
let inWar = false
let inGame = false


// Database setup
setUpScore()

// Generate functional buttons
genrateButtons()

function setUpScore(){
    // Retrieve the score of each player from the db, 
    // if it doesnt existed, create a new document for the player in the db
    axios.get("http://localhost:5000/", {
        params: {"name": "Player 1"}})
        .then((resp) =>{
            console.log(resp.data.score)
            if (resp.data.score == -1)
                p1Score = initializePlayer("Player 1")
            else
                console.log(resp.data.score)
                p1Score = resp.data.score
                
        }
        
    )
    
    axios.get("http://localhost:5000/", {
        params: {"name": "Player 2"}})
        .then((resp) =>{
            if (resp.data.score == -1)
                p2Score = initializePlayer("Player 2")
            else
                p2Score = resp.data.score
        }
    )

    updateScoreDisplay()
    
}

function updateScoreDisplay()
{
    
    if (typeof p1Score !== "undefined" && typeof p2Score !== "undefined")
    {
        p1ScoreElement.innerText = "Player 1 Lifetime Score: " + p1Score
        p2ScoreElement.innerText = "Player 2 Lifetime Score: " + p2Score
    }else{
        // Account for server delay
        setTimeout(updateScoreDisplay, 250)
    }
    
}

function initializePlayer(playerName)
{
    var player = {
        name: playerName,
        score: 0
    }
    axios
      .post("http://localhost:5000/", player)
      .then(function (response) {
        console.log(response.data.score);
        return response.data.score
      })
      .catch(function (error) {
        console.log(error);
      });
}

function genrateButtons(){
    // Generate the stopGame button
    btStop = document.createElement("button")
    btStop.innerHTML = "Stop Game";
    btStop.onclick = function () {
        if (inGame)
        {
            clearInterval(game)
            inGame = false
        }      
    }
    document.querySelector(".title").insertAdjacentElement('afterend', btStop)
    
    // Generate the startGame button
    btStart = document.createElement("button")
    btStart.innerHTML = "Start Game";
    btStart.onclick = function () {
        if (!inGame)
        {
            startGame()
            game = setInterval(progressGame, 1000);
            inGame = true
        }      
    };
    document.querySelector(".title").insertAdjacentElement('afterend', btStart)

}

    





function progressGame(){
    if (inRound && !inWar) {
        cleanBeforeRound()
    } else {
        if (cardPulled) 
            flipCards()
        else
        {
            var n = inWar ? 2:1 
            pullCards(n)
        }
           
    }

}

function pullCards(n)
{
    for (let i = 0; i < n; i++)
    {
        const p1Card = p1Deck.popCard()
        const p2Card = p2Deck.popCard()
        p1Cards.push(p1Card)
        p2Cards.push(p2Card)
        p1DeckElement.insertAdjacentElement('afterend', p1Card.divGenUnflipped())
        p2DeckElement.insertAdjacentElement('afterend', p2Card.divGenUnflipped())
    }
   
    updateDeckCount()
    cardPulled = true
}


function flipCards(){
    inRound = true
    const p1Card = p1Cards[p1Cards.length -1]
    const p2Card = p2Cards[p1Cards.length -1]
    const p1CardUnflippedElement = document.getElementById(p1Card.val + p1Card.suit) 
    const p2CardUnflippedElement = document.getElementById(p2Card.val + p2Card.suit)
    p1CardUnflippedElement.replaceWith(p1Card.divGenFlipped())
    p2CardUnflippedElement.replaceWith(p2Card.divGenFlipped())
    checkRound(p1Card, p2Card)

}

function startGame(){
    const deck = new Deck()
    deck.shuffle()
    const mid = Math.ceil(deck.cards.length / 2)
    p1Deck = new Deck(deck.cards.slice(0, mid))
    p2Deck = new Deck(deck.cards.slice(mid, deck.cards.length))
   cleanBeforeRound()
}

function cleanBeforeRound()
{
    statusElement.innerText = "Status:"
    updateDeckCount()
    document.querySelectorAll(".card").forEach(c => c.remove());
    p1Cards = []
    p2Cards = []
    inRound = false
    cardPulled = false
}

function updateDeckCount()
{
    p1DeckElement.innerText = p1Deck.cards.length
    p2DeckElement.innerText = p2Deck.cards.length
}

function checkRound(p1Card, p2Card)
{
    if (CARD_DICT[p1Card.val] > CARD_DICT[p2Card.val]){
        statusElement.innerText = "Status: Player 1 win!"
        p1Cards.forEach(p1Card => p1Deck.addCard(p1Card) )
        p2Cards.forEach(p2Card => p1Deck.addCard(p2Card) )
        p1Score++
        updateScore("Player 1", p1Score)
        inWar = false
    } else if (CARD_DICT[p1Card.val] < CARD_DICT[p2Card.val])
    {
        statusElement.innerText = "Status: Player 2 win!"
        p1Cards.forEach(p1Card => p2Deck.addCard(p1Card) )
        p2Cards.forEach(p2Card => p2Deck.addCard(p2Card) )
        inWar = false
        p2Score++
        updateScore("Player 2", p2Score)
    } else{
        statusElement.innerText = "Status: War"
        inWar = true
        cardPulled = false
    }
    checkGameOver() 
    updateScoreDisplay()
}

function checkGameOver()
{
    if (p1Deck.cards.length === 0){
        clearInterval(game)
        statusElement.innerText = "Status: Player 1 has won all the cards!"
        inGame = false
        
    } else if (p2Deck.cards.length === 0)
    {
        clearInterval(game)
        statusElement.innerText = "Satus: Player 2 has won all the cards!"
        inGame = false
       
    }

    updateScoreDisplay()
}

function updateScore(playerName, currScore)
{
    var player = {
        name: playerName,
        score: currScore
    }
    axios
      .put("http://localhost:5000/", player)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
}