## Simpler version of Axios based on Fetch API

## Installation
```bash
npm install simple-ingest
```

## Usage
```javascript
import SimpleIngest from 'simple-ingest';

const si = new SimpleIngest();
```
### GET Request
```javascript
si.get('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### POST Request
```javascript
si.post('https://api.example.com/data', { key: 'value' })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Retry Feature
```javascript
si.get('https://api.example.com/data', { retries: 3, retryDelay: 2000 })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
- retries: Number of retry attempts (default is 0).
- retryDelay: Delay between retries in milliseconds (default is 1000).

Visit https://github.com/francislagasca/ingest