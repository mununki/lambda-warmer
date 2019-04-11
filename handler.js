const https = require('https');

const warming = url => {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        console.log('warmed! :', res.statusCode);
        resolve(res);
      })
      .on('error', e => {
        console.log('got error :', e.message);
        reject(e);
      });
  });
};

module.exports.warmer = async (event, context, callback) => {
  try {
    await warming('https://www.rate-link.com/rates');
    context.succeed();
  } catch (e) {
    context.done();
  }
};
