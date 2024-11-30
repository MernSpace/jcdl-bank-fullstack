import {create} from 'zustand';
import axios  from "axios";
import {API_BASE_URL} from '../helper/apiHelper'
import {setToken,getToken} from "../helper/SessionHelper.js";
const AxiosHeader={headers:{"token":getToken()}}

const userStore = create((set)=>({
    createUserFormData:{Name:"",email:"",password:"",phone:''},
    userFormOnChange:(name,value)=>{
        set((state)=>({
            createUserFormData:{
                ...state.createUserFormData,
                [name]:value
            }
        }))
    },
    resetFormData: () => {
        set({
            createUserFormData: {
                Name: "",
                email: "",
                password: "",
                phone: ''
            }
        });
    },
    createUserRequest:async(postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/create-user`,postBody);
        return res.data['status'] ==='success'
    },

    loginUserFormData:{email:"",password:""},

    loginFormOnChange:(name,value)=>{
        set((state)=>({
            loginUserFormData:{
                ...state.loginUserFormData,
                [name]:value
            }
        }))
    },
    resetLoginFormData: () => {
        set({
            loginUserFormData: {
                email: "",
                password: "",
            }
        });
    },


    loginUserRequest:async(postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/user-login`,postBody);
        setToken(res.data.token)
        return res.data['status'] ==='success'
    },
    userDetailRequest: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user-detail/${id}`,AxiosHeader);
            set({createUserFormData:response.data[0]})

        } catch (error) {
            console.error('Error fetching customer details:', error);
            // Handle error, e.g., display an error message to the user
        }
    },


    userData:[],

    readUserRequest:async()=>{
        let res = await axios.get(`${API_BASE_URL}/read-user`);
        if (res){
            set({userData:res['data']})
        }else{
            set({userData:[]})
        }
    },

    updateUserRequest:async(ID,postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/user-update/${ID}`,postBody);
        return res.data['status'] === 'success'
    },

    deleteUserRequest:async(ID)=>{
        let res = await axios.get(`${API_BASE_URL}/user-delete/${ID}`);
        return res.data['status'] === 'success'
    },

}))


export default userStore;