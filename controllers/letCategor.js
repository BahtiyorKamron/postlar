import fs from 'fs'
import path from 'path'
export default function(req,res){
  let categories = JSON.parse(fs.readFileSync(path.join(process.cwd(),'database','categories.json')))
  let subCategories = JSON.parse(fs.readFileSync(path.join(process.cwd(),'database','subCategories.json')))
  let sC = []
  let s = {}
  for(let i of subCategories){
    s.subCategoryId=i.sub_category_id
    s.subCategoryName=i.sub_category_name
    sC.push(s)
    s={}
  }
  // console.log(subCategories);
  for(let i of categories){
    let arr = []
      for(let j of subCategories){
        if(i.category_id==j.category_id){
          let obj = {
  					subCategoryId: j.sub_category_id,
  					subCategoryName: j.sub_category_name
  				}
          arr.push(obj)
        }
      }
      i.subCategories=arr

  }
  res.send(categories);
}
