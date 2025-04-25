interface Shape{
  calculateArea: () => void
}

class Rectangle implements Shape{
  constructor(private readonly length: number, private readonly width: number){}
  calculateArea(){
    return this.length * this.width
  }
}

class Circle implements Shape{
  constructor(private readonly radius: number){}
  calculateArea(){
    return Math.PI * this.radius * this.radius
  }
}

class Triangle implements Shape{
  constructor(private readonly base: number, private readonly height: number){}
  calculateArea(){
    return this.base * this.height * 0.5
  }
}