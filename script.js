var express = require('express');
var multer = require('multer');
var path = require('path');
var app = express();
var port = 3000;

// Set up multer for handling file uploads
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Set the destination folder
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        var fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

var upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle the file upload
app.post('/upload', upload.single('modImage'), function (req, res) {
    try {
        var imageUrl = `/images/${req.file.filename}`;
        res.json({ success: true, imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error uploading file' });
    }
});

// Start the server
app.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`);
});

function addMod() {
    // Get form values
    var modImageInput = document.getElementById('modImage');
    var title = document.getElementById('modTitle').value;
    var description = document.getElementById('modDescription').value;
    var releaseDate = document.getElementById('modReleaseDate').value;
    var gameName = document.getElementById('modGame').value;

    // Validate form values
    if (!modImageInput.files[0] || !title || !description || !releaseDate || !gameName) {
        alert('Please fill out all fields');
        return;
    }

    // Create a FormData object to easily send the image file to the server
    var formData = new FormData();
    formData.append('modImage', modImageInput.files[0]);

    // Perform a fetch request to the server to handle the image upload
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response = > response.json())
    .then(data => {
        // Handle the response from the server, which may include the path to the uploaded image
        if (data.success) {
            // Create a new mod box
            var modContainer = document.getElementById('modsContainer');
            var newMod = document.createElement('div');
            newMod.className = 'mod';

            // Mod content with image source set to the server response
            newMod.innerHTML = 
                '<img src="' + data.imageUrl + '" alt="' + title + '"/>' +
                '<div class="mod-content">' +
                    '<h3>' + title + '</h3>' +
                    '<p>' + description + '</p>' +
                    '<p>Release Date: ' + releaseDate + '</p>' +
                    '<p>Game: ' + gameName + '</p>' +
                '</div>';

            // Append the new mod to the container
            modContainer.appendChild(newMod);

            // Clear the form
            document.getElementById('addModForm').reset();
        } else {
            alert('Image upload failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during image upload');
    });
}
