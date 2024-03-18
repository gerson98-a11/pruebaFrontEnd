//Metodo para consultar todos los datos de la Api
export const todoApi = {
  url: "https://apitodo-2yow.onrender.com/items",
  apiKey: "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9",

  getItems: function () {
    return fetch(this.url, {
      method: "GET",
      headers: {
        "x-api-key": this.apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  },
   // Método para obtener un elemento por su ID
  getItemById: function (itemId) {
    const urlWithId = `${this.url}/${itemId}`; // Agregar el ID a la URL
    return fetch(urlWithId, {
      method: "GET",
      headers: {
        "x-api-key": this.apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  },
   // Método para eliminar un elemento por su ID
   deleteItem: function (itemId) {
    const urlWithId = `${this.url}/${itemId}`; // Agregar el ID a la URL
    return fetch(urlWithId, {
      method: "DELETE",
      headers: {
        "x-api-key": this.apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el elemento");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al eliminar el elemento:", error);
      });
  },

  updateItem: function ( itemId, name, description, status, dueDate){
    const urlWithId = `${this.url}/${itemId}`;
    const itemData = {
      id: itemId,
      name: name,
      description: description,
      status: status,
      dueDate: dueDate
    }
    return fetch(urlWithId, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(itemData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al Actualizar el ítem");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al Actualizar el ítem:", error);
    });
  }
};

//Metodo para realizar el post
export const todoApiPost = {
  // Url a la que se dirigen los datos
  url: "https://apitodo-2yow.onrender.com/items",
  //Llave
  apiKey: "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9",

  addItem: function (name, description, status, dueDate) {
    const itemData = {
      name: name,
      description: description,
      status: status,
      dueDate: dueDate,
    };

    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(itemData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el ítem");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al agregar el ítem:", error);
      });
  },
};

