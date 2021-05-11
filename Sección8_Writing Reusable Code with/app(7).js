// Write a getCard() function which returns a random playing card object, like:
// 		{
// 			value: 'K'
// 			suit: 'clubs'
// 		}
//Pick a random value from:
//----1,2,3,4,5,6,7,8,9,10,J,Q,K,A
//Pick a random suit from:
//----clubs,spades, hearts, diamonds
//Return both in an object































function getCard(){
    cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];
    suits = ['clubs', 'spades', 'hearts',' diamonds'];

    let numCards = Math.floor( Math.random() * cards.length);
    let numSuits = Math.floor( Math.random() * suits.length);

    let theChoice = {
        value: cards[numCards],
        suit: suits[numSuits]
    }
    return theChoice
}

getCard();

///////// Colt Way ///////////////

function pick(arr) {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}
function getCard() {
    cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];
    suits = [ 'clubs', 'spades', 'hearts',' diamonds' ];

    return {value: pick(values), suit: pick(suits)};
}

getCard();

