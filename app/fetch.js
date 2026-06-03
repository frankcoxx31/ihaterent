const https = require('https');

https.get('https://icclt.com/assets/index-e16ed6c2.js', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const matches = data.match(/.{0,150}resources.{0,150}/gi);
    if (matches) {
      console.log(matches.join('\n---\n'));
    } else {
      console.log('No matches found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
