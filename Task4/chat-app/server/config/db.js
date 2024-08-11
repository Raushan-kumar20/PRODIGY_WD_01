const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
