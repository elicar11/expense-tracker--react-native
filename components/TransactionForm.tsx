import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Icon, TextInput, HelperText, Button } from 'react-native-paper'
import Title from './Title'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from './CustomButton'
import { DatePickerModal } from 'react-native-paper-dates';
import { Dropdown } from 'react-native-paper-dropdown';
import dayjs from 'dayjs'
import { categories, transactionTypes } from '@/constants'
import { addTransaction, editTransactionById } from '@/services/transactions'
import { useAuthStore } from '@/store/auth-store'
import Toast from 'react-native-toast-message'

interface TransactionFormProps {
    formType: "add" | "edit";
    initialData?: any; 
}

const TransactionForm = ({ formType, initialData }: TransactionFormProps) => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const { user } = useAuthStore()

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: "",
            amount: "",
            description: "",
            date: new Date(),
            type: "",
            category: "",
        },
    })

    // Charger les données dans le formulaire si on est en mode "edit"
    useEffect(() => {
        if (formType === "edit" && initialData) {
            reset({
                name: initialData.name,
                amount: initialData.amount.toString(),
                description: initialData.description || "",
                date: initialData.date ? new Date(initialData.date) : new Date(),
                type: initialData.type,
                category: initialData.category,
            });
        }
    }, [initialData, formType]);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            let response;

            const payload = {
                user_id: user?.id,
                name: data.name,
                amount: parseFloat(data.amount),
                description: data.description,
                date: data.date,
                type: data.type,
                category: data.category,
            };

            if (formType === "add") {
                response = await addTransaction(payload);
            } else {
                // Modification : on utilise l'ID de initialData
                response = await editTransactionById({
                    transactionId: Number(initialData.id),
                    payload: payload
                });
            }

            if (response && response.success) {
                Toast.show({
                    type: "success",
                    text1: response.message,
                })
                setTimeout(() => router.back(), 1500)
            } else {
                throw new Error(response?.message || "Operation failed");
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: error.message || "An error occurred"
            })
        } finally {
            setLoading(false)
        }
    }

    const dropdownTheme = {
        colors: {
            onSurface: 'black', 
            primary: 'black',   
            outline: 'black',   
            background: 'white'
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mainWrapper}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Icon source="arrow-left" size={24} color='black' />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Title title={formType === "add" ? "Add Transaction" : "Edit Transaction"} />
                        <Text style={styles.subtitle}>Fill in the details below</Text>
                    </View>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{ required: "Le nom est requis" }}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Transaction Name"
                                    mode="outlined"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={styles.input}
                                    outlineColor="black"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    left={<TextInput.Icon icon="tag" color="black" />}
                                />
                            )}
                        />
                        {errors.name && <HelperText type="error">{errors.name.message}</HelperText>}
                    </View>

                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{ required: "Le montant est requis" }}
                            name="amount"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Amount"
                                    mode="outlined"
                                    keyboardType="numeric"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={styles.input}
                                    outlineColor="black"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    left={<TextInput.Icon icon="currency-eur" color="black" />}
                                />
                            )}
                        />
                        {errors.amount && <HelperText type="error">{errors.amount.message}</HelperText>}
                    </View>

                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Description (Optional)"
                                    mode="outlined"
                                    multiline
                                    numberOfLines={3}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={[styles.input, { height: 100 }]}
                                    outlineColor="black"
                                    activeOutlineColor="black"
                                    textColor="black"
                                />
                            )}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Button
                                        onPress={() => setOpen(true)}
                                        mode="outlined"
                                        textColor='black'
                                        style={{ borderColor: 'black', backgroundColor: 'white' }}
                                        icon="calendar"
                                    >
                                        {value ? dayjs(value).format('DD/MM/YYYY') : "Pick a date"}
                                    </Button>
                                    <DatePickerModal
                                        locale="en"
                                        mode="single"
                                        visible={open}
                                        onDismiss={onDismissSingle}
                                        date={value ? dayjs(value).toDate() : dayjs().toDate()}
                                        onConfirm={(params) => {
                                            setOpen(false)
                                            onChange(params.date)
                                        }}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{ required: "Le type est requis" }}
                            name="type"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.input}>
                                    <Dropdown
                                        label="Type"
                                        placeholder="Select Type"
                                        options={transactionTypes}
                                        value={value}
                                        onSelect={onChange}
                                        mode='outlined'
                                        theme={dropdownTheme}
                                    />
                                </View>
                            )}
                        />
                        {errors.type && <HelperText type="error">{errors.type.message}</HelperText>}
                    </View>

                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{ required: "La catégorie est requise" }}
                            name="category"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.input}>
                                    <Dropdown
                                        label="Category"
                                        placeholder="Select Category"
                                        options={categories}
                                        value={value}
                                        onSelect={onChange}
                                        mode='outlined'
                                        theme={dropdownTheme}
                                    />
                                </View>
                            )}
                        />
                        {errors.category && <HelperText type="error">{errors.category.message}</HelperText>}
                    </View>
                </View>

                <CustomButton
                    title={loading ? "Processing..." : (formType === "add" ? "Add Transaction" : "Update Transaction")}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f7" },
    mainWrapper: { padding: 20, gap: 20 },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    backButton: { padding: 5 },
    titleContainer: { flex: 1 },
    subtitle: { color: "#766363", fontSize: 14 },
    form: { gap: 10 },
    inputWrapper: { marginBottom: 5 },
    input: { backgroundColor: "white" },
    errorText: { color: 'red' }
})

export default TransactionForm