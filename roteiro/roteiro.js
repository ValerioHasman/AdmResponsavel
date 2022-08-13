const txtjson = document.getElementById('json');

fetch(document.baseURI + 'home/json',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(resp => resp.json())
  .then(data => {
    txtjson.innerHTML = (JSON.stringify(data, null, 2))
  })
  .catch(err => console.log(err))
;
