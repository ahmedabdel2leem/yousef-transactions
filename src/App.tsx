import { useState } from 'react'

import './App.css'
import CustomersTable from './Components/CustomersTable/CustomersTable'
import TransactionGraph from './Components/CustomerGraph/TransactionGraph'

import TransactionDetails from './Components/CustomerDetails/CustomerDetails'

function App() {


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
