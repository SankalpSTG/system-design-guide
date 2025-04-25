abstract class Database {
  abstract insert<T=any>(data: T | T[]): void
}


class MongoDB extends Database{
  insert<T=any>(data: T | T[]){
    console.log("Inserting Data in MongoDB")
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

const app = new Application(new MongoDB())

app.saveInDb({
  name: "Halo"
})