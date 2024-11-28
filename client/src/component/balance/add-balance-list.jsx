import React, {useEffect} from 'react';
import addBalanceStore from "../../state/addBalanceState.js";
import Table from "react-bootstrap/Table";

const AddBalanceList = () => {
    const {readBalanceListRequest,balanceData}= addBalanceStore()
    useEffect(() => {
        (async ()=>{
            await readBalanceListRequest()
        })()
    }, []);

    return (
        <div>
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
                    {balanceData.length > 0 ? (
                        balanceData.map((customer, index) => {
                            const createdDate = new Date(customer.createdAt);

                            // Format the createdAt date (Example: "DD/MM/YYYY")
                            const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;

                           return (
                               <tr key={customer.id || index}>
                                   <td>{index + 1}</td>
                                   <td>{customer.customerDetails.fName}</td>
                                   <td>{customer.customerDetails.phone}</td>
                                   <td>{customer.customerDetails.address}</td>
                                   <td>{customer.invoiceID}</td>
                                   <td>{customer.balance}</td>
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
        </div>
    );
};

export default AddBalanceList;