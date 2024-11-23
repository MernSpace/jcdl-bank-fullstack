import React, {useEffect} from 'react';
import Dashbord from "../component/dashbord.jsx";
import CreateCustomerForm from "../component/customer/createCustomerForm.jsx";
import {useParams} from "react-router-dom";
import customerStore from "../state/customerState.js";

const UpdateCustomer = () => {
    const {id} = useParams();
    console.log(id);
    const {customerDetailRequest} = customerStore()
    useEffect(() => {
        ( async ()=>{
            await customerDetailRequest(id);
        })()
    }, [id]);
    return (
        <Dashbord>
            <CreateCustomerForm />
        </Dashbord>
    );
};

export default UpdateCustomer;