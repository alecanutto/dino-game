const dino = document.querySelector('.dino');
const score = document.querySelector('.score');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let count = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {

        if (!isJumping) jump();

        //inicia jogo
        if (count === 0) {
            background.style.backgroundRepeat = "repeat-x";
            background.style.animation = "slideRight 600s infinite linear"
            createCactus();

            var xCount = setInterval(() => {

                if (isGameOver) {
                    clearInterval(xCount);                    
                    return;
                }

                count++;
                score.innerHTML = "Pontuação: " +  ("0000" + count).slice(-4);

                if (dino.style.backgroundImage.toString().indexOf("images/t-rex3.png") > -1) {
                    dino.style.backgroundImage = "url('./images/t-rex4.png')";
                } else {
                    dino.style.backgroundImage = "url('./images/t-rex3.png')";
                }

            }, 300);

        }
    }
}

function jump() {
    if (isGameOver) return
    isJumping = true;
    dino.style.backgroundImage = "url('./images/t-rex1.png')";

    let upInterval = setInterval(() => {
        if (position >= 150) {
            //descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1200;
    let randomTime = Math.random() * 6500;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if (cactusPosition < 0) {
            //saiu da tela
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60 && !isJumping) {
            //game over
            isGameOver = true;
            clearInterval(leftInterval);
            dino.style.backgroundImage = "url('./images/t-rex5.png')";
            background.style.backgroundRepeat = "none";
            background.style.animation = "none";
            const info = document.createElement('div');
            info.innerHTML = '<h1 class="game-over">Fim de jogo<h1>';
            document.body.appendChild(info);            
        } else {
            //move cactus
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);

}


document.addEventListener('keyup', (handleKeyUp));

