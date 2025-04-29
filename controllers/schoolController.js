import { poolConfig } from "../config/database.js"
import { haversineDistance } from "../utils/distance.js"



const addSchool = async (req,res) => {
    
    const { name, address} = req.body
    const latitude = parseFloat(req.body.latitude)
    const longitude = parseFloat(req.body.longitude)
    
    if(!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: "All fields are required" })
    }
    
    if(typeof name !== 'string' || typeof address !== 'string' || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: "Invalid data types" })
    }

    try {
        const [existing] = await poolConfig.execute(`SELECT * FROM schools WHERE ABS(latitude - ?) < 0.0001 AND ABS(longitude - ?) < 0.0001`,[latitude, longitude])
        if (existing.length > 0) {
            return res.status(400).json({ message: "School already exists" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Database error", error: error.message })
    }

    try{
        const result = await poolConfig.execute(`INSERT INTO schools (name, address,latitude, longitude) VALUES (?, ?, ?, ?)`,[name, address,latitude, longitude])
        return res.status(200).json({ message: "School added successfully",result: result[0]})
    } catch(error){
        return res.status(500).json({ message: "Database error", error: error.message })
    }
}

const getSchool = async (req,res) => {
    
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    
    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ message: 'Invalid coordinates' });
    }

    try {
        const [school] = await poolConfig.execute(`SELECT * FROM schools`)
        const sorted = school.map(s=>({
            ...s,
            distance: haversineDistance(userLat, userLon, s.latitude, s.longitude)
        })).sort((a,b)=> a.distance - b.distance)
        res.status(200).json({ message: "Schools fetched successfully", sorted })
    }
    catch (error) {
        res.status(500).json({ message: "Database error", error: error.message })
    }
}

export {addSchool,getSchool}