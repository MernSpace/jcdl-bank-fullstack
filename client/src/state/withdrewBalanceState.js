import {create} from "zustand";

import axios  from "axios";
import {API_BASE_URL} from '../helper/apiHelper'
import {getToken} from "../helper/SessionHelper.js";
const AxiosHeader={headers:{"token":getToken()}}


const withdrewBalanceStore = create((set)=>({
    withdrewBalanceFormData: {cusID: "", invoiceID: "", balance: ""},
    withdrawBalanceFormOnChange: (name, value) => {
        set((state) => ({
            withdrewBalanceFormData: {
                ...state.withdrewBalanceFormData,
                [name]: value
            }
        }))
    },
    resetWithdrewBalanceForm: () => {
        set({
            withdrewBalanceFormData: {
                cusID: "",
                invoiceID: "",
                balance: "",
            }
        });
    },
    withdrawBalanceRequest: async (id, postBody) => {
        let res = await axios.post(`${API_BASE_URL}/withdraw-balance/${id}`, postBody, AxiosHeader)
        return res.data['status'] === 'success'
    },
    withdrewBalanceList:[],

    withdrewBalanceListRequest:async ()=>{
        let res = await axios.get(`${API_BASE_URL}/withdraw-balance-list`,AxiosHeader)
        set({withdrewBalanceList:res.data})
    },
    customerWithdrewBalanceList:[],
    withdrewBalanceListByID:async(ID)=>{
        let res = await axios.get(`${API_BASE_URL}/customer-withdraw-balance-list/${ID}`,AxiosHeader)
        console.log(res.data)
        set({customerWithdrewBalanceList:res.data})
    }
}))


export default withdrewBalanceStore;