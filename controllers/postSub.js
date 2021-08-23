import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

export default function(req,res){
  let data = ""
  req.on('data',chunk => data+=chunk)
  req.on('end',()=>{
     data = JSON.parse(data)
     let { sub_category_id, sub_category_name } = data
     try{
       if((typeof sub_category_id)!=='number') throw "id must be number"
       if((typeof sub_category_name)!=='string') throw "subcategories name must be string"
       if(sub_category_name.length<1) throw "subcategories name length must be at least 1 symbol"
       if(sub_category_name.length>200) throw "subcategories name length must be at most 200 symbol"
       let subs = fs.readFileSync(path.join(process.cwd(),'database','subCategories.json'))
       subs = JSON.parse(subs)
       console.log(subs);
       data.sub_category_id = subs.length ? subs[subs.length-1].sub_category_id + 1 : 1
       subs.push(data)
       fs.writeFileSync(path.join(process.cwd(),'database','subCategories.json'),JSON.stringify(subs,null,4))
       res.send('yozildi')
     }catch(e){
       res.send(e)
     }

  })
}
