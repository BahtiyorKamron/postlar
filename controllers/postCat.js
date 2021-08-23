import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

export default function(req,res){
  let data = ""
  req.on('data',chunk => data+=chunk)
  req.on('end',()=>{

    let {category_name} = JSON.parse(data)
    console.log(typeof category_name);
    try{
      if((typeof category_name)!=='string') throw "Kategory namega faqat sttring yborish mumkin"
      if(category_name.length>50) throw "Kategory namega ko'pi blan 50 ta belgi kriting"
      if(category_name.length<3) throw "Kategory namega kamida 3 ta belgi kritish mumkin"
      let cats = fs.readFileSync(path.join(process.cwd(),'database','categories.json'))
      cats = JSON.parse(cats)
      let c = cats.find(f => f.category_name==category_name)
      if(c) throw "BU nom band"
      let category_id = cats.length ? cats[cats.length-1].category_id + 1 : 1
      let cat ={
        category_id,
        category_name
      }
      cats.push(cat)
      fs.writeFileSync(path.join(process.cwd(),'database','categories.json'),JSON.stringify(cats,null,4))
      res.send('yozildi')
    }catch(e){
      res.json({
        message:e
      })
    }
  })
}
