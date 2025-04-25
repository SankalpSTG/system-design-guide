# SOLID Principles

These are 5 Principles which form the base of system design.
1. Single Responsibility Principle
2. Open / Closed Principle
3. Liskov Substitution Principle
4. Interface Segregation Principle
5. Dependency Inversion Principle

## Single Responsibility Principle
```
A class should have one and only one reason to change, meaning that a class should have only one job.
```
Let's look at below example
```typescript
class Printer{
  print(){
    console.log("Printing")
  }
  scan(){
    console.log("Scanning")
  }
}
```
In this example, the class Printer has two functions, Print and Scan. Both of these functions have separate functionality. Hence the Printer class has to be updated if there is a change in printing logic as well as scanning logic. So basically the class has two reasons to change. Hence it does not follow Single Responsibility Principle

Now look a the below example
```typescript
class Printer{
  print(){
    console.log("Printing")
  }
}
class Scanner{
  scan(){
    console.log("Scanning")
  }
}
```
In this example, we have created a separate Scanner class and hence now the Printer as well as Scanner class have only one responsibility and only one reason to change.

Now look at the below example
```typescript
class MultiFunctionMachine{
  private readonly printer: Printer
  private readonly scanner: Scanner
  constructor(printer: Printer, scanner: Scanner){
    this.printer = printer
    this.scanner = scanner
  }
  print(){
    this.printer.print()
  }
  scan(){
    this.scanner.scan()
  }
}
```
In this example, we still have separate Printer and Scanner classes but we have added them as a dependency to the MultiFunctionMachine class. Now in case if there is any change in printing or scanning logic, only that specific class will be changed however there will be no change in MultiFunctionMachine class. Hence all three of these follow Single Responsibility Principle.

## Open / Closed Principle
```
Objects or entities should be open for extension but closed for modification.
```
Look at the below example
```typescript
class AreaCalculator {
  calculateArea(shape: any) {
    if (shape.type === "circle") {
      return Math.PI * shape.radius * shape.radius;
    } else if (shape.type === "rectangle") {
      return shape.width * shape.height;
    }
  }
}
```
In this example, we have created an AreaCalculator class which has a calculateArea function. Now this function accepts a shape and initially we have only two shapes which is circle and rectangle. So we run an ```if-else ``` condition to return the area for each shape accordingly.

However as we add more shapes, we will have to again and again modify the calculateArea function. 

Imagine this class is already on production, new shapes and some errors into them can introduce bugs in the existing functionality.

Open Closed Principle suggest that you can extend previous functionality but you shouldn't modify it. Hence this class does not follow Open Closed Principle.

Now look at following example:
```typescript
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
```
In the above example, we created an interface and then all shapes will implement that interface. In case a new shape is to be added, a new class can be created which implements the shape interface.

This way you are not modifying any existing classes.

## Liskov Substitution Principle
```
Subclasses should be substitutable for their Base classes. 
```
Look at the below example
```typescript
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
```
In this example, we were able to replace Bird with Sparrow because even Sparrow can fly. This is what the principle says. 

Child Objects should be able to take place of Parent Objects or we could say Child Objects should be substitutable for the Parent Objects. In this case Parent is Bird and Child is Sparrow

A bad example could be
```typescript
class Ostrich extends Bird {
  fly() {
    throw new Error("Ostriches can't fly!");
  }
}
```
Now Ostrich cannot take Bird's place as Ostrich cannot fly.

To tackle this, we can have two classes, one for flying birds and other for birds that cannot fly.


## Interface Segregation Principle
```
A client should never be forced to implement an interface that it doesn’t use, or clients shouldn’t be forced to depend on methods they do not use.
```
Look an this example
```typescript
interface Workr {
  work(): void
  eat(): void
}

class HumanWorker implements Workr{
  work(){
    console.log("Human is working")
  }
  eat(){
    console.log("Human is working")
  }
}

class RobotWorker implements Workr{
  work(){
    console.log("Robot is working")
  }
  eat(){
    console.log("Robot cannot eat")
  }
}
```
The problem with above code is the RobotWorker is forced to implement the eat() function which it can't beacause robots do not eat. Basically not all workers eat.

So technically the interface is wrong.

To make it correct, we can split it into two interfaces as follows
```typescript
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
```
Now the RobotWorker implements Workable interface which only has work() method and hence there is no unnecessary functions implemented.

Hence this follows Interface Segregation Principle.
## Dependency Inversion
```
Entities must depend on abstractions, not on concretions. It states that the high-level module must not depend on the low-level module, but they should depend on abstractions.
```
Look at the example below
```typescript
class MongoDB{
  insert<T=any>(data: T | T[]){
    console.log("Inserting Data in MongoDB")
    console.log(data)
  }
}

class Application{
  private readonly database: MongoDB
  constructor(database: MongoDB){
    this.database = database
  }
  saveInDb(data: any){
    this.database.insert(data)
  }
}
```
The application class depends directly on MongoDB. In case you wish to change MongoDB with something else, then the Application class has to change.

Instead, we can create an interface for Database
```typescript
abstract class Database {
  abstract insert<T=any>(data: T | T[]): void
}
```
And we will make MongoDB implement it
```typescript
class MongoDB extends Database{
  insert<T=any>(data: T | T[]){
    console.log("Inserting Data in MongoDB")
    console.log(data)
  }
}
```
And we will make Application depend on the interface instead of MongoDB directly
```typescript
class Application{
  private readonly database: Database
  constructor(database: Database){
    this.database = database
  }
  saveInDb(data: any){
    this.database.insert(data)
  }
}
```
In this case, even if you change MongoDB to Cassandra or any other database, the funcionality won't break
```typescript
abstract class Database {
  abstract insert<T=any>(data: T | T[]): void
}

class MongoDB extends Database{
  insert<T=any>(data: T | T[]){
    console.log("Inserting Data in MongoDB")
    console.log(data)
  }
}

class Cassandra extends Database{
  insert<T=any>(data: T | T[]){
    console.log("Inserting Data in Cassandra")
    console.log(data)
  }
}

class Application{
  private readonly database: Database
  constructor(database: Database){
    this.database = database
  }
  saveInDb(data: any){
    this.database.insert(data)
  }
}
```
