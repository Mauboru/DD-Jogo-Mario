const player = document.querySelector('.player');
const cano = document.querySelector('.cano');
const nuvem = document.querySelector('.nuvem');
const fimDeJogo = document.querySelector('.fim-de-jogo');
const botaoReiniciar = document.querySelector('.reiniciar');
const hudPontos = document.querySelector('.hud');

let pontuacao = 0;  
let marcouPonto = false;
let morreu = false;
let pulando = false;

document.addEventListener('keyup', fazerPlayerPular);

function fazerPlayerPular(){
    if(!morreu && !pulando){
        pulando = true;
        player.src = 'assets/imgs/naruto-jump.png';
        player.classList.add('pular');
        setTimeout(function () {
            if (!morreu){
                player.src = 'assets/imgs/naruto-run.gif';
                player.classList.remove('pular');
                pulando = false;
            }
        }, 500);
    }
}

function atualizarPontuacao(){
    hudPontos.innerHTML = "Pontos: " + pontuacao;
}

function verificarColisoes(){
    const posicaoCano = cano.offsetLeft;
    const posicaoPLayer = parseFloat(getComputedStyle(player).bottom);
    const posicaoNuvem = parseFloat(getComputedStyle(nuvem).bottom);

    if(posicaoCano <= 100 && posicaoCano > 0 && posicaoPLayer < 60){
        hudPontos.innerHTML = "Voce morreu, sua pontuacao foi de: " + pontuacao;
        morreu = true;
        pontuacao = 0;
        pararJogo();

        cano.style.animation = 'none';
        cano.style.left = `${posicaoCano}px`;

        player.style.animation = 'none';
        player.style.bottom = `${posicaoPLayer}px`;
        player.src = 'assets/imgs/naruto-damage.png';

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