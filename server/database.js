var mysql=require('mysql')


var connection=mysql.createConnection({
    host :  'localhost',
     database:   'nitish',
    user:   'root',
    password:   'Pass@2001'
});


// class DbService{
//     static getDbServiceInstance(){
//         return instance ? instance :new DbService();

//     }
// }
// module.exports=DbService;

module.exports=connection;
