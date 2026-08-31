import { View, Text } from 'react-native'
import React from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'
import TransactionForm from '@/components/TransactionForm'

const Addtransaction = () => {
  return (
    <SafeAreaLayoutWrapper>
      <TransactionForm formType='add'/>
    </SafeAreaLayoutWrapper>
  )
}

export default Addtransaction