 import Contact from '../models/Contact.models.js'
 
 export const contactController = async (req, res) => {
    const {name, email, message} = req.body;
    if(!name && !email && !message){
      res.json({
        status: 400,
        message: "Please provide name, email and message"
      })
    }
 try {
   const contact = await Contact.create({name, email, message});
   res.json({
    status: 200,
    name: contact.name,
    email: contact.email,
   })
 } catch (error) {
  res.json({
    status: 400,
    message: error.message
  })
 }
}