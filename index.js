const express = require('express')
const bodyParser = require('body-parser')
const hooks = require('./hooks')

const app = express()
const port = process.env.PORT || 4000

app.use(function(req,res,next){
  var authz = req.header("Authorization")
  if(process.env.AUTHZ_KEY == null){
    res.status(401).send({message: 'Access denied, authorization has not been configured.'})
  }
  else if(process.env.AUTHZ_KEY != authz){
    res.status(401).send({message: 'Access denied.'})
  }
  next()
})

app.use(bodyParser.json())
app.route('/').post(hooks.token_enrich)

app.use(function(req,res){
  res.status(404).send({url: req.originalUrl + ' was not found'})
})

app.listen(port, () => console.log('Hooks started on '+port))