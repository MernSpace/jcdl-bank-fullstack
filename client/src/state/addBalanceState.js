import {create} from 'zustand';
import axios  from "axios";
import {API_BASE_URL} from '../helper/apiHelper'
import {getToken} from "../helper/SessionHelper.js";
const AxiosHeader={headers:{"token":getToken()}}


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
        let res = await axios.post(`${API_BASE_URL}/add-balance/${id}`,postBody,AxiosHeader);
        return res.data['status'] ==='success'
    },

    addBalanceDetailRequest: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/detail-add-balance/${id}`,AxiosHeader);
            console.log(response.data[0]);
            set({addBalanceFormData:response.data[0]})

        } catch (error) {
            console.error('Error fetching balance details:', error);
            // Handle error, e.g., display an error message to the user
        }
    },


    balanceData:[],

    readBalanceListRequest:async()=>{
        let res = await axios.get(`${API_BASE_URL}/add-all-balance`,AxiosHeader);
        if (res){
            set({balanceData:res['data']})
        }else{
            set({balanceData:[]})
        }
    },

    updateBalanceRequest:async(ID,postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/update-balance/${ID}`,postBody,AxiosHeader);
        return res.data['status'] === 'success'
    },
    deleteBalanceRequest:async(ID)=>{
        let res = await axios.get(`${API_BASE_URL}/delete-balance/${ID}`,AxiosHeader);
        return res.data['status'] === 'success'
    },



}))


export default addBalanceStore;