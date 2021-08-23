import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

export default function(req,res){
  let data = ""
  req.on('data',chunk => data+=chunk)
  req.on('end',()=>{
     data = JSON.parse(data)
     let { sub_category_id,model,product_name, color, price } = data
     console.log(model);
     try{
       if((typeof sub_category_id)!=='number') throw "id must be number"
       if((typeof product_name)!=='string') throw "product name must be string"
       if(product_name.length<1) throw "product name length must be at least 1 symbol"
       if(product_name.length>200) throw "product name length must be at most 200 symbol"
       if(!(typeof model)=='string') throw "model must be string"
       if(model.length<1) throw "model length must be at least 1 sybmol"
       if(model.length>50) throw "model length must be at most 50 symbol"
       if((typeof price)!=='number') throw "price must be number"
       let products = fs.readFileSync(path.join(process.cwd(),'database','products.json'))
       products = JSON.parse(products)
       data.product_id = products.length ? products[products.length-1].product_id+1 : 1
       products.push(data)
       fs.writeFileSync(path.join(process.cwd(),'database','products.json'),JSON.stringify(products,null,4))
       res.send('yozildi')
     }catch(e){
       res.send(e)
     }

  })
}
