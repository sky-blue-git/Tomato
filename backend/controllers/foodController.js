import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const saveImageLocally = async (fileBuffer, fileName, mimeType) => {
  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = path.extname(fileName);
    const baseName = path.basename(fileName, fileExtension);
    const uniqueFileName = `${baseName}_${timestamp}${fileExtension}`;
    
    // Save file to uploads directory
    const filePath = path.join(uploadsDir, uniqueFileName);
    fs.writeFileSync(filePath, fileBuffer);
    
    // Return the URL for serving the image
    return `http://localhost:4000/uploads/${uniqueFileName}`;
  } catch (error) {
    console.error('Error saving image locally:', error);
    throw error;
  }
};

// add food item

const addFood = async(req, res) =>{
    try {
        const imageBuffer = req.file ? req.file.buffer : null;
        if (!imageBuffer) {
          return res.status(400).json({ success: false, message: 'No image provided' });
        }  
        const mimeType = req.file.mimetype;
        const imageUrl = await saveImageLocally(imageBuffer, req.file.originalname, mimeType);
        console.log('Image saved locally:', imageUrl);
  
        const food = new foodModel({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category,
            image: imageUrl,
        })
        await food.save();
        res.json({success:true, message:"Food item added successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Failed to add food item"});
    }
}

// all food list

const listFood = async (req,res) => {
    try{
        const food_list = await foodModel.find({});
        res.json({success:true, data:food_list});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Failed to fetch food items"});
    }
}

//remove food item

const removeFood = async (req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id);

        if (food) {
            const fileId = extractFileIdFromUrl(food.image);

            await drive.files.delete({ fileId: fileId });
            
            await foodModel.findByIdAndDelete(req.body.id);

            res.json({ success: true, message: "Food item removed successfully" });
        } else {
            res.status(404).json({ success: false, message: "Food item not found" });
        }
    }catch(error){
        console.log("Error in removeFood:", error);
        res.json({ success: false, message: "Failed to remove food item" });
    }
};

const getImage = async (req, res) => {
    try {
        const imageName = req.params.imageUrl;
        const imagePath = path.join(uploadsDir, imageName);
        
        // Check if file exists
        if (!fs.existsSync(imagePath)) {
          return res.status(404).json({ success: false, message: 'Image not found' });
        }
        
        // Set appropriate content type
        const ext = path.extname(imageName).toLowerCase();
        const contentType = ext === '.png' ? 'image/png' : 
                           ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 
                           ext === '.gif' ? 'image/gif' : 'image/jpeg';
        
        res.setHeader('Content-Type', contentType);
        res.sendFile(imagePath);
    } catch (error) {
        console.error('Error serving image:', error);
        res.status(500).json({ success: false, message: "Failed to serve image" });
    }
};

export {addFood, listFood, removeFood, getImage};