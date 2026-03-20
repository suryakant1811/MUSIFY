import {User} from '../model/user.model.js';


export const callback = async (req, res, next) => {

  try {
    
    const {id, firstName, lastName, imageUrl} = req.body;

   
    const existingUser = await User.findOne({clerkId:id})

    
    
    if(!existingUser) {
      await User.create({clerkId:id, firstName, lastName, imageUrl});
    }

    res.status(200).json({success:true, message:'User added successfully' });

  } catch (error) {
    console.log('Error in auth callback controller: ', error); 
    next(error)
  }

}