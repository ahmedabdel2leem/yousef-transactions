
import { Chart, CategoryScale, Filler, PointElement, LineElement, Title, Tooltip, Legend, LinearScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { ITransactions } from "../../interface";
import CustomerContext from "../../Context/CustomersContext";


type Props = {};

Chart.register(Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TransactionGraph({ }: Props) {
    const { getTransacitons } = useContext(CustomerContext);

    const amounts = getTransacitons().map((transaction: ITransactions) => transaction.amount);
    const options = {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        scales: {

            x: {
                ticks: {
                    padding: 10
                }
            }
        }
    };


    const data = {
        labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Transaction',
                data: amounts,
                fill: true, // Set to true to enable fill
                borderColor: '#000',
                backgroundColor: 'transparent',

                tension: .4,
                borderWidth: 7
            }
        ]
    };


    return (
        <div className="w-full h-[400px] ">
            <div className="relative w-full h-full "> {/* Set fixed height for the chart */}
                <Line options={options} data={data} />
            </div>
        </div>
    );
}

export default TransactionGraph;
