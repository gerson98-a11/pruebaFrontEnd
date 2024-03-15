//Metodo para consultar todos los datos de la Api
export const todoApi = {
      url: 'https://apitodo-2yow.onrender.com/items',
      apiKey: 'JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9',
      
      getItems: function() {
        return fetch(this.url, {
          method: 'GET',
          headers: {
            'x-api-key': this.apiKey
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
      }
    };

//Metodo para realizar el post
    export const todoApiPost = {
      // Url a la que se dirigen los datos 
      url: 'https://apitodo-2yow.onrender.com/items',
      //Llave
      apiKey: 'JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9',
    
      addItem: function(name, description, status) {
        const itemData = {
          name: name,
          description: description,
          status: status,
          dueDate: '2024-03-22',
        };
        console.log('Datos enviados:', itemData)
        return fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey
          },
          body: JSON.stringify(itemData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al agregar el ítem');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error al agregar el ítem:', error);
        });
      }
    };
    
    
  
    