import { StyleSheet, Text } from 'react-native'
import React from 'react'

interface TitleProps {
    title: string,
}

const Title = ({ title }: TitleProps) => {
  return (
      <Text style={styles.title}>{title}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 20,
        color: '#1d1d1f',
    },
})