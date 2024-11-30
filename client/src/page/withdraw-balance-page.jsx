import React from 'react';
import Dashboard from "../component/dashboard.jsx";
import WithdrawBalanceForm from "../component/balance/withdrawBalanceForm.jsx";

const WithdrawBalancePage = () => {
    return (
        <Dashboard>
            <WithdrawBalanceForm/>
        </Dashboard>
    );
};

export default WithdrawBalancePage;