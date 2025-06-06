const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

exports.handleUpload = async (req, res) => {
  try {
    const fileStream = fs.createReadStream(req.file.path);
    const form = new FormData();
    form.append('audio', fileStream, req.file.originalname);    
    const response = await axios.post(
      'http://38.137.51.198:8080/v1/audio/transcriptions',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer itiswhatitis56',
        },
      }
    );

    fs.unlinkSync(req.file.path); //taki wo audio save na ho use hone ke baad delete ho jye
    res.json(response.data);
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};
