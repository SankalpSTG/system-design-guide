class Bird{
  fly(){
    console.log("Flying")
  }
}

class Sparrow extends Bird{}

function makeBirdFly(bird: Bird){
  bird.fly()
}

const sparrow = new Sparrow()

makeBirdFly(sparrow)