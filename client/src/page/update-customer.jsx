import React, {useEffect} from 'react';
import Dashboard from "../component/dashboard.jsx";
import CreateCustomerForm from "../component/customer/createCustomerForm.jsx";
import {useParams} from "react-router-dom";
import customerStore from "../state/customerState.js";
import Table from "react-bootstrap/Table";
import withdrewBalanceState from "../state/withdrewBalanceState.js";
import interestStore from "../state/interestState.js";

const UpdateCustomer = () => {
    const {id} = useParams();
    const {customerDetailRequest,customerBalanceDetailRequest,balanceDetail} = customerStore()
    const {withdrewBalanceListByID,customerWithdrewBalanceList} = withdrewBalanceState()
    const {customerInterestBalanceListRequest,customerInterestList} = interestStore()
    useEffect(() => {
        ( async ()=>{
            await customerDetailRequest(id);
            await customerBalanceDetailRequest(id)
            await withdrewBalanceListByID(id);
            await customerInterestBalanceListRequest(id);

        })()
    }, [id]);
    console.log(customerInterestList)
    return (
        <Dashboard>
            <CreateCustomerForm/>
            <div className='px-3 mt-5'>
                <p className='gap-2'>
                    <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExampleOne" role="button"
                       aria-expanded="false" aria-controls="collapseExampleOne">
                        Add Balance History
                    </a>
                    <button className="btn btn-danger mx-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExampleTwo" aria-expanded="false"
                            aria-controls="collapseExampleTwo">
                        Withdrew Balance History
                    </button>
                    <button className="btn btn-success mx-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExampleThree" aria-expanded="false"
                            aria-controls="collapseExampleThree">
                        Interest Balance History
                    </button>
                </p>
            </div>
            <div className="collapse show" id="collapseExampleOne">
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
            <div className="collapse" id="collapseExampleTwo">
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
                    {customerWithdrewBalanceList.length > 0 ? (
                        customerWithdrewBalanceList.map((customer, index) => {
                            let formattedDate = ""; // Default value

                            // Check if createdAt exists and format it
                            if (customer.customerWithdrewDetails && customer.customerWithdrewDetails.createdAt) {
                                const createdDate = new Date(customer.customerWithdrewDetails.createdAt);
                                formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;
                            } else {
                                formattedDate = "N/A"; // Default if createdAt doesn't exist
                            }

                            // Handle invoiceID and balance from the main customer object
                            const invoiceID = customer.invoiceID ? customer.invoiceID : "N/A";  // Default if invoiceID is missing
                            const balance = customer.balance ? customer.balance : "N/A";  // Default if balance is missing

                            // Return the table row for each customer
                            return (
                                <tr key={customer._id || index}> {/* Unique key based on _id */}
                                    <td>{index + 1}</td>
                                    {/* Index as serial number */}
                                    <td>{customer.customerWithdrewDetails.fName} {customer.customerWithdrewDetails.lName}</td>
                                    <td>{customer.customerWithdrewDetails.phone}</td>
                                    <td>{customer.customerWithdrewDetails.address}</td>
                                    <td>{invoiceID}</td>
                                    <td>{balance}</td>
                                    <td>{formattedDate}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="7">No customers available</td>
                        </tr>
                    )}

                    </tbody>
                </Table>
            </div>
            <div className="collapse" id="collapseExampleThree">
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
                    {customerInterestList.length > 0 ? (
                        customerInterestList.map((customer, index) => {
                            let formattedDate = ""; // Default value

                            // Check if createdAt exists and format it
                            if (customer.customerInterestDetails && customer.customerInterestDetails.createdAt) {
                                const createdDate = new Date(customer.customerInterestDetails.createdAt);
                                formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;
                            } else {
                                formattedDate = "N/A"; // Default if createdAt doesn't exist
                            }

                            // Handle invoiceID and balance from the main customer object
                            const invoiceID = customer.invoiceID ? customer.invoiceID : "N/A";  // Default if invoiceID is missing
                            const balance = customer.balance ? customer.balance : "N/A";  // Default if balance is missing

                            // Return the table row for each customer
                            return (
                                <tr key={customer._id || index}> {/* Unique key based on _id */}
                                    <td>{index + 1}</td>
                                    {/* Index as serial number */}
                                    <td>{customer.customerInterestDetails.fName} {customer.customerInterestDetails.lName}</td>
                                    <td>{customer.customerInterestDetails.phone}</td>
                                    <td>{customer.customerInterestDetails.address}</td>
                                    <td>{invoiceID}</td>
                                    <td>{balance}</td>
                                    <td>{formattedDate}</td>
                                </tr>
                            );
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