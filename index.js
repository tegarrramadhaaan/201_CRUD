const express  = require('express');
let mysql = require('mysql');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
});

const db = mysql.createConnection({
    host: 'localhost',
  user: 'root',
  password: '',
  database: 'biodata',
  port : 3308 ,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:' + err.stack);
    return;
  }
    console.log('Connection Succuessfuly!');
});

app.get('/api/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error executing users:', err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

app.post('/api/mahasiswa', (req,res) => {
    const { nama , nim , kelas , prodi } = rwq.body;

    if (!nama || !nim || !kelas|| !prodi) {
        return res.status(400).json({ message: 'nama, nim, kelas, prodi wajib diisi'});
    }

    db.query(
        'INSERT INTO mahasiswa ( nama, nim, kelas, prodi) VALUES (?,?,?,?)',
        [nama, nim, kelas, prodi],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error'});

            }

            res.status(201).json({ message: 'User created successfully'});
        }
    );
});

