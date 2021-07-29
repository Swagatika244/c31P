class Stone{
    constructor(x, y, r){
        var opt ={
            restitution:0.1,
            airFriction:0.1
        }
        this.image =loadImage("assets/stone.png");
        this.body = Bodies.circle(x, y, r/2, opt);
        this.r = r;
        World.add(world, this.body);
       // stones.push(this.body);
    }show(){
        const pos = this.body.position;
        const angle = this.body.angle; 
        push();
        fill(255);
        noStroke();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.r, this.r);
        pop();
    }
}