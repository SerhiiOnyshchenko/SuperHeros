const API_URL = 'http://localhost:3030/heros';
const axios = require('axios').default;

export const fetchCountries = async (name = '', page = 1, _limit = 5) => {
   try {
      const response = await axios.get(
         `${API_URL}?q=${name}&_page=${page}&_limit=${_limit}`
      );
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
