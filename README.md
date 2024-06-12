## Simpler version of Axios based on Fetch API

## Installation
```bash
npm install ingest
```

## Usage
```javascript
import ingest from 'ingest';
```

### GET Request
```javascript
ingest.get('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### POST Request
```javascript
ingest.post('https://api.example.com/data', { key: 'value' })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Retry Feature
```javascript
ingest.get('https://api.example.com/data', { retries: 3, retryDelay: 2000 })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
- retries: Number of retry attempts (default is 0).
- retryDelay: Delay between retries in milliseconds (default is 1000).