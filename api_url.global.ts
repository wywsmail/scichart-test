/* eslint-disable @typescript-eslint/camelcase */

// module.exports = {
//   url: process.env.VUE_APP_API_URL
// };

// export{
//   url: process.env.VUE_APP_API_URL,
// };

interface Url {
  url: string;
}

const apiUrl: Url = {
  // url: 'process.env.VUE_APP_API_URL',
  url: "https://dev.intelliances.com/broker/medical/"
};

export default apiUrl;
