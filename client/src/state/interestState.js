import {create} from 'zustand';
import axios  from "axios";
import {API_BASE_URL} from '../helper/apiHelper'
import {getToken} from "../helper/SessionHelper.js";
const AxiosHeader={headers:{"token":getToken()}}


const interestStore = create((set)=>({
    interestFormData:{cusID:"",invoiceID:"",balance:""},
    interestFormOnChange:(name,value)=>{
        set((state)=>({
            interestFormData:{
                ...state.interestFormData,
                [name]:value
            }
        }))
    },
    resetInterestFormData: () => {
        set({
            interestFormData: {
                cusID: "",
                invoiceID: "",
                balance: "",
            }
        });
    },
    addInterestRequest:async(id,postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/add-interest/${id}`,postBody,AxiosHeader);
        return res.data['status'] ==='success'
    },

    addBalanceDetailRequest: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/detail-interest-balance/${id}`,AxiosHeader);
            console.log(response.data[0]);
            set({addBalanceFormData:response.data[0]})

        } catch (error) {
            console.error('Error fetching balance details:', error);
            // Handle error, e.g., display an error message to the user
        }
    },


    interestBalanceData:[],

    readBalanceListRequest:async()=>{
        let res = await axios.get(`${API_BASE_URL}/all-interest-balance`,AxiosHeader);
        if (res){
            set({interestBalanceData:res['data']})
        }else{
            set({interestBalanceData:[]})
        }
    },

    updateBalanceRequest:async(ID,postBody)=>{
        let res = await axios.post(`${API_BASE_URL}/update-interest/${ID}`,postBody,AxiosHeader);
        return res.data['status'] === 'success'
    },
    deleteBalanceRequest:async(ID)=>{
        let res = await axios.get(`${API_BASE_URL}/delete-interest/${ID}`,AxiosHeader);
        return res.data['status'] === 'success'
    },



}))


export default interestStore;