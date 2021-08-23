import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

export default function(req,res){
  let {token} = (req.headers)
  let {username} = jwt.verify(token,'shhhh')
  console.log(username);
  let users = fs.readFileSync(path.join(process.cwd(),'database','users.json'))
  users = JSON.parse(users)
  let user = users.find(f => f.username==username)
try{
  if(!user) throw "bunday foydalanuvchi toq"
  let products = JSON.parse(fs.readFileSync(path.join(process.cwd(),'database','products.json')))
  let {subCategoryId,model,color} = req.query
  let arr = []
  if(subCategoryId && model && color){
    for(let i of products){
      if(i.sub_category_id==subCategoryId && i.model==model && i.color==color){
        arr.push(i)
      }
    }
  }else if(subCategoryId){
    arr.push(products.filter(f => f.sub_category_id==subCategoryId))
  }else if(model){
    arr.push(products.filter(f => f.model==model))
  }else if(color){
    arr.push(products.filter(f => f.color==color))
  }
  res.send(arr)
}catch(e){
  res.send(e)
}

}
