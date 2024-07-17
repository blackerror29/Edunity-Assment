import multer from 'multer';
import nextConnect from 'next-connect';
import mysql from 'mysql2/promise';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/schoolImages',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

const db = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'schoolDB'
});

const handler = nextConnect();

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file.filename;

  try {
    const [result] = await db.query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image, email_id]
    );
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;
