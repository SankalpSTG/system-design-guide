/**
 * The below class does not follow Single Responsibility Principle 
 * Single Responsibility Principle states that a class should have only one reason to change.
 * In below case, the Printer is handling printing as well as scanning.
 * So in case if any of the logic changes, the class has to change.
 * So there are two reasons for the class to change.
 */
class Printer{
  print(){
    console.log("Printing")
  }
  scan(){
    console.log("Scanning")
  }
}
/**
 * In below case, the Printr is handling Print and the Scanner is handling Scan.
 * So there is only one reasons for the classes to change.
 * Hence this follows Single Responsibility Principle.
 */
class Printr{
  print(){
    console.log("Printing")
  }
}
class Scanner{
  scan(){
    console.log("Scanning")
  }
}
/**
 * In below case, the MultiFunctionMachine class is dependent on the Printr and Scanner classes.
 * So even in any case of change in logic, the MultiFunctionMachine class will not change, but the Printr or Scanner classes will change
 * Hence this as well follows Single Responsibility Principle.
 */
class MultiFunctionMachine{
  private readonly printer: Printr
  private readonly scanner: Scanner
  constructor(printer: Printr, scanner: Scanner){
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