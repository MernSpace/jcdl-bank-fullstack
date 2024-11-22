import React from 'react';
import Table from "react-bootstrap/Table";
import customerStore from "../../state/customerState.js";
import {useNavigate} from "react-router-dom";


const CusList = () => {
    const navigate = useNavigate();
    const {customerData} = customerStore();
    const onClick = (id) => {
        if (id) {
            console.log('Customer ID:', id);  // Logs the ID if it exists
            navigate(`/update-customer/${id}`);
        } else {
            console.error('No ID found');  // Logs an error if ID is undefined
        }
    };
    return (
               <div>
                   <div className=''>
                       <div className=''>
                           <div className=''>
                               <div className=' px-3  mt-5'>
                                   <Table striped bordered hover>
                                       <thead>
                                       <tr>
                                           <th>#</th>
                                           <th>Customer First Name</th>
                                           <th>Customer Last Name</th>
                                           <th>Customer Phone</th>
                                           <th>Customer Address</th>
                                           <th>Customer Balance</th>
                                           <th>Customer Detail</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       {customerData.length > 0 ? (
                                           customerData.map((customer, index) => (
                                               <tr key={customer.id || index}>
                                                   <td>{index + 1}</td>
                                                   <td>{customer.fName}</td>
                                                   <td>{customer.lName}</td>
                                                   <td>{customer.phone}</td>
                                                   <td>{customer.address}</td>
                                                   <td>{customer.balance}</td>
                                                   <td>

                                                       <button onClick={() => {
                                                           console.log(customer);  // Check the customer object
                                                           onClick(customer._id);
                                                       }} className="btn btn-success w-100">
                                                           Detail
                                                       </button>
                                                   </td>

                                               </tr>
                                           ))
                                       ) : (
                                           <tr>
                                           <td colSpan="7">No customers available</td>
                                           </tr>
                                       )}
                                       </tbody>
                                   </Table>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

    );
};

export default CusList;