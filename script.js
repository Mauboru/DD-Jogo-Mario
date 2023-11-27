const player = document.querySelector('.player');
const cano = document.querySelector('.cano');
const nuvem = document.querySelector('.nuvem');
const fimDeJogo = document.querySelector('.fim-de-jogo');
const botaoReiniciar = document.querySelector('.reiniciar');
const hudPontos = document.querySelector('.hud');

let pontuacao = 0;  
let marcouPonto = false;

document.addEventListener('keyup', fazerPlayerPular);

function fazerPlayerPular(){
    player.src = 'assets/imgs/naruto-jump.png';
    player.classList.add('pular');
    setTimeout(function () {
        player.src = 'assets/imgs/naruto-run.gif';
        player.classList.remove('pular');
    }, 500);
}

function atualizarPontuacao(){
    hudPontos.innerHTML = "Pontos: " + pontuacao;
}

function verificarColisoes(){
    const posicaoCano = cano.offsetLeft;
    const posicaoPLayer = parseFloat(getComputedStyle(player).bottom);
    const posicaoNuvem = parseFloat(getComputedStyle(nuvem).bottom);

    if(posicaoCano <= 100 && posicaoCano > 0 && posicaoPLayer < 60){
        console.log("Você morreu, sua pontuação foi de: ", pontuacao)
        pontuacao = 0;
        pararJogo();

        cano.style.animation = 'none';
        cano.style.left = `${posicaoCano}px`;

        player.style.animation = 'none';
        player.style.bottom = `${posicaoPLayer}px`;
        player.src = 'assets/imgs/fim-de-jogo.png';
        player.style.width = '70px';
        player.style.marginLeft = '35px';

        nuvem.style.animation = 'nuvem 20s infinite linear';
        nuvem.style.left = `${posicaoNuvem}px`;

        fimDeJogo.style.visibility = 'visible';
    }

    if (posicaoCano <= 100 && posicaoCano > 0 && posicaoPLayer > 60){
        if (!marcouPonto) {
            pontuacao++;
            atualizarPontuacao();
            marcouPonto = true;
        }
    } else {
        marcouPonto = false;
    }
}

let loopJogo = setInterval(verificarColisoes, 10);

function pararJogo(){
    clearInterval(loopJogo);
    console.log("Jogo Parado");
}

function reiniciar(){
    location.reload();
}

// var audio = new Audio('audio.mp3');
// audio.addEventListener('canplaythrough', function() {
//   audio.play();
// });