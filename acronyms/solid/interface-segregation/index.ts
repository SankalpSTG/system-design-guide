interface Workable {
  work(): void
}
interface Eatable{
  eat(): void
}
class HumanWorker implements Workable, Eatable{
  work(){
    console.log("Human is working")
  }
  eat(){
    console.log("Human is working")
  }
}

class RobotWorker implements Workable{
  work(){
    console.log("Robot is working")
  }
}