const express = require('express')
const morgan =  require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemon = require('nodemon')


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const axios = require('axios')


app.post('/buscacep', async(req,res) => {
    const value = JSON.parse(JSON.stringify(req.body.value))
    
    var cep_bl = true 
    var message = ""
    var aux = value.replace('-','')
    var aux = parseInt(aux)
    var cep = aux.toString()
    
    
    console.log(cep)
    if (cep.length != 8) {
            cep_bl = false
            message = "O valor digitado não é um cep valido"
    } else {
        cep_bl = true
        var message = ""
    }

    if (cep_bl == true) {
        
        const {data} = await axios('https://viacep.com.br/ws/'+ cep + '/json')
        console.log(data)
        if (data.cep == undefined ) {
            message = "Endereço não localizado"
            return res.json(({message}))
        } else {
            return res.json(data) 
        }
           
    } else {
        return res.json(({message}))
    }
    
})

app.listen(3000, () => {
    console.log('Exprex started at http://localhost:3000')
})
