import axios from 'axios'
axios.defaults.baseURL = 'https://64f44f85932537f4051a3e4d.mockapi.io'

export const fetchContacts = async () => {
    const resp = await axios.get('/phonebook');
    return resp.data;
};