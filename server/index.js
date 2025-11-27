// server.js (ฉบับแก้ไข)
const express = require('express');
const cors = require('cors');
const path = require('path'); // ต้องใช้ path module
const app = express();
const port = 3000;

// 1. **การตั้งค่า Static File Serving (จำเป็น!)**
// สั่งให้ Express สามารถเข้าถึงไฟล์ HTML, CSS, JS, Images ทั้งหมดได้
app.use(express.static(path.join(__dirname, '..')));

app.use(cors());
app.use(express.json());

app.get('/auth/login', (req, res) => {
    // ใช้วิธีนี้เมื่อคุณต้องการให้เมื่อเข้าถึง /login แล้วส่งไฟล์ login.html ให้
    // (ไฟล์ต้องอยู่ในโฟลเดอร์ที่ตั้งค่า express.static ไว้)
    res.sendFile('login.html', { root: path.join(__dirname, '..') });
});

// Route สำหรับ URL /register
app.get('/auth/register', (req, res) => {
    res.sendFile('register.html', { root: path.join(__dirname, '..') });
});

app.get('/recovery', (req, res) => {
    res.sendFile('recovery.html', { root: path.join(__dirname, '..') });
});

// *** POST Route สำหรับ Login API (ของเดิม) ***
// Route นี้ยังต้องใช้ POST เพื่อรับข้อมูลฟอร์ม
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // **(ในโลกจริง จะมีการตรวจสอบข้อมูลกับฐานข้อมูลที่นี่)**
    if (email === 'user@example.com' && password === '12345') {
        res.status(200).json({
            success: true,
            message: 'Login successful'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

// index.js (เพิ่มส่วนนี้)
const fs = require('fs'); // ต้องใช้ fs เพื่ออ่านไฟล์

// *** API Endpoint สำหรับดึงข้อมูลภาษา ***
app.get('/api/lang/:langCode', (req, res) => {
    const langCode = req.params.langCode; // เช่น 'en'

    // สมมติว่าไฟล์ JSON ภาษาอยู่ที่โฟลเดอร์แม่: /locales/th.json, /locales/en.json
    // ใช้ path.join เพื่อสร้างเส้นทางที่ถูกต้อง
    const filePath = path.join(__dirname, '..', 'locales', `${langCode}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // ถ้าไม่พบไฟล์ ให้ส่งสถานะ 404
            console.error(`Language file not found for: ${langCode}`);
            return res.status(404).json({ error: 'Language data not found' });
        }
        try {
            res.status(200).json(JSON.parse(data));
        } catch (e) {
            console.error('Error parsing JSON:', e);
            res.status(500).json({ error: 'Error processing language data' });
        }
    });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
