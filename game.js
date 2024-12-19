const fruits = ['🍒', '🍓', '🍇', '🍎', '🍉', '🍑', '🍊', '🍋', '🍍', '🍌', '🥑', '🍈', '🍐', '🥝', '🥭', '🥥', '🫐'];
const gameBoard = document.getElementById('gameBoard');
const basket = document.getElementById('basket');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// 游戏状态
let score = 0;
let timeLeft = 60; // 设置倒计时时间为60秒
let gameInterval;
let fruitInterval;

// 创建水果并让它们掉落
function createFruit() {
    const fruit = document.createElement('div');
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    fruit.textContent = randomFruit;
    fruit.classList.add('fruit');
    fruit.style.left = ${Math.random() * 100}%; // 随机水平位置
    fruit.style.top = '0%'; // 初始位置在画面顶部
    gameBoard.appendChild(fruit);

    const fallInterval = setInterval(() => {
        let currentTop = parseFloat(fruit.style.top || 0);
        if (currentTop < 95) {
            fruit.style.top = ${currentTop + 1}%;
        } else {
            // 当水果掉到接近底部时，检查是否与篮子碰撞
            if (isCollision(fruit)) {
                score++;
                scoreElement.textContent = Score: ${score};
                document.getElementById('catchSound').play(); // 播放捕捉音效
                fruit.remove(); // 捕捉成功后移除水果
            } else {
                fruit.remove(); // 未捕捉到的水果移除
            }
        }
    }, 20);
}

// 判断水果是否与篮子碰撞
function isCollision(fruit) {
    const fruitRect = fruit.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    return !(fruitRect.bottom < basketRect.top || fruitRect.top > basketRect.bottom || fruitRect.right < basketRect.left || fruitRect.left > basketRect.right);
}

// 更新倒计时
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = Time: ${timeLeft};
    } else {
        clearInterval(gameInterval);
        clearInterval(fruitInterval);
        alert(Game Over! Your final score is ${score});
    }
}

// 每秒更新一次倒计时
setInterval(updateTimer, 1000);

// 设置滑动控制篮子移动
let startX = 0;

gameBoard.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

gameBoard.addEventListener('touchmove', (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - startX;
    const basketLeft = parseFloat(basket.style.left || 0);
    const newLeft = basketLeft + deltaX;
    
    if (newLeft >= 0 && newLeft <= gameBoard.offsetWidth - basket.offsetWidth) {
        basket.style.left = ${newLeft}px;
    }
    
    startX = touchX; // 更新触摸位置
});

// 音乐控制
window.onload = function () {
    document.getElementById('backgroundMusic').play(); // 播放背景音乐
};

// 开始游戏
gameInterval = setInterval(createFruit, 1000);
fruitInterval = setInterval(createFruit, 1000);
