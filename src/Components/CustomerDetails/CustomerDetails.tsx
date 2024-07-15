import { useContext } from "react";

import CustomerContext from "../../Context/CustomersContext";
import { ITransactions } from "../../interface";



function TransactionDetails() {
    const { getCustomerById, getTransacitons, customerId } = useContext(CustomerContext);


    const customerTransactions = getTransacitons();
    let customer = getCustomerById(customerId)

    console.log(customer)
    // calc average

    return (

        <div className="w-1/2 bg-green-200 h-fit rounded-2xl overflow-scroll overflow-x-hidden ">
            <div>{customer?.name}</div>
            <ul className="space-y-6">
                {customerTransactions.map((trans: ITransactions) => {
                    return <li>{trans.amount}</li>
                })}

            </ul>
        </div>
    );
}

export default TransactionDetails;
