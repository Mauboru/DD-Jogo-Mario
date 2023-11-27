const player = document.querySelector('.player');
const obstaculo = document.querySelector('.obstaculo');
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
    const posicaoObstaculo = obstaculo.offsetLeft;
    const posicaoPLayer = parseFloat(getComputedStyle(player).bottom);

    if(posicaoObstaculo <= 100 && posicaoObstaculo > 0 && posicaoPLayer < 60){
        var audio = new Audio('assets/audios/snd-damage.wav');
        audio.addEventListener('canplaythrough', function() {
          audio.play();
        });
        hudPontos.innerHTML = "Voce morreu, sua pontuacao foi de: " + pontuacao;
        morreu = true;
        pontuacao = 0;
        pararJogo();

        obstaculo.style.animation = 'none';
        obstaculo.style.left = `${posicaoObstaculo}px`;

        player.style.animation = 'none';
        player.style.bottom = `${posicaoPLayer}px`;
        player.src = 'assets/imgs/naruto-damage.png';

        fimDeJogo.style.visibility = 'visible';
    }

    if (posicaoObstaculo <= 100 && posicaoObstaculo > 0 && posicaoPLayer > 60){
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

var audio = new Audio('assets/audios/audio.mp3');
audio.addEventListener('canplaythrough', function() {
  audio.play();
});