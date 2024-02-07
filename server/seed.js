const bcrypt = require('bcrypt');
const { Admin } = require('./models/Books.js');
require('./db.js');

async function AdminAccount() {
try {
    const amdinCount = await Admin.countDocuments()
    if(amdinCount === 0){
     const hashPassword = await bcrypt.hash('adminpassword' , 10)
     const newAmdin = new Admin ({
        username : 'Admin',
        password: hashPassword
     })
      await newAmdin.save()
      console.log("account created")
    }
    else{
        console.log("account already exist")
    }
} catch(err){
    console.log('error')
}
}

AdminAccount()