import axios from "axios";

export const API_URL = "http://192.168.163.152:3000/";

export const login_user = (email, password)=> {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.auth_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

export const logout_user = () => {
    localStorage.removeItem("user");
  }

export const register_user = (name, email, bio, password) => {
    return axios.post(API_URL + "signup", {
      username:name,
      description:bio,
      email:email,
      password:password
    });
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}