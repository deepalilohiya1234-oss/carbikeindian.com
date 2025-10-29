   const canvas = document.getElementById('gameCanvas');
   const ctx = canvas.getContext('2d');
   const scoreEl = document.getElementById('score');

   let car = { x: 100, y: 300, width: 50, height: 30 };
   let obstacles = [];
   let score = 0;
   let gameRunning = true;

   // Draw car
   function drawCar() {
       ctx.fillStyle = 'red';
       ctx.fillRect(car.x, car.y, car.width, car.height);
   }

   // Draw obstacles (e.g., cows, trucks)
   function drawObstacles() {
       ctx.fillStyle = 'brown';
       obstacles.forEach(ob => ctx.fillRect(ob.x, ob.y, ob.width, ob.height));
   }

   // Update game
   function update() {
       if (!gameRunning) return;

       // Move obstacles left
       obstacles.forEach(ob => ob.x -= 5);
       obstacles = obstacles.filter(ob => ob.x > -50);

       // Add new obstacles randomly
       if (Math.random() < 0.02) {
           obstacles.push({ x: 800, y: 300, width: 50, height: 30 }); // Example: cow
       }

       // Check collisions
       obstacles.forEach(ob => {
           if (car.x < ob.x + ob.width && car.x + car.width > ob.x &&
               car.y < ob.y + ob.height && car.y + car.height > ob.y) {
               gameRunning = false;
               alert('Crash! Game Over. Score: ' + score);
           }
       });

       score++;
       scoreEl.textContent = 'Score: ' + score;
   }

   // Handle input
   document.addEventListener('keydown', (e) => {
       if (e.key === 'ArrowLeft' && car.x > 0) car.x -= 10;
       if (e.key === 'ArrowRight' && car.x < canvas.width - car.width) car.x += 10;
       if (e.key === ' ') car.y -= 50; // Jump
   });

   // Game loop
   function gameLoop() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       drawCar();
       drawObstacles();
       update();
       requestAnimationFrame(gameLoop);
   }

   gameLoop();
   