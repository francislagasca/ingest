class Ingest {
    async get(url, options = {}) {
      return this._request(url, { ...options, method: 'GET' });
    }
  
    async post(url, data, options = {}) {
      return this._request(url, { ...options, method: 'POST', body: JSON.stringify(data) });
    }
  
    async put(url, data, options = {}) {
      return this._request(url, { ...options, method: 'PUT', body: JSON.stringify(data) });
    }
  
    async delete(url, options = {}) {
      return this._request(url, { ...options, method: 'DELETE' });
    }
  
    async _request(url, options) {
      const {
        retries = 0,
        retryDelay = 1000,
        ...fetchOptions
      } = options;
  
      let attempt = 0;
      let response;
  
      while (attempt <= retries) {
        try {
          response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              ...fetchOptions.headers
            },
            ...fetchOptions
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          return await response.json();
        } catch (error) {
          if (attempt < retries) {
            attempt++;
            await this._delay(retryDelay);
          } else {
            throw error;
          }
        }
      }
    }
  
    _delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
  
  export default new Ingest();