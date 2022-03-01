import mongoose from "mongoose"

// Connect to the mongodb database
dbConnect().catch(err => console.log(err))

let Post = {}

async function dbConnect() {
  await mongoose.connect("mongodb+srv://apartmentsFinal:final@cluster0.xxzwj.mongodb.net/aptData?retryWrites=true&w=majority")
  console.log("connected to the database!")

  const postSchema = new mongoose.Schema({
    placeName: String,
    area: String,
    size: Number, 
    distanceAway: Number,
    price: Number,
    description: String,
    leasingterm: Number
  })

  Post.User = mongoose.model('User', postSchema)

  console.log("created db schemas and models")
}

export default Post;