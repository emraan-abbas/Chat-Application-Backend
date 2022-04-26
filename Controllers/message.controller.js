const messageModel = require('../Models/message.model');

exports.postMessage = async (message, senderId) => {
  try {
   
    data = new messageModel({
      message,
      senderId
    });
    await data.save()
    console.log(data)
    // res.json(data);
  }
  catch(error){
    console.log(error);
		res.status(500).json('Error at POST MESSAGE');
  }
};

exports.getMessage = async (req, res) => {
  try {
    const messages = await messageModel.find().select('-_id message senderId').populate('senderId', '-_id name');//_senderId: req.param.id
    res.json(messages);
  }
  catch (error) {
    console.log(error);
		res.status(500).json('Error at GET MESSAGE');
  }
};
