(function(){
    const can = document.querySelector("canvas");
    const ctx = can.getContext("2d");

    let width = can.width = window.innerWidth;
    let height = can.height = window.innerHeight;
    let balls = [];
    let ballNumber = 25;


    /**
     * 
     * @param {number} min 
     * @param {number} max 
     */
    function random(min,max){
        return Math.floor(Math.random()*(max-min)) + min;
    }

    function randomColor(){
        return 'rgba(' +
                random(0,255) + "," + 
                random(0,255) + "," + 
                random(0,255) + "," + 
                0.5 + ")";
    }
 
    /**
     * 
     * @param {number} x 坐标 
     * @param {number} y 坐标
     * @param {number} velX 水平速度
     * @param {number} velY 垂直速度
     * @param {color} color 颜色
     * @param {number} size 大小
     */
    function Ball(x,y,velX,velY,color,size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    Ball.prototype.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        return this;
    }

    Ball.prototype.update = function(){
        if((this.x + this.size) >= width || (this.x - this.size) <= 0){
            this.velX *= -1;
        }

        if((this.y + this.size) >= height || (this.y - this.size) <= 0){
            this.velY *= -1;
        }
        this.x += this.velX;
        this.y += this.velY; 
        return this;
    }

    Ball.prototype.collisionDetect = function(){
        for(let i = 0;i < ballNumber;i ++){
            if(this !== balls[i]){
                const dx = this.x - balls[i].x;
                const dy = this.y - balls[i].y;
                const distance = Math.sqrt(dx * dx +dy * dy);

                if(distance < this.size + balls[i].size){
                    this.velX *= -1;
                    this.vely *= -1;
                    balls[i].velX *= -1;
                    balls[i].velY *= -1;
                    balls[i].color = this.color = randomColor();  
                }
            }
        }
        return this;
    }

    for(let i = 0;i < ballNumber;i ++){
        let size = random(10,20);
        let ball = new Ball(
            // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-8, 8),
            random(-8, 8),
            randomColor(),
            size
          );
        balls.push(ball);
    }

    function loop(){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0,0,width,height);

        for(let i = 0;i < ballNumber;i ++){
            balls[i].draw().update().collisionDetect();
        }
        
        requestAnimationFrame(loop);
    }

    loop();
}())

