
// 2C = two of Clubs
// 2D = two of Diamonds
// 2H = two of Hearts
// 2S = two of Spades


let deck = [];
const tipos = ['C','D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

//esta funcion crea una  nueva baraja
const crearDeck = ()=> {
    for (let i = 2; i <= 10; i++){
        for (let tipo of tipos) {
            deck.push( i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push( esp + tipo)
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck
}

 crearDeck();


//esta funcion me permite tomar una carta

const pedirCarta = () => {

    if ( deck.length === 0 ){
        throw 'No hay mas cartas en el deck!'
    }

    const carta = deck.pop();

    console.log(deck);
    console.log(carta); //carta debe ser la que se quito de la baraja
    return carta;
}

//pedirCarta();

const valorCarta = (carta)=> {
    const valor = carta.substring(0, carta.length -1);
    return (isNaN( valor)) ? (valor ==='A') ? 11 : 10 :valor * 1;
}

console.log(valorCarta( pedirCarta()));

