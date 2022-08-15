import Cards from './dbCards.js'
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'



// App config 

const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:cYLhb3yII8p6vVc9@cluster0.sqzupkw.mongodb.net/?retryWrites=true&w=majority'


//MiddleWears 
app.use(express.json())
app.use(Cors())



async function connect(){
    try{
        await mongoose.connect(connection_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected");
    }catch (err){
        console.log(`Error: ${err}`);

    }
}

connect()

//API EndPOints 



app.get("/", (req, res) => (
    res.status(200).send( "Hello Programmer")
) )



app.post("/tinder/cards", (req, res) => {
    const dbCards = req.body
    Cards.create(dbCards, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
           res.status(201).send(data)
        }
    })
})


app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
         res.status(200).send(data)
        }
    })

})




//Listner 

app.listen(port, () => console.log(`listening on local host ${port}`))

