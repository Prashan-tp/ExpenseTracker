
const { serializeUser } = require('passport');
const jwt = require('jsonwebtoken');

const Record = require('../model/Records');
const User = require('../model/user');

module.exports.get_Expense = async function  (req,res){
    
    try{
       
       
        let record = await Record.find({user:req.user.id});
        
    
    return res.status(200).json({
        message: 'Data Displayed Successfully',
        data: record
      });
    
    
    }
    catch(e){
       
        return res.status(500).json({
            message: "Server Error",
            error: e.message
          });
    }
}


module.exports.add_Expense = async function  (req,res){
    
    try{
        console.log(req);
  let expense = await Record.create({
    amount:req.body.amount, 
    category:req.body.category, 
    description:req.body.description ,
    date: new Date(), 
   
    user:req.user.id 
}) ;
   if(expense){
   
    return res.status(200).json({
        message: 'Data Displayed Successfully',
        data: expense
      });
   }
   else{
    return res.status(404).json({
        message: "No records found"
      });
   }
    }
    catch(e){
        
        return res.status(500).json({
            message: "Server Error",
            error: e.message
          });
    }
}
module.exports.updaterecord= async function(req,res){
    try{
    let expense =   await Record.findOne({ _id: req.body.id , user:req.user.id }).updateOne({ 
         amount:req.body.amount, 
        category:req.body.category, 
        description:req.body.description ,
     }); 
     if(expense){
   
        return res.status(200).json({
            message: 'Data Displayed Successfully',
            data: expense
          });
       }
       else{
        return res.status(404).json({
            message: "No records found"
          });
       }
    }
    catch(e){
        return res.status(500).json({
            message: "Server Error",
            error: e.message
          });
    }
}

module.exports.deleterecord= async function(req,res){
    try{
       
    let expense =   await Record.findOneAndDelete({ _id:req.params.id ,user:req.user.id}) 
     if(expense){
      
        return res.status(200).json({
            message: 'Data Deleted Successfully',
            data: expense
          });
       }
       else{
        return res.status(404).json({
            message: "No records found"
          });
       }
    }
    catch(e){
       
        return res.status(500).json({
            message: "Server Error",
            error: e.message
          });
    }
}


module.exports.user_token= async function(req,res){
    try{
      
    let user = await User.findOne({email:req.body.email});

    if(!user || user.password!=req.body.password){
        return res.status(401).json({
            message:'UnAuthorized'
          });
       
    }
    return res.status(200).json({
        message:"Authorized",
        data:jwt.sign(user.toJSON(),'VYjHy6XJSQ',{expiresIn:1000*60*10})
    })
}
catch(e){
   
    return res.status(500).json({
        message: "Server Error",
        error: e.message
      });
}
}


module.exports.UserSign_up = async function(req,res){
   let user = await User.findOne({email:req.body.email}) ;

        try{
        if(user){
            return res.status(401).json({
                message:'User Already Exsists',
            });
        }

        if(!user &&(req.body.password!=req.body.confirmpassword)){
            return res.status(409).json({
                message:'Password Not same',
            });
        }

      let newuser =  await User.create({
           
            email:req.body.email ,
            password:req.body.password ,
        });
              return res.status(200).json({
                  message:'Account Created'
                 
              });
     
            }
            catch(e){
                
    return res.status(500).json({
        message: "Server Error",
        error: e.message
      });
            }
}