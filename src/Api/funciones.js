// Método para consultar todos los datos de la API
export const todoApi = {
  url: "https://apitodo-2yow.onrender.com/items",
  apiKey: "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9",

  getItems: function () {
    // Realiza una solicitud GET para obtener todos los elementos de la API
    return fetch(this.url, {
      method: "GET",
      headers: {
        "x-api-key": this.apiKey, // Incluye la clave de API en los encabezados
      },
    })
      .then((response) => {
        // Maneja la respuesta de la solicitud
        if (!response.ok) {
          throw new Error("Error en la solicitud"); // Lanza un error si la solicitud no fue exitosa
        }
        return response.json(); // Retorna los datos obtenidos en formato JSON
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error); // Maneja errores si ocurrieron durante la solicitud
      });
  },

  // Método para obtener un elemento por su ID
  getItemById: function (itemId) {
    const urlWithId = `${this.url}/${itemId}`; // Construye la URL con el ID del elemento
    // Realiza una solicitud GET para obtener el elemento específico por su ID
    return fetch(urlWithId, {
      method: "GET",
      headers: {
        "x-api-key": this.apiKey, // Incluye la clave de API en los encabezados
      },
    })
      .then((response) => {
        // Maneja la respuesta de la solicitud
        if (!response.ok) {
          throw new Error("Error en la solicitud"); // Lanza un error si la solicitud no fue exitosa
        }
        return response.json(); // Retorna los datos obtenidos en formato JSON
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error); // Maneja errores si ocurrieron durante la solicitud
      });
  },

  // Método para eliminar un elemento por su ID
  deleteItem: function (itemId) {
    const urlWithId = `${this.url}/${itemId}`;
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
        // En lugar de response.json(), simplemente retornamos la respuesta
        return response;
      })
      .then((data) => {
        console.log("Elemento eliminado correctamente:", data);
      })
      .catch((error) => {
        console.error("Error al eliminar el elemento:", error);
      });
  },

  // Método para actualizar un elemento por su ID
  updateItem: function (itemId, name, description, status, dueDate) {
    const urlWithId = `${this.url}/${itemId}`; // Construye la URL con el ID del elemento
    const itemData = {
      // Construye el objeto de datos del elemento a actualizar
      id: itemId,
      name: name,
      description: description,
      status: status,
      dueDate: dueDate,
    };
    // Realiza una solicitud PUT para actualizar el elemento específico por su ID
    return fetch(urlWithId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Indica el tipo de contenido como JSON en los encabezados
        "x-api-key": this.apiKey, // Incluye la clave de API en los encabezados
      },
      body: JSON.stringify(itemData), // Convierte el objeto de datos a formato JSON y lo incluye en el cuerpo de la solicitud
    })
      .then((response) => {
        // Maneja la respuesta de la solicitud
        if (!response.ok) {
          throw new Error("Error al Actualizar el ítem"); // Lanza un error si la solicitud no fue exitosa
        }
        return response.json(); // Retorna los datos obtenidos en formato JSON
      })
      .catch((error) => {
        console.error("Error al Actualizar el ítem:", error); // Maneja errores si ocurrieron durante la solicitud
      });
  },

  // Método para agregar un nuevo elemento
  postItem: function (name, description, status, dueDate) {
    const urlWithId = `${this.url}`; // Construye la URL para agregar un nuevo elemento
    const itemData = {
      // Construye el objeto de datos del nuevo elemento
      name: name,
      description: description,
      status: status,
      dueDate: dueDate,
    };
    // Realiza una solicitud POST para agregar el nuevo elemento
    return fetch(urlWithId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica el tipo de contenido como JSON en los encabezados
        "x-api-key": this.apiKey, // Incluye la clave de API en los encabezados
      },
      body: JSON.stringify(itemData), // Convierte el objeto de datos a formato JSON y lo incluye en el cuerpo de la solicitud
    })
      .then((response) => {
        // Maneja la respuesta de la solicitud
        if (!response.ok) {
          throw new Error("Error al agregar el ítem"); // Lanza un error si la solicitud no fue exitosa
        }
        return response.json(); // Retorna los datos obtenidos en formato JSON
      })
      .catch((error) => {
        console.error("Error al agregar el ítem:", error); // Maneja errores si ocurrieron durante la solicitud
      });
  },
};
