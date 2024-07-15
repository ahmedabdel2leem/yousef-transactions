import { useState } from 'react'

import './App.css'
import CustomersTable from './Components/CustomersTable/CustomersTable'
import TransactionGraph from './Components/CustomerGraph/TransactionGraph'
import CustomerDetails from './Components/CustomerDetails/CustomerDetails'
import TransactionDetails from './Components/CustomerDetails/CustomerDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomersTable />
      <div className='flex space-x-3' >

        <TransactionGraph />
        <TransactionDetails />
      </div>

    </>
  )
}

export default App
