import React, {useEffect} from 'react';
import Dashbord from '../component/dashbord';
import CreateCustomerForm from "../component/customer/createCustomerForm";

const createCustomer = () => {

    return (
        <Dashbord>
        <CreateCustomerForm />
        </Dashbord>
    );
};

export default createCustomer;