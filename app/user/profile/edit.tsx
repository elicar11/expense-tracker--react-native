import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { TextInput, HelperText, Icon } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { updateFullProfile } from '@/services/users';
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper';
import Title from '@/components/Title';
import CustomButton from '@/components/CustomButton';
import Toast from 'react-native-toast-message';

const EditProfileScreen = () => {
    const router = useRouter();
    const { user, setUser } = useAuthStore(); // On récupère setUser pour mettre à jour l'état global
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "" // Vide par défaut car on ne veut pas forcément le changer
        },
    });

    const onSubmit = async (data: any) => {
        if (!user?.id) return;
        
        setLoading(true);
        // On prépare l'objet à envoyer au service
        const updatePayload = {
            name: data.name,
            email: data.email,
            password: data.password !== "" ? data.password : undefined // On n'envoie le password que s'il est saisi
        };

        const res = await updateFullProfile(String(user.id), updatePayload);
        
        if (res.success) {
            if (user) {
                setUser({ 
                    ...user, 
                    name: data.name, 
                    email: data.email 
                });
            }
            
            Toast.show({
                type: 'success',
                text1: 'Profile Updated',
                text2: res.message
            });
            router.back();
        } else {
            Toast.show({
                type: 'error',
                text1: 'Update Failed',
                text2: res.message
            });
        }
        setLoading(false);
    };

    return (
        <SafeAreaLayoutWrapper>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Icon source="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Title title="Edit Profile" />
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <Controller
                        control={control}
                        rules={{ required: "Name is required" }}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                mode="outlined"
                                onChangeText={onChange}
                                value={value}
                                placeholder="Your full name"
                                style={styles.input}
                                outlineColor="black"
                                activeOutlineColor="black"
                                textColor="black"
                                left={<TextInput.Icon icon="account" color="black" />}
                            />
                        )}
                    />
                    {errors.name && <HelperText type="error" style={{color: 'red'}}>{errors.name.message}</HelperText>}

                    <Text style={[styles.label, { marginTop: 15 }]}>Email Address</Text>
                    <Controller
                        control={control}
                        rules={{ 
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                        }}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                mode="outlined"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                disabled={true}  
                                style={styles.input}
                                outlineColor="black"
                                activeOutlineColor="black"
                                textColor="black"
                                left={<TextInput.Icon icon="email" color="black" />}
                            />
                        )}
                    />
                    {errors.email && <HelperText type="error" style={{color: 'red'}}>{errors.email.message}</HelperText>}

                    <Text style={[styles.label, { marginTop: 15 }]}>New Password (Optional)</Text>
                    <Controller
                        control={control}
                        rules={{ minLength: { value: 6, message: "Min 6 characters" } }}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                mode="outlined"
                                onChangeText={onChange}
                                value={value}
                                placeholder="Leave empty to keep current"
                                secureTextEntry={!showPassword}
                                style={styles.input}
                                outlineColor="black"
                                activeOutlineColor="black"
                                textColor="black"
                                left={<TextInput.Icon icon="lock" color="black" />}
                                right={
                                    <TextInput.Icon 
                                        icon={showPassword ? "eye-off" : "eye"} 
                                        onPress={() => setShowPassword(!showPassword)} 
                                        color="black"
                                    />
                                }
                            />
                        )}
                    />
                    {errors.password && <HelperText type="error" style={{color: 'red'}}>{errors.password.message}</HelperText>}

                    <View style={styles.infoBox}>
                        <Icon source="information-outline" size={18} color="#8e8e93" />
                        <Text style={styles.infoText}>
                            Changing your email or password affects your next login.
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <CustomButton 
                        title={loading ? "Saving..." : "Save Changes"} 
                        onPress={handleSubmit(onSubmit)} 
                    />
                </View>

            </ScrollView>
        </SafeAreaLayoutWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f7',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35,
        gap: 15
    },
    backButton: {
        padding: 5,
    },
    form: {
        flex: 1,
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '800',
        marginBottom: 8,
        color: '#1d1d1f',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: 'white',
    },
    infoBox: {
        flexDirection: 'row',
        marginTop: 25,
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 12,
        gap: 10,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#8e8e93',
        lineHeight: 18,
    },
    footer: {
        marginTop: 10,
    }
});

export default EditProfileScreen;