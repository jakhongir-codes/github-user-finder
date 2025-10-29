import axios from 'axios';

export const githubClient = axios.create({
  baseURL: 'https://api.github.com/users/',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,  
  },
});