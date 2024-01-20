const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
const { Downloader, } = require('ytdl-mp3');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/files', express.static(__dirname + '/files'));
app.use(cors());
app.use(upload());
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = 7624;
app.post("/convertVideo", async(req,res) =>{
  const {videoId} = req.body;
  try {
    const downloader = new Downloader({
      getTags: false,
      outputDir: path.join(__dirname, 'files')
    });
    const response = await downloader.downloadSong('https://www.youtube.com/watch?v='+videoId);
    res.send({track:response?.split('/')?.pop()})

  } catch (error) {
    console.error('Error:', error.message);
  }
});
const convertVideoToMp3 = async () => {
  const outputDir = path.join(__dirname, 'files');
  try {
    const downloader = new Downloader({
      getTags: false,
      outputDir
    });
    const response = await downloader.downloadSong('https://www.youtube.com/watch?v=7jgnv0xCv-k');
    console.log(response?.split('/')?.pop());

  } catch (error) {
    console.error('Error:', error.message);
  }
};
app.listen(port, () => {
  console.log(`Listening on port ${port} (HTTP)...`);
  //convertVideoToMp3();
});
