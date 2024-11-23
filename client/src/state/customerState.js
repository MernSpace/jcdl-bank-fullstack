import {create} from 'zustand';
import axios  from "axios";


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
        let res = await axios.post('http://localhost:5050/api/v1/create-customer',postBody);
        return res.data['status'] ==='success'
    },

    customerDetailRequest: async (id) => {
        try {
            const response = await axios.get(`http://localhost:5050/api/v1/detail-customer/${id}`);
            console.log(response.data[0]);
            set({createCustomerFormData:response.data[0]})

        } catch (error) {
            console.error('Error fetching customer details:', error);
            // Handle error, e.g., display an error message to the user
        }
    },


    customerData:[],

    readCustomerRequest:async()=>{
        let res = await axios.get(`http://localhost:5050/api/v1/read-customer`);
        if (res){
            set({customerData:res['data']})
        }else{
            set({customerData:[]})
        }
    },

    updateCustomerRequest:async(ID,postBody)=>{
        let res = await axios.post(`http://localhost:5050/api/v1/update-customer/${ID}`,postBody);
        return res.data['status'] === 'success'
    },

}))


export default customerStore;