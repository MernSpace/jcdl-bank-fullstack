import React, {useEffect} from 'react';
import Dashboard from '../component/dashboard.jsx';
import CreateCustomerForm from "../component/customer/createCustomerForm";

const createCustomer = () => {

    return (
        <Dashboard>
        <CreateCustomerForm />
        </Dashboard>
    );
};

export default createCustomer;