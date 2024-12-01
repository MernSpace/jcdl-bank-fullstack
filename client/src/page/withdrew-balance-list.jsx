import React from 'react';
import Dashboard from "../component/dashboard.jsx";
import BalanceList from "../component/withdrewBalance/balance-list.jsx";

const WithdrewBalanceList = () => {
    return (
        <Dashboard>
            <BalanceList />
        </Dashboard>
    );
};

export default WithdrewBalanceList;