const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

exports.handleUpload = async (req, res) => {
  try {
    const fileStream = fs.createReadStream(req.file.path);
    const form = new FormData();
    form.append('file', fileStream, req.file.originalname);

    const response = await axios.post(
      'http://2404:7c80:5d:cd5:d04f:261c:8782:9e51:8080/v1/audio/transcriptions',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': 'Bearer itiswhatitis56',
        },
      }
    );

    fs.unlinkSync(req.file.path); //taki wo audio save na ho use hone ke baad delete ho jye
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
