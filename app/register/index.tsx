import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Controller, useForm } from "react-hook-form"
import { Icon, TextInput, HelperText } from 'react-native-paper'
import { Link, useRouter } from "expo-router"
import CustomButton from '@/components/CustomButton'
import Title from '@/components/Title'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <SafeAreaLayoutWrapper>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon source="arrow-left" size={24} color="#1d1d1f" />
        </Pressable>

        <View style={styles.header}>
          <Title title="Create Account" />
          <Text style={styles.subtitle}>Enter all your details to sign in</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{ required: "Le nom est requis" }}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Full Name"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={false}
                  style={styles.input}
                  outlineColor="black"
                  activeOutlineColor="black"
                  textColor="black"
                  left={<TextInput.Icon icon="account" color="black" />}
                />
              )}
            />
            {errors.name && <HelperText type="error" visible={true} style={styles.errorText}>{errors.name.message}</HelperText>}
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: "L'email est requis",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email invalide" }
              }}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={false}
                  style={styles.input}
                  outlineColor="black"
                  activeOutlineColor="black"
                  textColor="black"
                  left={<TextInput.Icon icon="email" color="black" />}
                />
              )}
            />
            {errors.email && <HelperText type="error" visible={true} style={styles.errorText}>{errors.email.message}</HelperText>}
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{ required: "Le mot de passe est requis" }}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={!passwordVisible}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={false}
                  style={styles.input}
                  outlineColor="black"
                  activeOutlineColor="black"
                  textColor="black"
                  left={<TextInput.Icon icon="lock" color="black" />}
                  right={
                    <TextInput.Icon 
                      icon={passwordVisible ? "eye-off" : "eye"} 
                      color="black"
                      onPress={() => setPasswordVisible(!passwordVisible)} 
                    />
                  }
                />
              )}
            />
            {errors.password && <HelperText type="error" visible={true} style={styles.errorText}>{errors.password.message}</HelperText>}
          </View>
        </View>

        <CustomButton title="Register" onPress={handleSubmit(onSubmit)} />
        <View style={styles.footer}>
            <Text style={styles.text}>Already have an account?{' '}</Text>
            <Link href="/login">
              <Text style={styles.link}>Login</Text>
            </Link>
          </View>
      </View>
    </SafeAreaLayoutWrapper >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f7",
    paddingVertical: 25,
    paddingHorizontal: 30,
    gap: 20
  },
  backButton: {
    marginBottom: 10,
  },
  header: {
    marginTop: 10,
  },
  subtitle: {
    color: "#766363",
    fontSize: 16,
    fontWeight: '500',
  },
  form: {
    gap: 5,
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
  },
  errorText: {
    color: 'red',
  },
  text: {
    color: "#1d1d1f",
  },
  link: {
    color: "#1d1d1f",
    textDecorationLine: 'underline',
    fontWeight: 900,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
})

export default RegisterScreen