import React, {useEffect} from 'react';
import Dashboard from "../component/dashboard.jsx";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import customerStore from "../state/customerState.js";
import interestStore from "../state/interestState.js";
import addBalanceStore from "../state/addBalanceState.js";
import withdrewBalanceState from "../state/withdrewBalanceState.js";


const HomePage = () => {
    const {readCustomerRequest,customerData} = customerStore();
    const {balanceData,readBalanceListRequest} = addBalanceStore();
    const {readInterestBalanceListRequest,interestBalanceData} = interestStore()
    const {withdrewBalanceListRequest,withdrewBalanceList} = withdrewBalanceState()
    useEffect(() => {
        (async ()=>{
           await readCustomerRequest()
            await readBalanceListRequest()
            await readInterestBalanceListRequest()
            await withdrewBalanceListRequest()
        })()
    }, []);

    const interestTotal = balanceData.reduce((total,item)=>{
        return total + item.balance;
    },0)

    const totalBalance = customerData.reduce((total, customer) => {
        return total + customer.balance;
    }, 0);
    const generateDailyReport = (data) => {
        // Group the data by createdAt (date)
        const report = data.reduce((acc, { createdAt, balance, invoiceID }) => {
            if (!acc[createdAt]) {
                acc[createdAt] = {
                    totalInvoices: 0,
                    totalBalance: 0,
                    invoiceDetails: [],
                };
            }

            // Add balance and invoice information
            acc[createdAt].totalInvoices += 1;
            acc[createdAt].totalBalance += balance;
            acc[createdAt].invoiceDetails.push({
                invoiceID,
                balance,
            });

            return acc;
        }, {});

        // Convert to an array format similar to your example
        return Object.keys(report).map((date) => ({
            name: date,
            totalInvoices: report[date].totalInvoices,
            totalBalance: report[date].totalBalance,
            invoiceDetails: report[date].invoiceDetails,
        }));
    };

    const dailyReport = generateDailyReport(interestBalanceData);

    const dailyAddBalanceReport = generateDailyReport(balanceData)
    const dailyWithdrewBalanceReport = generateDailyReport(withdrewBalanceList)








    return (
        <Dashboard>
            <div className='d-flex align-items-center justify-content-between px-5 my-5'>
                <div className='card bg-success text-center p-3 text-white shadow-lg'>
                    <h2>Total Customer</h2>
                    <div className='d-flex align-items-center justify-content-center'>
                        <i className="bi bi-people-fill px-2 fs-3"></i>
                        <h3 className='fs-2'>{customerData.length}</h3>
                    </div>
                </div>
                <div className='card bg-warning text-center p-3 text-white shadow-lg'>
                    <h2>Total Deposit Balance</h2>
                    <h3>$ {totalBalance}</h3>

                </div>
                <div className='card bg-danger text-center p-3 text-white shadow-lg'>
                    <h2>Total Interest</h2>
                    <h3>${interestTotal}</h3>
                </div>
            </div>
            <div className=' d-flex align-items-center justify-content-between'>
                <div className='w-100'>
                    <h2 className='text-center mx-3'>Add Balance Reports</h2>
                    <BarChart
                        width={650}
                        height={400}
                        data={dailyReport}  // Ensure this data matches the structure you created
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />

                        <Bar yAxisId="left" dataKey="totalInvoices" fill="#8884d8" />

                        <Bar yAxisId="right" dataKey="totalBalance" fill="#82ca9d" />
                    </BarChart>

                </div>

                <div className='w-100'>
                    <h2 className='text-center mx-3'>Add Interest Reports</h2>
                    <BarChart
                        width={650}
                        height={400}
                        data={dailyAddBalanceReport}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                        <Tooltip/>
                        <Legend/>

                        <Bar yAxisId="left" dataKey="totalInvoices" fill="#8884d8"/>

                        <Bar yAxisId="right" dataKey="totalBalance" fill="#82ca9d"/>
                    </BarChart>
                </div>
            </div>
            <hr/>
            <div className=''>
                <h2 className='text-center mx-2'>Withdrew Balance Reports</h2>
                <BarChart
                    width={1300}
                    height={400}
                    data={dailyWithdrewBalanceReport}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                    <Tooltip/>
                    <Legend/>

                    <Bar yAxisId="left" dataKey="totalInvoices" fill="#8884d8"/>

                    <Bar yAxisId="right" dataKey="totalBalance" fill="#82ca9d"/>
                </BarChart>
            </div>
        </Dashboard>
    );
};

export default HomePage;




