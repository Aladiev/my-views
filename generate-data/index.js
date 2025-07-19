const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const films = require('./films.json');

const host = '31.44.2.70';

async function main() {
  for (const film of films) {
    // console.log('Iteration:', film);

    const data = new FormData();

    data.append('image', fs.createReadStream(`./sources/${film.imageId}.jpg`));

    await axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://${host}:3101/films/images/upload`,
      headers: {
        accept: '*/*',
        ...data.getHeaders()
      },
      data
    });

    await axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://${host}:3101/films`,
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(film)
    }); 
  }
}

main().then(() => {
  console.log('Success.');
})
.catch((error) => {
  console.log(error);
});