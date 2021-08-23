import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
let validation = {
  username : function(value){
    if(value.length<3 || value.length>30) throw "The username length mustbe between 3-30"
    return value
  },
  gender:function(value){
    if(value!==1 && value!==2) throw 'Pleas input correct gender'
    return value
  },
  email:function(value){
    if(value.split('@')[1]!=='gmail.com') throw "Gmail account contain this:@gmail.com"
    return value
  },
  birth:function(value){
    let birthData = value.split("-")
    if(birthData[0].length!==4 || birthData[1].length!==2 || birthData[2].length!==2) throw "PLease enter yourt birthdata true"
    if(+birthData[0]<1950 || (+birthData[1]>31 || +birthData[1]<1) || (+birthData[2]>31 || +birthData[2]<1)) throw "Birthdatas has a wrong number"
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
      let userlar = fs.readFileSync(path.join(process.cwd(),'database','users.json'))
      userlar = JSON.parse(userlar)
      data = JSON.parse(data)
      let {username,password,email,birth,gender } = data
      let user = userlar.find(f => f.username==username)
      if(user) throw "This username band"
      if(!username || !validation.username(username)) throw "Username required"
      if(!password || !validation.password(password)) throw "password required"
      if(!email || !validation.email(email)) throw "Email required"
      if(!birth || !validation.birth(birth)) throw "Birth day required"
      if(!gender || !validation.gender(gender)) throw "Gender required"
      let users = fs.readFileSync(path.join(process.cwd(),'database',"users.json"))
      let token = jwt.sign({username:username},"shhhh")
      users = users.length ? JSON.parse(users) : []
      data.user_id = users.length ? users[users.length-1].user_id + 1 :1
      users.push(data)
      fs.writeFileSync(path.join(process.cwd(),'database','users.json'),JSON.stringify(users,null,4))
      console.log(token);
      res.send("This is your token : " + token)
  }catch(error){
    res.json({
      message:error
    })
  }
})
}
