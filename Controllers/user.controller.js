const userModel = require('../Models/user.model');


exports.postUser = async (req, res) => {
  try {
    let name = await req.body.name;
    let data = await userModel.findOne({name});

    if(data){
      res.json({status:"User already exist."})
      process.exit();
    }
    else{
      data = new userModel({
        name
      });
      await data.save();
      res.json(data);
    }
  }
  catch(error){
    console.log(error);
		res.status(500).json('Error at POST USER');
  }
};