import express from 'express'
import path from 'path'
import fs from 'fs'
import register from './controllers/register.js'
import login from './controllers/login.js'
import letCategor from './controllers/letCategor.js'
import letSub from './controllers/letSub.js'
import proDuct from './controllers/proDuct.js'
import postCat from './controllers/postCat.js'
import postPro from './controllers/postPro.js'
import postSub from './controllers/postSub.js'
let app = express()
let port = process.env.PORT || 4554
app.post('/register',register)
app.post('/login',login)
app.get('/categories',letCategor)
app.get('/subcategories',letSub)
app.get('/products',proDuct)
app.post('/products',postPro)
app.post('/subcategories',postSub)
app.post('/categories',postCat)
app.listen(port,()=>console.log("http://localhost:"+port))
