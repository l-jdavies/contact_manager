export class ContactsManager {
  sendGetOrDeleteRequest(method, url, successStatus) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(method, url);
      request.responseType = 'json';

      request.onload = () => {
        if (request.status === successStatus) {
          resolve(request.response);
        } else {
          reject();
        }
      };

      request.send();
    })
  }

  sendPostOrPutRequest(method, url, data, successStatus) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(method, url);
      request.responseType = 'json';
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')


      request.onload = () => {
        if (request.status === successStatus) {
          resolve();
        } else {
          reject();
        }
      };

      request.send(data);
    })

  }

  async getAll() {
    try {
      return await this.sendGetOrDeleteRequest('GET', 'http://localhost:3000/api/contacts/', 200);
    } catch {
      return false;
    }
  }

  addNew(formData) {
    return this.sendPostOrPutRequest("POST", 'http://localhost:3000/api/contacts/', formData, 201);
  }

  remove(id) {
    return this.sendGetOrDeleteRequest("DELETE", `http://localhost:3000/api/contacts/${id}`, 204);
  }

  edit(formData, id) {
    return this.sendPostOrPutRequest("PUT", `http://localhost:3000/api/contacts/${id}`, formData, 201);
  }

  getContact(id) {
    return this.sendGetOrDeleteRequest('GET', `http://localhost:3000/api/contacts/${id}`, 200)
  }
}


