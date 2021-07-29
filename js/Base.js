class Base{
    constructor(x, y, w, h){
        this.w = w;
        this.h = h;
        var options ={
            isStatic:true
        }
        this.body = Bodies.rectangle(x, y, w, h, options)
        World.add(world, this.body);
    }

    show (){
        const pos = this.body.position;
        const angle = this.body.angle
        push ();
        fill(255);
        noStroke();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop ();
    }
}