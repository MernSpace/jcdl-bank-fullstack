import React, {useEffect} from 'react';
import Dashboard from "../component/dashbord.jsx";
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
import userStore from "../state/userState.js";


const HomePage = () => {
    const {readCustomerRequest,customerData} = customerStore();
    const {userDetailRequest} = userStore()
    useEffect(() => {
        (async ()=>{
           await readCustomerRequest()
            await userDetailRequest('6747f4336a161df8d90a5c02')

        })()
    }, []);
    const totalBalance = customerData.reduce((total, customer) => {
        return total + customer.balance;
    }, 0);
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ];
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
                    <h3>$50000</h3>
                </div>
            </div>
            <div className=' d-flex align-items-center justify-content-between'>
                <div>
                    <BarChart
                        width={650}
                        height={400}
                        data={data}
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
                        <Bar yAxisId="left" dataKey="pv" fill="#8884d8"/>
                        <Bar yAxisId="right" dataKey="uv" fill="#82ca9d"/>
                    </BarChart>
                </div>
                <div>
                    <BarChart
                        width={650}
                        height={400}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar yAxisId="right" dataKey="uv" fill="#82ca9d"/>
                    </BarChart>
                </div>
            </div>
        </Dashboard>
    );
};

export default HomePage;




