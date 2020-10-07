import { fetchData } from './saga/fetchMock';

test('Test the API call', async() => {

    const data = await fetchData().then(r => r);
    expect(data.length).toBeGreaterThan(0);
    expect(typeof data).toBe('object');

});