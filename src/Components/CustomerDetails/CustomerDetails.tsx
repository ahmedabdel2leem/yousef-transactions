import { useContext } from "react";
import CustomerContext from "../../Context/CustomersContext";
import { ITransactions } from "../../interface";

type Props = {

}

function CustomerDetails({ }: Props) {
    const { getTransacitons, getCustomerById, custoemrId } = useContext(CustomerContext);
    const amounts = getTransacitons().map((transaction: ITransactions) => transaction.amount);
    const customer = getCustomerById(custoemrId)
    return (
        <div></div>
    )
}

export default CustomerDetails