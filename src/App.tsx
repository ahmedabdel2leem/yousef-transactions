import { useState } from 'react'

import './App.css'
import CustomersTable from './Components/CustomersTable/CustomersTable'
import TransactionGraph from './Components/CustomerGraph/TransactionGraph'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomersTable />
      <TransactionGraph />
    </>
  )
}

export default App
