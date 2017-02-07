
var DB_type_userInfo = new Schema({
    name:String,
    account:String,
    password:String,
    date:Date,
})


var userInfo = mongoose,model('userlist',DB_type_userinfo)
export default userInfo