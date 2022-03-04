import mongoose from "mongoose"

// Connect to the mongodb database
dbConnect().catch(err => console.log(err))

let db = {}

async function dbConnect() {
  await mongoose.connect("mongodb+srv://apartmentsFinal:final@cluster0.xxzwj.mongodb.net/aptData?retryWrites=true&w=majority")
  console.log("connected to the database!")

  const apartmentSchema = new mongoose.Schema({
    placeName: String,
    area: String,
    size: Number,
    distanceAway: Number,
    price: Number,
    description: String,
    leasingterm: Number
  })
  db.Apartment = mongoose.model('Apartment', apartmentSchema)

  const userSchema = new mongoose.Schema({
    username: String,
    saved: [String],
    saved_date: Date
  })

  db.User = mongoose.model('User', userSchema)

  console.log("created db schemas and models")
}

export default db;