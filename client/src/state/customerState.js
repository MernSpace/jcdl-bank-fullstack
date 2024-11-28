import {create} from 'zustand';
import axios  from "axios";
import {API_BASE_URL} from '../helper/apiHelper'
import {getToken} from "../helper/SessionHelper.jsx";
const AxiosHeader={headers:{"token":getToken()}}


const customerStore = create((set)=>({
    createCustomerFormData:{fName:"",lName:"",address:"",phone:'',balance:""},
    CustomerFormOnChange:(name,value)=>{
        set((state)=>({
            createCustomerFormData:{
                ...state.createCustomerFormData,
                [name]:value
            }
        }))
    },
    resetFormData: () => {
        set({
            createCustomerFormData: {
                fName: "",
                lName: "",
                address: "",
                phone: '',
                balance: "",
            }
        });
    },
    createCustomerRequest:async(postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/create-customer`,postBody,AxiosHeader);
        return res.data['status'] ==='success'
    },

    customerDetailRequest: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/detail-customer/${id}`,AxiosHeader);
            console.log(response.data[0]);
            set({createCustomerFormData:response.data[0]})

        } catch (error) {
            console.error('Error fetching customer details:', error);
            // Handle error, e.g., display an error message to the user
        }
    },


    customerData:[],

    readCustomerRequest:async()=>{
        let res = await axios.get(`${API_BASE_URL}/read-customer`,AxiosHeader);
        if (res){
            set({customerData:res['data']})
        }else{
            set({customerData:[]})
        }
    },

    updateCustomerRequest:async(ID,postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/update-customer/${ID}`,postBody,AxiosHeader);
        return res.data['status'] === 'success'
    },

}))


export default customerStore;