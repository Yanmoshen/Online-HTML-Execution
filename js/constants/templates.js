// 内置模板
const TEMPLATES = {
    blank: {
        name: '空白模板',
        description: '从零开始',
        icon: '📄',
        category: 'basic',
        html: '',
        css: '',
        js: ''
    },
    
    html5: {
        name: 'HTML5 基础',
        description: '标准的HTML5页面结构',
        icon: '📝',
        category: 'basic',
        html: `<div class="container">
    <header>
        <h1>欢迎使用在线HTML编辑器</h1>
    </header>
    <main>
        <p>开始编写你的代码吧！</p>
    </main>
</div>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background: #f4f4f4;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

header {
    text-align: center;
    margin-bottom: 30px;
}

h1 {
    color: #333;
}`,
        js: `console.log('页面加载完成！');`
    },
    
    bootstrap: {
        name: 'Bootstrap 响应式',
        description: '使用Bootstrap的响应式布局',
        icon: '🎨',
        category: 'framework',
        html: `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container mt-5">
    <div class="row">
        <div class="col-md-8 mx-auto">
            <div class="card">
                <div class="card-header">
                    <h2>Bootstrap 示例</h2>
                </div>
                <div class="card-body">
                    <p class="lead">这是一个使用Bootstrap的响应式页面</p>
                    <button class="btn btn-primary" id="myBtn">点击我</button>
                </div>
            </div>
        </div>
    </div>
</div>`,
        css: `body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.card {
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}`,
        js: `document.getElementById('myBtn').addEventListener('click', function() {
    alert('Hello Bootstrap!');
});`
    },
    
    canvas: {
        name: 'Canvas 动画',
        description: '基础的Canvas动画示例',
        icon: '🎬',
        category: 'animation',
        html: `<canvas id="myCanvas"></canvas>`,
        css: `body {
    margin: 0;
    overflow: hidden;
    background: #000;
}

canvas {
    display: block;
}`,
        js: `const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;
const radius = 20;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制圆
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    
    // 边界检测
    if (x + dx > canvas.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - radius || y + dy < radius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;
    
    requestAnimationFrame(draw);
}

draw();

// 响应窗口大小变化
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});`
    },
    
    todolist: {
        name: 'Todo List',
        description: '简单的待办事项应用',
        icon: '✅',
        category: 'interactive',
        html: `<div class="todo-container">
    <h1>📝 我的待办事项</h1>
    <div class="input-group">
        <input type="text" id="todoInput" placeholder="添加新任务...">
        <button id="addBtn">添加</button>
    </div>
    <ul id="todoList"></ul>
</div>`,
        css: `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.todo-container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    min-width: 400px;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#todoInput {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
}

#addBtn {
    padding: 12px 24px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

#addBtn:hover {
    background: #5568d3;
}

#todoList {
    list-style: none;
    padding: 0;
}

.todo-item {
    padding: 15px;
    background: #f8f9fa;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
}

.todo-item:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.todo-item.completed {
    text-decoration: line-through;
    opacity: 0.6;
}

.delete-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.delete-btn:hover {
    background: #c82333;
}`,
        js: `const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = \`
        <span>\${text}</span>
        <button class="delete-btn">删除</button>
    \`;
    
    // 点击文本切换完成状态
    li.querySelector('span').addEventListener('click', function() {
        li.classList.toggle('completed');
    });
    
    // 删除按钮
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });
    
    todoList.appendChild(li);
    todoInput.value = '';
    todoInput.focus();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});`
    },
    
    countdown: {
        name: '倒计时器',
        description: '简单的倒计时器',
        icon: '⏰',
        category: 'interactive',
        html: `<div class="countdown-container">
    <h1>⏰ 倒计时器</h1>
    <div class="countdown-display">
        <div class="time-unit">
            <span class="time-value" id="hours">00</span>
            <span class="time-label">时</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
            <span class="time-value" id="minutes">00</span>
            <span class="time-label">分</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
            <span class="time-value" id="seconds">00</span>
            <span class="time-label">秒</span>
        </div>
    </div>
    <div class="controls">
        <button id="startBtn">开始</button>
        <button id="pauseBtn">暂停</button>
        <button id="resetBtn">重置</button>
    </div>
    <div class="input-group">
        <input type="number" id="minutesInput" placeholder="分钟" min="0" value="5">
        <input type="number" id="secondsInput" placeholder="秒" min="0" max="59" value="0">
    </div>
</div>`,
        css: `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.countdown-container {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 30px;
}

.countdown-display {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
}

.time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.time-value {
    font-size: 48px;
    font-weight: bold;
    color: #667eea;
    min-width: 80px;
    background: #f8f9fa;
    padding: 10px;
    border-radius: 10px;
}

.time-separator {
    font-size: 48px;
    color: #667eea;
    font-weight: bold;
}

.time-label {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}

.controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

#startBtn {
    background: #28a745;
    color: white;
}

#pauseBtn {
    background: #ffc107;
    color: white;
}

#resetBtn {
    background: #dc3545;
    color: white;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.input-group {
    display: flex;
    gap: 10px;
    justify-content: center;
}

input {
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    width: 100px;
}`,
        js: `let totalSeconds = 300;
let remainingSeconds = totalSeconds;
let interval = null;

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

function updateDisplay() {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

function start() {
    if (interval) return;
    
    interval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
        } else {
            pause();
            alert('时间到！');
        }
    }, 1000);
}

function pause() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    pause();
    const mins = parseInt(minutesInput.value) || 0;
    const secs = parseInt(secondsInput.value) || 0;
    totalSeconds = mins * 60 + secs;
    remainingSeconds = totalSeconds;
    updateDisplay();
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

updateDisplay();`
    }
};