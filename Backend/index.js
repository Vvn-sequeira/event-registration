require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {v2:cloudinary } = require("cloudinary") // image storage 
const cors = require("cors")
const bodyParser = require('body-parser')
const {registrationMODLE} = require("./RegistrationModel.js")

const app = express();
const PORT = 8080;

app.use(express.json())


app.listen(PORT, () => {
  console.log(`server Running on ${PORT}`);
  connectDB()
});

const connectDB = async()=> {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected")
  } catch (error) {
    console.log("Failed to Connect to the DB , ", error)
  }
}

app.post("/register", async()=>{

})


const CloudImg = async(LocalFilePath)=>{

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret:  process.env.CLOUDINARY_API_SECERET
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           LocalFilePath, {
            resource_type:'auto',
           }
       )
       .catch((error) => {
           console.log(error);
           
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log("finalURL:",autoCropUrl); 
    return autoCropUrl    
}

// CloudImg() 