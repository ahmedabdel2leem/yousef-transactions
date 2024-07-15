import { createContext, ReactNode, useEffect, useState } from "react";
import { ICutomers, IRowData, ITransactions } from "../interface";
import axios from "axios";
import useQuery from "../utils/CustomeHook";
type IDataProvider = {
    children: ReactNode;
}
const CustomerContext = createContext<any>([]);
export const CustomersProvider = ({ children }: IDataProvider) => {
    // states
    const [customers, setCustomers] = useState<ICutomers[]>([])
    const [transactions, setTransactions] = useState<ITransactions[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
    const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
    const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | undefined>(undefined);
    const [sortByAmount, setSortByAmount] = useState<'asc' | 'desc' | undefined>(undefined);

    // TODO:
    // fetching
    useEffect(() => {

        axios.get('https://customer-transaction-api.onrender.com/customers').then(res => { setCustomers(res.data) }).catch(err => console.error(err))
        axios.get('https://customer-transaction-api.onrender.com/transactions').then(res => { setTransactions(res.data) }).catch(err => console.error(err))

    }, [])

    // TODO:
    // filtration
    const getCustomerById = (id: number) => customers.find(customer => customer.id == id);

    const filteredTransactions = transactions.filter(transaction => {
        const customer = getCustomerById(transaction.customer_id);
        return customer &&
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (minAmount === undefined || transaction.amount >= minAmount) &&
            (maxAmount === undefined || transaction.amount <= maxAmount);
    });


    // TODO:
    // Sort transactions by date
    if (sortByDate) {
        filteredTransactions.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            if (sortByDate === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    }
    const toggleSortByDate = () => {
        if (!sortByAmount) {
            setSortByDate(sortByDate === 'asc' ? 'desc' : 'asc');
        } else {
            setSortByDate('asc');
            setSortByAmount(undefined);
        }
    };

    // TODO:
    // Sort transactions by amount
    if (sortByAmount) {
        filteredTransactions.sort((a, b) => {
            if (sortByAmount === 'asc') {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });
    }

    const toggleSortByAmount = () => {
        if (!sortByDate) {
            setSortByAmount(sortByAmount === 'asc' ? 'desc' : 'asc');
        } else {
            setSortByAmount('asc');
            setSortByDate(undefined);
        }
    };
    const query = useQuery();
    const [customerId, setCustomerId] = useState(() => {
        const id = query.get('id');
        return id ? +id : 1;
    });

    useEffect(() => {
        const id = query.get('id');
        const newCustomerId = id ? +id : 1;
        if (newCustomerId !== customerId) {
            console.log(newCustomerId)
            setCustomerId(newCustomerId);
        }
    }, [query, customerId]);
    const getTransacitons = () => transactions.filter(trans => trans.customer_id == customerId);
    return (
        <CustomerContext.Provider value={{ getTransacitons, customerId, getCustomerById, filteredTransactions, toggleSortByAmount, toggleSortByDate, sortByAmount, sortByDate, maxAmount, minAmount, searchTerm, transactions, customers, setCustomers, setMaxAmount, setMinAmount, setSearchTerm }}>
            {children}
        </CustomerContext.Provider>

    )

};
export default CustomerContext;