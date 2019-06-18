const btnFetchAll = document.getElementById('btnFetchAll');
btnFetchAll.addEventListener('click', function(e) {
  fetch('/buttonclick', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      console.log(data);
      const tbl = document.getElementById('outputTable');
      for (var i = 0; i < data.length; i++) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        tr.appendChild(td);
        tbl.appendChild(tr);
        td.innerHTML += `id:${data[i].id} title: ${data[i].title} body: ${data[i].body}`;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

const btnEditEntry = document.getElementById('btnEditEntry');
btnEditEntry.addEventListener('click', function(e) {
  console.log("clinet, edit clicked");
  fetch('/btnEdit/2', {method: 'PUT'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
    console.log(data);
    })
    .catch(function(error) {
    console.log(error);
    });
});
