import React, {useEffect} from 'react';
import addBalanceStore from "../../state/addBalanceState.js";

const AddBalanceList = () => {
    const {readBalanceListRequest}= addBalanceStore()
    useEffect(() => {
        (async ()=>{
            await readBalanceListRequest()
        })()
    }, []);
    return (
        <div>

        </div>
    );
};

export default AddBalanceList;