const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const scoreId = document.getElementById('scoreId');

let score = 0;
let isGameOver = false;

function jump() {
    if (!isGameOver) {
        let playerTop = parseInt(player.style.top) || 50;
        player.style.top = `${Math.max(0, playerTop - 50)}px`;
    }
}

document.addEventListener('keydown', jump);

function getRandomHeight() {
    return Math.floor(Math.random() * (780 - 200 + 1)) + 200;
}

function update() {
    const enemyRight = parseInt(enemy.style.right) || 0;

    if (enemyRight > window.innerWidth) {
        enemy.style.right = '0';
        enemy.style.height = `${getRandomHeight()}px`;
        score++;
        scoreId.innerText = `Score: ${score}`;
    } else {
        enemy.style.right = `${enemyRight + 5}px`;
    }

    if (isCollision()) {
        alert('Game Over! Final Score: ' + score);
        isGameOver = true;
    }
}

function isCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    return (
        playerRect.right > enemyRect.left &&
        playerRect.left < enemyRect.right &&
        playerRect.bottom > enemyRect.top &&
        playerRect.top < enemyRect.bottom
    );
}

setInterval(update, 100);
