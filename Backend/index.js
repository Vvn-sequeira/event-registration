require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {v2:cloudinary } = require("cloudinary") // image storage 
const cors = require("cors")
const bodyParser = require('body-parser')
const registrationMODLE = require("./RegistrationModel.js")
const multer = require("multer"); 

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(cors());


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


const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const CloudImg = async(LocalFilePath)=>{

    
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret:  process.env.CLOUDINARY_API_SECERET
    });
    
    
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


app.post("/register", upload.single("image"), async (req, res) => {
  try {
    console.log("the api triggered !")
    const result = await CloudImg(req.file.path);
    console.log(result)
    
    const newUser = new registrationMODLE({
      Name: req.body.Name,
      RegNo: req.body.RegNo,
      PhoneNo: req.body.PhoneNo,
      Email: req.body.Email,
      College: req.body.College,
      Class: req.body.Class,
      Size: req.body.Size,
      ImgURL: result  
    });

    await newUser.save();

    console.log("User data is saved to the DB")
    res.status(201).json({
      message: "Registration successful",
      data: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
