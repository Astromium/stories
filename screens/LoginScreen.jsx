import React, { useState, useContext } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Formik } from 'formik'
import * as Yup from 'yup'

import WelcomePattern from '../assets/svg/WelcomePattern';
import colors from '../config/colors';
import AppHeading from '../components/AppHeading';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText'
import AppInput from '../components/AppInput';

import auth from '../api/auth'
import AuthContext from '../context/AuthContext';

const { height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
})

export default function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [error, setError] = useState(null);
    const { onAuth } = useContext(AuthContext)

    const handleEmailChange = text => {
        setEmail(text)
    }
    const handlePasswordChange = text => {
        setPassword(text)
    }

    const handleLogin = async (email, password) => {
        setLoaderVisible(true)
        const res = await auth.login(email, password)
        if (res.status === 'success') {
            setLoaderVisible(false)
            await onAuth({ token: res.token, user: { ...res.user } })
        } else {
            setLoaderVisible(false)
            setError('Invalide Email or Password')
        }
    }

    return (

        <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }} style={styles.container}>

            <View style={{ width: '100%', height: 250, marginTop: 0 - StatusBar.currentHeight, zIndex: 100 }}>
                <WelcomePattern width='100%' height='100%' />
            </View>

            <View style={styles.content}>

                <View style={{ width: '100%', marginTop: 20, alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
                    <AppHeading size={30} color={colors.darkGrey}>Login To Your Account</AppHeading>

                    <View style={{ width: '80%', marginTop: 5 }}>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={values => handleLogin(values.email, values.password)}
                        >
                            {({ errors, touched, handleChange, handleSubmit, values }) => (
                                <>
                                    <AppInput placeholder='Email' icon='email' keyboardType='email-address' onChange={handleChange('email')} value={values.email} />
                                    <AppInput placeholder='Password' icon='lock' secureTextEntry onChange={handleChange('password')} value={values.password} />

                                    <AppButton onPress={handleSubmit} style={{ marginTop: 20, marginBottom: 20 }} color={colors.primary} width='100%' title='Login' textColor={colors.white} size={18} />
                                </>
                            )}

                        </Formik>

                    </View>
                    {error && <AppText color={colors.primary} size={18}>{error}</AppText>}


                    {loaderVisible && <ActivityIndicator animating={loaderVisible} color={colors.primary} size='large' />}
                </View>

            </View>



            <StatusBar backgroundColor={colors.background} />
        </ScrollView>




    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
        position: 'relative'
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        borderTopRightRadius: 75,
        borderBottomLeftRadius: 75,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        height: height - 250
    }
});