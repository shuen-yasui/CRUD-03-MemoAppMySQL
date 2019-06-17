const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('client, btn clicked');
  fetch('/buttonclick', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        document.getElementById('outputText').innerHTML += `title: ${data[i].title} body: ${data[i].body}<br>`;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});
