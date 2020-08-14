import axios from 'axios';

export const api = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`,
});
