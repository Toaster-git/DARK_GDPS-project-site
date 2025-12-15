// class CubeAnimation {
//     constructor() {
//         this.canvas = document.getElementById('cubeCanvas');
//         this.ctx = this.canvas.getContext('2d');
//         this.cubes = [];
//         this.lastTime = 0;
//         this.frameCount = 0;
//         this.init();
//     }
    
//     init() {
//         this.resizeCanvas();
//         window.addEventListener('resize', () => this.resizeCanvas());
//         this.createCubes();
//         this.animate(0);
//     }
    
//     resizeCanvas() {
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
//     }
    
//     createCubes() {
//         this.cubes = [];
//         const cubeCount = Math.min(20, Math.floor(window.innerWidth / 100));
        
//         for (let i = 0; i < cubeCount; i++) {
//             this.cubes.push({
//                 x: Math.random() * this.canvas.width,
//                 y: Math.random() * this.canvas.height,
//                 size: 20 + Math.random() * 40,
//                 speedX: 1 + Math.random() * 2,
//                 color: this.getRandomColor(),
//                 rotation: Math.random() * Math.PI * 2,
//                 rotationSpeed: (Math.random() - 0.5) * 0.05,
//                 jumpHeight: 100 + Math.random() * 200,
//                 jumpSpeed: 0.02 + Math.random() * 0.03,
//                 jumpPhase: Math.random() * Math.PI * 2,
//             });
//         }
//     }
    
//     getRandomColor() {
//         const colors = ['#00FF00', '#FFD700', '#FF4500', '#00FFFF', '#FF00FF', '#FFFF00'];
//         return colors[Math.floor(Math.random() * colors.length)];
//     }
    
//     drawCube(cube) {
//         this.ctx.save();
//         this.ctx.translate(cube.x, cube.y);
//         this.ctx.rotate(cube.rotation);
        
//         // Основной куб
//         this.ctx.fillStyle = cube.color;
//         this.ctx.fillRect(-cube.size/2, -cube.size/2, cube.size, cube.size);
        
//         // Контур и декоративные линии
//         this.ctx.strokeStyle = '#FFFFFF';
//         this.ctx.lineWidth = 2;
//         this.ctx.strokeRect(-cube.size/2, -cube.size/2, cube.size, cube.size);
        
//         // Диагональные линии
//         this.ctx.lineWidth = 1;
//         this.ctx.beginPath();
//         this.ctx.moveTo(-cube.size/2, -cube.size/2);
//         this.ctx.lineTo(cube.size/2, cube.size/2);
//         this.ctx.stroke();
        
//         this.ctx.beginPath();
//         this.ctx.moveTo(cube.size/2, -cube.size/2);
//         this.ctx.lineTo(-cube.size/2, cube.size/2);
//         this.ctx.stroke();
        
//         // Центральная точка
//         this.ctx.fillStyle = '#FFFFFF';
//         this.ctx.beginPath();
//         this.ctx.arc(0, 0, cube.size/10, 0, Math.PI * 2);
//         this.ctx.fill();
        
//         this.ctx.restore();
//     }
    
//     updateCube(cube, deltaTime) {
//         cube.rotation += cube.rotationSpeed;
//         cube.x += cube.speedX;
        
//         // Легкое вертикальное движение
//         cube.y += Math.sin(Date.now() * 0.001 + cube.x * 0.01) * 0.5;
        
//         // Возврат кубика при выходе за границы
//         if (cube.x > this.canvas.width + cube.size) {
//             cube.x = -cube.size;
//             cube.y = Math.random() * this.canvas.height;
//         }
        
//         // Ограничение по вертикали
//         if (cube.y < -cube.size) {
//             cube.y = this.canvas.height;
//         } else if (cube.y > this.canvas.height + cube.size) {
//             cube.y = -cube.size;
//         }
        
//         // Случайные изменения
//         if (Math.random() < 0.005) cube.speedX = 1 + Math.random() * 2;
//         if (Math.random() < 0.002) cube.color = this.getRandomColor();
//     }
    
//     animate(timestamp) {
//         const deltaTime = timestamp - this.lastTime || 0;
//         this.lastTime = timestamp;
//         this.frameCount++;
        
//         // Полупрозрачный фон для эффекта шлейфа
//         this.ctx.fillStyle = 'rgba(26, 15, 43, 0.05)';
//         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
//         // Обновление и отрисовка кубов
//         this.cubes.forEach(cube => {
//             this.updateCube(cube, deltaTime);
//             this.drawCube(cube);
//         });
        
//         // Периодическое добавление новых кубов
//         if (this.frameCount % 300 === 0 && this.cubes.length < 30) {
//             this.cubes.push({
//                 x: Math.random() * this.canvas.width,
//                 y: -50,
//                 size: 20 + Math.random() * 40,
//                 speedY: 2 + Math.random() * 4,
//                 speedX: (Math.random() - 0.5) * 2,
//                 color: this.getRandomColor(),
//                 rotation: Math.random() * Math.PI * 2,
//                 rotationSpeed: (Math.random() - 0.5) * 0.05,
//                 jumpHeight: 100 + Math.random() * 200,
//                 jumpSpeed: 0.02 + Math.random() * 0.03,
//                 jumpPhase: Math.random() * Math.PI * 2,
//                 isJumping: true
//             });
//         }
        
//         requestAnimationFrame((ts) => this.animate(ts));
//     }
// }

// // Инициализация при загрузке страницы
// window.addEventListener('load', () => new CubeAnimation());