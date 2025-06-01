// Definición del módulo como una IIFE (Immediately Invoked Function Expression)
const miModulo = (() => {
    'use strict';

    // Variables globales
    let deck = []; // Baraja de cartas
    const tipos      = ['C', 'D', 'H', 'S'], // Tipos de cartas (Corazones, Diamantes, etc.)
          especiales = ['A', 'J', 'Q', 'K']; // Valores especiales de las cartas (As, Jota, Reina, Rey)

    let puntosJugadores= []; // Puntos de los jugadores

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'), // Contenedores de las cartas de los jugadores en el HTML
          puntosHTML     = document.querySelectorAll('small'); // Elementos HTML donde se muestran los puntos de los jugadores

    // Función para inicializar el juego
    const inicializarJuego = (numJugadores = 2) => {
        // Se crea una nueva baraja
        deck = crearDeck();

        // Se establecen los puntos de los jugadores en cero
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        // Se actualizan las visualizaciones de puntos en el HTML
        puntosHTML.forEach(elem => elem.innerText = 0);

        // Se limpian las cartas de los jugadores en el HTML
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        // Se habilitan los botones "Pedir" y "Detener"
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Función para crear una nueva baraja de cartas
    const crearDeck = () => {
        // Se crea un mazo vacío
        deck = [];
        // Se agregan las cartas del 2 al 10 para cada tipo
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        // Se agregan las cartas especiales para cada tipo
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        // Se mezcla el mazo y se devuelve
        return _.shuffle(deck);
    }

    // Función para tomar una carta del mazo
    const pedirCarta = () => {
        // Si no hay cartas en el mazo, se lanza un error
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        // Se toma y devuelve la última carta del mazo
        return deck.pop();
    }

    // Función para obtener el valor numérico de una carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        // Si el valor es un número, se devuelve ese número; de lo contrario, se devuelve 10 para J, Q, K y 11 para A
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    }

    // Función para acumular puntos de un jugador
    const acumularPuntos = (carta, turno) => {
        // Se suma el valor de la carta al total de puntos del jugador correspondiente
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        // Se actualiza la visualización de puntos en el HTML
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    // Función para crear una carta en la interfaz gráfica
    const crearCarta = (carta, turno) => {
        // Se crea un elemento de imagen para representar la carta y se agrega al contenedor correspondiente en el HTML
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Función para determinar al ganador del juego
    const determinarGanador = () => {
        // Se obtienen los puntos del jugador y de la computadora
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        // Se espera un breve momento antes de mostrar el resultado
        setTimeout(() => {
            // Se comprueba quién gana y se muestra un mensaje de alerta
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100);
    }

    // Función para el turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        // La computadora toma cartas hasta que alcance la cantidad mínima de puntos o se pase de 21
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        // Se determina al ganador después del turno de la computadora
        determinarGanador();
    }

    // Eventos
    // Evento para el botón "Pedir"
    btnPedir.addEventListener('click', () => {
        // Se toma una carta y se acumulan puntos para el jugador
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        // Se crea una carta en la interfaz gráfica para el jugador
        crearCarta(carta, 0);

        // Si los puntos del jugador superan 21 o llegan a 21, se detiene el juego
        if (puntosJugador > 21 || puntosJugador === 21) {
            // Se deshabilitan los botones "Pedir" y "Detener" y se ejecuta el turno de la computadora
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    // Evento para el botón "Detener"
    btnDetener.addEventListener('click', () => {
        // Se deshabilitan los botones "Pedir" y "Detener" y se ejecuta el turno de la computadora
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    // Retorno de funciones públicas del módulo
    return {
        nuevoJuego: inicializarJuego // Se expone la función de inicializarJuego para iniciar un nuevo juego desde fuera del módulo
    };
})();
