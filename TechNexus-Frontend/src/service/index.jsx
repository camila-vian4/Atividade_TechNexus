import axios from 'axios';

const api = axios.create({
  // Porta padrão utilizada pelo Spring Boot. Se a sua dupla mudar, altere aqui.
  baseURL: 'http://localhost:8080', 
});

export default api;