const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
// 紀錄上次隨機的地洞
let lastHole;
// 遊戲時間是否已經到達
let timeUp = false;
// 遊戲得分
let score = 0;
/**
 * 地鼠出現的時間
 * @param {*} min
 * @param {*} max
 */
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * 隨機出現地鼠的地洞
 * @param {*} holes
 */
function randomHole(holes) {
  // holes 是陣列，由 0 開始，所以利用 random 直接設定 random 範圍
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // 隨機有可能重複的地洞，所以建立變數排除重複
  if (hole === lastHole) {
    console.log("Ah nah thats the same one bud");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 * 地鼠出現
 */
function peep() {
  // 地鼠出現的隨機時間
  const time = randomTime(500, 2000);
  // 地鼠出現的隨機地洞
  const hole = randomHole(holes);
  // 變更該地洞的地鼠樣式，讓其顯示
  hole.classList.add("up");
  // 地鼠出現的時間
  setTimeout(() => {
    hole.classList.remove("up");
    // 讓地鼠出現連續，遊戲時間到則停止
    if (!timeUp) peep();
  }, time);
}

/**
 * 遊戲開始
 */
function startGame() {
  // 分數版歸 0
  scoreBoard.textContent = 0;
  // 遊戲時間標示
  timeUp = false;
  // 遊戲得分歸 0
  score = 0;
  // 地鼠開始出現
  peep();
  // 遊戲截止時間
  setTimeout(() => (timeUp = true), 10000);
}

/**
 * 打擊地鼠後得分
 * @param {*} e
 */
function bonk(e) {
  // 判斷是否真的使用滑鼠點擊
  if (!e.isTrusted) return; // cheater!
  // 分數 + 1
  score++;
  // 移除地鼠顯示
  this.parentNode.classList.remove("up");
  // 顯示得分
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));