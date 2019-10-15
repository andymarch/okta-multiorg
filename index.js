const express = require('express')
const bodyParser = require('body-parser')
const hooks = require('./hooks')
var router = express.Router();

const app = express()
app.use(bodyParser.json())

app.route('/').post(hooks.token_enrich)
app.route('/').get(hooks.token_enrich)

app.use(function(req,res){
  res.status(404).send({url: req.originalUrl + ' was not found'})
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log('app started on '+port))