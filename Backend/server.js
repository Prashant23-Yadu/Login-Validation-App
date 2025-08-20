const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const FormData = require('./model/FormData'); // ✅ Import model

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Connected to MongoDB");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

// Form submit route
app.post('/submit', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save(); // Save to DB
        console.log("✔️ Data saved:", req.body);
        res.json({ message: "Form submitted and data saved to MongoDB!" });
    } catch (error) {
        console.error("❌ Error saving data:", error);
        res.status(500).json({ message: "Error saving data" });
    }
});

// Start the server ONCE
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});

