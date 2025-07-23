import authServices from '../../firebase/authFun';
import axios from 'axios'

const base_url = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL : base_url,
    headers : {
        "Content-Type" : "application/json"
    }
});


api.interceptors.request.use(
  (config) => {
    return authServices.getFreshToken()
      .then((token) => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
          config.withCredentials = true
        }

        if (config.data instanceof FormData) {
          delete config.headers['Content-Type'];
        }

        return config; 
      })
      .catch((err) => {
        console.error("error getting token", err);
        return config; 
   });
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
     async (error)=>{
        if(error.response && error.response.status == 401 && !error.config._retry){
            error.config._retry = true
        }
        return Promise.reject(error)
    },
)

export default api