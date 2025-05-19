import express, { response } from 'express'
import cors from 'cors'
import data1 from '../data/holding.json'
import data2 from '../data/capitalGain.json'


const app = express();
app.use(express.json())
app.use(cors())


app.get('/holding', async(req , res)=>{

    try{
        res.status(201).json({
            response : data1
        })
    } 
    catch(e){
        res.status(501).json({
            response : "Server Error"
        })
    }

})


app.get('/capitalGain', async(req , res)=>{

    try{
        res.status(201).json({
            response : data2
        })
    }
    catch(e){
        res.status(501).json({
            response : "Server Error"
        })
    }
})


app.listen(3000, ()=>{
    console.log("server is listining")
})

