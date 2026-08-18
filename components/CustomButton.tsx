import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
}

const CustomButton = ({ title, onPress }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Button >
                <Text style={styles.text}>{title}</Text>
            </Button>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: "#1d1d1f",
        borderRadius: 5,
        marginTop: 10,
        width: "80%",
    },
    text: {
        color: "#f5f5f7",
        fontWeight: 900,
        fontSize: 16,
        textAlign: 'center',
    }
})