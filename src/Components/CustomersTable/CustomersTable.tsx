import { useContext } from "react"
import CustomerContext from "../../Context/CustomersContext"
import { ICutomers, ITransactions } from "../../interface";

function CustomersTable({ }) {
    const { searchTerm, setSearchTerm, minAmount, setMinAmount, maxAmount, setMaxAmount, getCustomerById, filteredTransactions } = useContext(CustomerContext)

    const handelClick = (e: any) => {

        const newUrl = `${window.location.pathname}?id=${e}`;
        window.history.replaceState(null, '', newUrl);
        const event = new PopStateEvent('popstate');
        window.dispatchEvent(event);
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-4 lg:space-x-20">
                <div className="flex flex-col">
                    {/* <label htmlFor="search" className="text-start font-semibold ">Name</label> */}
                    <input
                        type="text"
                        id="search"
                        className="placeholder-gray-300  bg-opacity-20 bg-green-300  focus:placeholder-transparent  text-white rounded-[.40rem]  py-2 px-3 outline-none "
                        placeholder="Search by name . . ."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    {/* <div className="text-start font-semibold ">Amount Range</div> */}
                    <div className="flex lg:flex-row flex-col gap-2">
                        <input
                            type="text"
                            className="w-32  placeholder-gray-300 bg-opacity-20 bg-green-300 text-whitefocus:placeholder-transparent   rounded-[.40rem]  py-2 px-3 outline-none "
                            placeholder="Min Amount"
                            value={minAmount === undefined ? '' : minAmount}
                            onChange={(e) => setMinAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        />
                        <input
                            type="text"
                            className="w-32 placeholder-gray-300 bg-opacity-20 bg-green-300 text-white focus:placeholder-transparent   rounded-[.40rem]  py-2 px-3 outline-none"
                            placeholder="Max Amount"
                            value={maxAmount === undefined ? '' : maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            </div >

            <div className="w-full  h-[400px] overflow-scroll overflow-x-hidden scrollbar">
                <table className="table-auto divide-y-2  w-full ">
                    <thead className="">
                        <tr className="">
                            <td className="customerName px-4">NAME</td>
                            <td className="customerTransactions uppercase p-4">customer transactions</td>
                            <td className="customerTransactions uppercase p-4">transaction amount</td>
                        </tr>
                    </thead>
                    <tbody className="">
                        {filteredTransactions.map((transaction: ITransactions) => {
                            const customer: ICutomers = getCustomerById(transaction.customer_id);
                            return (
                                <tr onClick={() => handelClick(transaction.customer_id)} className="space-x-10 even:bg-green-100 hover:even:bg-emerald-300 hover:odd:bg-slate-100 cursor-pointer transition-all duration-500 ">
                                    <td className="py-4">{customer.name}</td>
                                    <td className="py-4">
                                        <div>
                                            {new Date(transaction.date).toLocaleDateString()}
                                            {transaction.amount}
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        ${transaction.amount}
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomersTable