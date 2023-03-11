const URL = 'https://pixabay.com/api/';
const KEY = '31882086-c73dad84d82fd65a5a1109d75';

export default function fetchAPI(query, page = 1) {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  });
}
