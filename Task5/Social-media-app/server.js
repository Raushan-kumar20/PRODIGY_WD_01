const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost/social_media_app', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    content: String,
    image: String,
    likes: { type: Number, default: 0 },
    comments: [{ content: String, createdAt: { type: Date, default: Date.now } }]
});

const Post = mongoose.model('Post', postSchema);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts });
});

app.post('/posts', upload.single('image'), async (req, res) => {
    const newPost = new Post({
        content: req.body.content,
        image: req.file ? req.file.path : null
    });
    await newPost.save();
    io.emit('newPost', newPost);
    res.redirect('/');
});

io.on('connection', (socket) => {
    console.log('New user connected');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
