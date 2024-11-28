import React, {useEffect} from 'react';
import Dashboard from "../component/dashboard.jsx";
import CreateCustomerForm from "../component/customer/createCustomerForm.jsx";
import {useParams} from "react-router-dom";
import customerStore from "../state/customerState.js";
import Table from "react-bootstrap/Table";

const UpdateCustomer = () => {
    const {id} = useParams();
    const {customerDetailRequest,customerBalanceDetailRequest,balanceDetail} = customerStore()
    useEffect(() => {
        ( async ()=>{
            await customerDetailRequest(id);
            await customerBalanceDetailRequest(id)

        })()
    }, [id]);
    console.log(balanceDetail)
    return (
        <Dashboard>
            <CreateCustomerForm/>
            <div className=' px-3  mt-5'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                        <th>Customer Address</th>
                        <th>Invoice No:</th>
                        <th>Balance</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {balanceDetail.length > 0 ? (
                        balanceDetail.map((customer, index) => {
                            let formattedDate = ""; // Default value

                            if (customer.customerBalanceDetails && customer.customerBalanceDetails.createdAt) {
                                const createdDate = new Date(customer.customerBalanceDetails.createdAt);

                                // Format the createdAt date (Example: "DD/MM/YYYY")
                                formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;
                            } else {
                                // Provide a fallback if createdAt doesn't exist
                                formattedDate = "N/A"; // You can set any default value or leave it blank
                            }
                            const invoiceID = customer.customerBalanceDetails && customer.customerBalanceDetails.invoiceID
                                ? customer.customerBalanceDetails.invoiceID
                                : "N/A"; // Default if invoiceID is missing

                            const balance = customer.customerBalanceDetails && customer.customerBalanceDetails.balance
                                ? customer.customerBalanceDetails.balance
                                : "N/A"; // Default if balance is missing

                            return (
                                <tr key={customer.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{customer.fName}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                    <td>{invoiceID}</td>
                                    <td>{balance}</td>
                                    <td>{formattedDate}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan="7">No customers available</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </Dashboard>
    );
};

export default UpdateCustomer;