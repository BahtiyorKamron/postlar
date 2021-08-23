import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
let validation = {
  username : function(value){
    if(value.length<3 || value.length>30) throw "The username length mustbe between 3-30"
    return value
  },
  password:function(value){
    if((value.length<8)) throw "password length must be 8"
    if(!(/[a-z]/.test(value))) throw "password must contains lower letters"
    if(!(/[A-Z]/.test(value))) throw "password must constains upper letter"
    if(!(/[0-9]/.test(value))) throw "password must contains numbers"
    if(!(/[!@#$%]/).test(value)) throw "password must contains symbols"
    return value
  }
}
export default function (req,res) {

      let data = ""
      req.on('data',chunk => data += chunk)
      req.on('end',()=>{
      try{
         data = JSON.parse(data)
         let {username,password } = data
         if(!username || !validation.username(username)) throw "Username required"
         if(!password || !validation.password(password)) throw "password required"
         let users = fs.readFileSync(path.join(process.cwd(),'database',"users.json"))
         let token = jwt.sign({username:username},'shhhh')
         users = users.length ? JSON.parse(users) : []
         if(!users.length) throw "You have not registered"
         let user = users.find(f => f.username==username && f.password==password)
         if(!user) throw "User not found"
         res.send("This is your token : " + token)
     }catch(error){
    res.json({
      message:error
    })
  }
})
}
