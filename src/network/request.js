 const request = (method, url) => {
  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open(method, `${url}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'application/json');
    xhr.onload = function () {
      try {
        resolve(JSON.parse(xhr.response));
      }
      catch (e) {
        reject("parseError: " + e.message);
      }
    };
  }).then(
    (response) => {console.log('then');
      return new Promise((resolve, reject) => {
        return resolve(response)
      })
    },
    (error) => {
      return new Promise((resolve, reject) => {
        return reject(error)
      })
    }
  )
};
export default request