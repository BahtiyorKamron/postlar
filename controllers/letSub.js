import fs from 'fs'
import path from 'path'
export default function(req,res){
  let subCategories = JSON.parse(fs.readFileSync(path.join(process.cwd(),'database','subCategories.json')))
  let products = JSON.parse(fs.readFileSync(path.join(process.cwd(),'database','products.json')))
  let arr = []
  let object = {}
  for(let i of subCategories){
    let obj = {
      subCategoryId:i.sub_category_id,
      subCategoryName:i.sub_category_name
    }
    arr.push(obj)
  }
  for(let i in subCategories){
    let array = []
    for(let j of products){
      if(subCategories[i].category_id==j.sub_category_id){
          let obj = {
            productId: j.product_id,
            productName: j.product_name,
            model: j.model,
            price: j.price,
            color: j.color
        }
        array.push(obj)
      }
    }
    arr[i].product = array
  }
  res.send(arr)
}
// [
//   {
//     subCategoryId: 1,
//     subCategoryName: 'smart phones',
//     products: [
//       {
//         productId: 1,
//         productName: 'Redmi note 6 pro',
//         model: 'redmi',
//         price: '150',
//         color: 'black'
//       }
//     ]
//   },
// ]
















// for(let i of subCategories){
  //   let obj = {
    //     subCategoryId:i.sub_category_id,
    //     subCategoryName:i.sub_category_name
    //   }
    //   for(let j of products){
      //     let array = []
      //     if(i.category_id==j.category_id){
        //       let obyekt = {
          //         productId:j.product_id,
          //         productName:j.product_name,
          //         model:j.model,
          //         price:j.price,
          //         color:j.color
          //       }
          //       array.push(obyekt)
          //     }
          //     obj.products=array
          //
          //     arr.push(obj)
          //   }
          //
          // }
          // res.send(arr)
