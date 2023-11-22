const mario = document.querySelector('.mario');
const cano = document.querySelector('.cano');
const nuvem = document.querySelector('.nuvem');
const fimDeJofo = document.querySelector('.fim-de-jogo');
const botaoReiniciar = document.querySelector('.reiniciar');

let pontuacao = 0;  

document.addEventListener('keyup', fazerMarioPular);

function fazerMarioPular(){
    mario.classList.add('pular');
    setTimeout(function () {
        mario.classList.remove('pular');
        pontuacao++;
        atualizarPontuacao();
    }, 500);
}

function atualizarPontuacao(){
    console.log('Pontuação: ' + pontuacao);
}