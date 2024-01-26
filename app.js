let numeroMaximo = 10;
let numeroSecreto = 0;
let intentos = 0;
let maxIntentos = 4;
let listaNumerosSorteados = [];

function asignarTextoElemento(elemento, texto){
    let textoElementoHTML = document.querySelector(elemento);
    textoElementoHTML.innerHTML = texto;
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = parseInt(Math.floor(Math.random()*numeroMaximo)+1);
    console.log (numeroGenerado);
    console.log(listaNumerosSorteados);
    if (listaNumerosSorteados [listaNumerosSorteados.length - 1] == numeroGenerado) {
        return generarNumeroSecreto(); //"Recursividad" ejecutar una función dentro de una función.
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales () {
    asignarTextoElemento('h1','¡Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    return;
}

condicionesIniciales();

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function reinciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); //Deshablitar el botón de nuevo juego
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Que bien!, acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
        document.querySelector('#reiniciar').removeAttribute('disabled'); //Habilitar botón "nuevo juego".
    } else { //El usuario no acertó
        if (numeroDeUsuario < 1 | numeroDeUsuario > numeroMaximo) {
            asignarTextoElemento('p', '¡ERROR!, el número ingresado está fuera de rango.');
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', `El número secreto es menor a ${numeroDeUsuario}.`);
            } else {
                if (numeroDeUsuario < numeroSecreto) {
                    asignarTextoElemento('p', `El número secreto es mayor a ${numeroDeUsuario}`);
                }
            }
            intentos++;
            if (intentos>maxIntentos) {
                asignarTextoElemento('p', `¡Que lastima!, alcanzaste el máximo de ${maxIntentos} intentos.`);
                document.getElementById('reiniciar').removeAttribute('disabled'); //Habilitar botón "nuevo juego".
            }
        }
        limpiarCaja();
    }
    return;
}