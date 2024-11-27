import {create} from 'zustand';
import axios  from "axios";
import {API_BASE_URL} from '../helper/apiHelper'

const addBalanceStore = create((set)=>({
    addBalanceFormData:{cusID:"",invoiceID:"",balance:""},
    addBalanceFormOnChange:(name,value)=>{
        set((state)=>({
            addBalanceFormData:{
                ...state.addBalanceFormData,
                [name]:value
            }
        }))
    },
    resetBalanceFormData: () => {
        set({
            addBalanceFormData: {
                cusID: "",
                invoiceID: "",
                balance: "",
            }
        });
    },
    addBalanceRequest:async(id,postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/add-balance/${id}`,postBody);
        return res.data['status'] ==='success'
    },

    customerDetailRequest: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/detail-customer/${id}`);
            console.log(response.data[0]);
            set({createCustomerFormData:response.data[0]})

        } catch (error) {
            console.error('Error fetching customer details:', error);
            // Handle error, e.g., display an error message to the user
        }
    },


    customerData:[],

    readCustomerRequest:async()=>{
        let res = await axios.get(`${API_BASE_URL}/read-customer`);
        if (res){
            set({customerData:res['data']})
        }else{
            set({customerData:[]})
        }
    },

    updateCustomerRequest:async(ID,postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/update-customer/${ID}`,postBody);
        return res.data['status'] === 'success'
    },

}))


export default addBalanceStore;