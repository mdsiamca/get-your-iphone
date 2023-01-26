const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri =
  'mongodb+srv://weadmin:weadmin@123@risosi.3tdqpav.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    await client.connect()
    const database = client.db('ImagesAdd')
    const dataForDatavase = database.collection('imagesAdd')

    app.post('/sendData', async (req, res) => {
      const data = req.body
      const result = await dataForDatavase.insertOne(data)
      res.json(result)
    })
    app.get('/getData', async (req, res) => {
      const data = dataForDatavase.find({})
      const dataArray = await data.toArray()
      res.json(dataArray)
    })
  } finally {
    // await client.close()
  }
}
run().catch(console.dir)

//checking first time
app.get('/', (req, res) => {
  res.send('I am runing !')
})

app.listen(port, () => {
  console.log('listening at', port)
})
