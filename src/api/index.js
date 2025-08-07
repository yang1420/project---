import axios from "../utils/request.js"
import base from "./base.js"

const api = {
    /**
     * login
     */
    getLogin(params) {
      return axios.post(base.baseUrl + base.login, params)//This is the post method to send a request,这个是post方法发送请求,
     },
    get_Menu(params){

        return axios.get(base.baseUrl + base.get_menu, {params})//This is the get method to send a request
    },
    get_user_list(params){
        return axios.get(base.baseUrl + base.get_users, {params})//This is the get method to send a request
    }

  }

  
  export default api

