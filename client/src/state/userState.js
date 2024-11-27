import {create} from 'zustand';
import axios  from "axios";
import {API} from '../helper/apiHelper'


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
        let res = await axios.post(`${API}/create-user`,postBody);
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


    loginUserRequest:async(postBody)=>{
        let res = await axios.post(`${API}/user-login`,postBody);
        return res.data['status'] ==='success'
    },
    userDetailRequest: async (id) => {
        try {
            const response = await axios.get(`${API}/user-detail/${id}`);
            console.log(response.data[0]);
            set({createUserFormData:response.data[0]})

        } catch (error) {
            console.error('Error fetching customer details:', error);
            // Handle error, e.g., display an error message to the user
        }
    },


    userData:[],

    readUserRequest:async()=>{
        let res = await axios.get(`${API}/read-user`);
        if (res){
            set({userData:res['data']})
        }else{
            set({userData:[]})
        }
    },

    updateUserRequest:async(ID,postBody)=>{
        let res = await axios.post(`${API}/user-update/${ID}`,postBody);
        return res.data['status'] === 'success'
    },

    deleteUserRequest:async(ID)=>{
        let res = await axios.get(`${API}/user-delete/${ID}`);
        return res.data['status'] === 'success'
    },

}))


export default userStore;