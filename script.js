window.onload = () => {
    alert("Click on screen to increase size, swipe in any direction to move.")
    var gamecanvas = document.getElementById("game");
    
    var image = document.createElement("img");
    image.src = "https://i.ibb.co/6Hccn4F/1707882695942.png";
        
    gamecanvas.height = window.innerHeight;
    gamecanvas.width = window.innerWidth;
    
    var game = gamecanvas.getContext('2d');
    
    game.fillStyle = 'rgb(0,100,0)';
    game.strokeStyle = "white";
    game.lineWidth = 1;
    game.stroke()
    
    var s = 3; // speed
    var score = 0;
    
    var snake = [{ x: 60, y: 0, d: 2 }, { x: 30, y: 0, d: 2}, { x: 0, y: 0, d: 2}];
    
    var eggx = 0;
    var eggy = 0;
    var scoreB = document.getElementById("score");
    
    dropEgg();
    /*
    values for d (direction):
    1 : up ↑
    2 : right →
    3 : down ↓
    4 : left ←
    */
    
    //setInterval(frame,200);
    frame()
    
    var isGO = false;
    
    function frame() {
    
        s+=0.0001;
    
        if(!isGO)
        requestAnimationFrame(frame);
        
        for(let i=0;i<snake.length;i++) {
           if(snake[i].y>innerHeight)
              snake[i].y=-30;
           if(snake[i].x>innerWidth)
              snake[i].x=-30;
           if(snake[i].y<-30)
              snake[i].y=innerHeight;
           if(snake[i].x<-30)
              snake[i].x=innerWidth;
           
           if(i>0) {
           
           if(i!=1) {
               var xs = snake[0].x;
               var ys = snake[0].y;
               var hd = snake[0].d;
               var nxs = snake[i].x;
               var nys = snake[i].y;
               
               //head.innerHTML = "Head: "+xs+", "+ys;
               if(((eggx>=xs || eggx+15>=xs) && (eggx<=xs+30 || eggx+15<=xs+30)) && ((eggy>=ys || eggy+15>=ys) && (eggy<=ys+30 || eggy+15<=ys+30))) {
                       expand();
                       dropEgg();
                       s+=0.1;
                       score++;
                       scoreB.innerHTML = "Score: "+score;
               }
               
               
               if(snake.length>3) {
               if(((nxs>=xs || nxs>=xs) && (nxs<=xs+30 || nxs<=xs+30)) && ((nys>=ys || nys>=ys) && (nys<=ys+30 || nys<=ys+30))) {
                   isGO = true
                   alert("You lost :-(\nYour Score: "+score);
                   
               }
               } else if(hd==1 || hd==4) {
                   
               }
           }
               if(snake[i-1].d != snake[i].d) {
                    push(snake[i-1],snake[i]);
               }
           }
        }
        game.clearRect(0,0,innerWidth,innerHeight);
        for (let i = 0; i < snake.length; i++) { 
            game.strokeRect(snake[i].x, snake[i].y, 30, 30);
            if(i==0) {
            let hd = snake[0].d;
            var r = Math.PI;
            if(hd==2) {
                r = -Math.PI/2;
            } else if(hd==3) {
                r = 0;
            } else if(hd==4) {
                r = Math.PI/2;
            }
           game.save();
    game.translate(snake[0].x + 15, snake[0].y + 15);
    game.rotate(r);
    game.drawImage(image, -15, -15, 30, 30); 
    game.restore();
            }
            else {
            game.fillStyle = 'rgb(0,100,0)';
            game.fillRect(snake[i].x, snake[i].y, 30, 30);
            }

            let p = snake[i];
            if(p.d == 1) {
                snake[i].y -= s;
            } else if(p.d == 2) {
                snake[i].x += s;
            } else if(p.d == 3) {
                snake[i].y += s;
            } else if(p.d == 4) {
                snake[i].x -= s;
            }
            
        }
        
        
        
        game.fillStyle = "#fff";
        game.beginPath();
        game.arc(eggx,eggy,10,0,Math.PI*2,false);
        game.fill();
    }
    
    function dropEgg() {
        eggx = Math.ceil(Math.random()*(window.innerWidth-30))+30;
        eggy = Math.ceil(Math.random()*(window.innerHeight-30))+30;
        //egg.innerHTML = "Egg: "+eggx+", "+eggy;
    }
    
    function push(f, l) {
        if(f.d==1) {
            if(l.d==2 && f.y<=l.y-30) {
                l.x = f.x;
                //
                l.d = f.d;
            } else if(l.d==4 && f.y<=l.y-30) {
                l.x = f.x; 
                //l.y = f.y+30;
                l.d = f.d;
            }
        }
        else if(f.d==2) {
            if(l.d==1 && f.x>=l.x+30) {
                l.y = f.y;
                //
                l.d = f.d;
            } else if(l.d==3 && f.x>=l.x+30) {
                l.y = f.y;
                //l.x = f.x-30;
                l.d = f.d;
            }
        }
        //l.d = f.d;
        else if(f.d==3) {
            if(l.d==2 && f.y>=l.y+30) {
                l.x = f.x; 
                //l.y = f.y-30;
                l.d = f.d;
            } else if(l.d==4 && f.y>=l.y+30) {
                l.x = f.x; 
                //l.y = f.y-30;
                l.d = f.d;
            }
        }
        else if(f.d==4) {
            if(l.d==1 && f.x<=l.x-30) {
                l.y = f.y;
                //l.x = l.x+30;
                l.d = f.d;
            } else if(l.d==3 && f.x<=l.x-30) {
                l.y = f.y;
                //l.x = l.x+30;
                l.d = f.d;
            }
        }
    }
    
    function expand() {
        
        let last = snake[snake.length - 1];
        let ld = last.d;
        if(ld==1) {
            snake.push({ x: last.x, y: last.y+30, d: last.d  });
        } else if(ld==2) {
            snake.push({ x: last.x-30, y: last.y, d: last.d  });
        } else if(ld==3) {
            snake.push({ x: last.x, y: last.y-30, d: last.d  });
        } else if(ld==4) {
            snake.push({ x: last.x+30, y: last.y, d: last.d  });
        }
        
    }
    
    var touchstartX, touchstartY;
var swipeOccurred = false;

gamecanvas.addEventListener("touchstart", function (e) {
    touchstartX = e.touches[0].clientX;
    touchstartY = e.touches[0].clientY;
    swipeOccurred = false;
});

gamecanvas.addEventListener("touchmove", function (e) {
    e.preventDefault();

    var touchendX = e.touches[0].clientX;
    var touchendY = e.touches[0].clientY;

    var deltaX = touchendX - touchstartX;
    var deltaY = touchendY - touchstartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && !swipeOccurred) {
            //console.log("Swipe right");
            swipeOccurred = true;
            if(snake[0].d!=2 && snake[0].d!=4)
            snake[0].d = 2;
            
        } else if (deltaX < 0 && !swipeOccurred) {
            //console.log("Swipe left");
            swipeOccurred = true;
            if(snake[0].d!=2 && snake[0].d!=4)
            snake[0].d = 4;
        }
    } else {
        if (deltaY > 0 && !swipeOccurred) {
            //console.log("Swipe down");
            swipeOccurred = true;
            if(snake[0].d!=1 && snake[0].d!=3)
            snake[0].d = 3;
        } else if (deltaY < 0 && !swipeOccurred) {
            //console.log("Swipe up");
            swipeOccurred = true;            if(snake[0].d!=1 && snake[0].d!=3)
            snake[0].d = 1;
        }
    }
});
function arrowClick(event) {
      switch (event.key) {
        case 'ArrowUp':
          if(snake[0].d!=1 && snake[0].d!=3)
          snake[0].d = 1;
          break;
        case 'ArrowDown':
          if(snake[0].d!=1 && snake[0].d!=3)
          snake[0].d = 3;
          break;
        case 'ArrowLeft':
          if(snake[0].d!=2 && snake[0].d!=4)
          snake[0].d = 4;
          break;
        case 'ArrowRight':
          if(snake[0].d!=2 && snake[0].d!=4)
          snake[0].d = 2;
          break;
        default:
          break;
    }
}

document.addEventListener('keydown', arrowClick);

gamecanvas.addEventListener("touchend", function (e) {
    touchstartX = null;
    touchstartY = null;
});
}
