import Ingest from '../src/index.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test data' }),
  })
);

describe('Ingest', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should perform a GET request', async () => {
    const data = await Ingest.get('https://api.example.com/data');
    expect(data).toEqual({ data: 'test data' });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });

  it('should perform a POST request', async () => {
    const payload = { key: 'value' };
    const data = await Ingest.post('https://api.example.com/data', payload);
    expect(data).toEqual({ data: 'test data' });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
  });

  it('should retry the request if it fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    ).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'test data' }),
      })
    );

    const data = await Ingest.get('https://api.example.com/data', {
      retries: 1,
      retryDelay: 100,
    });

    expect(data).toEqual({ data: 'test data' });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should fail after retries', async () => {
    fetch.mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    );

    await expect(
        Ingest.get('https://api.example.com/data', {
        retries: 1,
        retryDelay: 100,
      })
    ).rejects.toThrow('Network error');

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});