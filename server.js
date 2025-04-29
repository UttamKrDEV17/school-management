import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import schoolRouter from './routes/schoolRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())

app.use('/v1',schoolRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})