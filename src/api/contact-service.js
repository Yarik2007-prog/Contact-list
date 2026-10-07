import axios from "axios";

import { BASE_URL } from "../const/constants.js";

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type' : 'application/json'}
});
