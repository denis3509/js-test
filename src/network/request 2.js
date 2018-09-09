/*
export const request1 = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open(method, `${restUrl}${url}`, true);
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
    response => {
      return new Promise((resolve, reject) => {
        return resolve(response)
      })
    },
    error => {
      return new Promise((resolve, reject) => {
        return reject(error)
      })
    }
  )
};*/
