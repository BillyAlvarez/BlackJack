// 2C = two of Clubs
// 2D = two of Diamonds
// 2H = two of Hearts
// 2S = two of Spades


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosCPU = 0;

//referencias html

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasCPU = document.querySelector('#CPU-cartas');
const puntajeHTML = document.querySelectorAll('small');

//esta funcion crea una  nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }

    deck = _.shuffle(deck);
    return deck
}

crearDeck();


//esta funcion me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas en el deck!'
    }

    const carta = deck.pop();
    return carta;
}

//pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}

//turno CPU

const turnoCPU = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosCPU = puntosCPU + valorCarta(carta);
        puntajeHTML[1].innerText = puntosCPU;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasCPU.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosCPU < puntosMinimos) && puntosMinimos <= 21);

    setTimeout(() => {

        resultadoJuego(puntosMinimos, puntosCPU)

    }, 20);

}


const resultadoJuego = (puntajeJugador, puntajeCpu) => {
    if (puntajeJugador === puntajeCpu) {
        alert('Empate!!!')
    } else if ((puntajeCpu > 21) && (puntajeJugador <= 21)) {
        alert('Ganaste!!!')
    } else {
        alert('Perdiste! :C')
    }
}


//eventos

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCPU(puntosJugador);
    return ((puntosJugador <= 21) && (puntosCPU > 21) ? console.log('Ganaste!!!') : console.log('Perdiste! :C'));
});


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntajeHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);


    if (puntosJugador > 21) {
        console.error('Lo siento, Perdiste :C')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCPU(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

btnNuevo.addEventListener('click', () => {
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    deck = [];
    deck = crearDeck();
    console.log(deck)
    divCartasCPU.innerHTML = '';
    divCartasJugador.innerHTML = '';
    puntajeHTML[0].innerText = 0;
    puntajeHTML[1].innerText = 0;
    puntosJugador = 0;
    puntosCPU = 0;

})


