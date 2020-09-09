import React, { useContext, useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { SharedElement } from 'react-native-shared-element'
import { Formik } from 'formik'
import * as Yup from 'yup'

import RegisterPattern from '../assets/svg/RegisterPattern';
import colors from '../config/colors';
import AppHeading from '../components/AppHeading';
import auth from '../api/auth';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText'

import AuthContext from '../context/AuthContext';


const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Name is Required'),
    email: Yup.string().email().required('Email is Required'),
    password: Yup.string().min(8).required('Password is Required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default function RegisterScreen() {

    const { onAuth } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [banner, setBanner] = useState(null);

    const handleSignUp = async (values) => {
        setLoading(true)
        const { name, email, password, passwordConfirm } = values
        const res = await auth.signUp(name, email, password, passwordConfirm)
        if (res.status === 'success') {
            setLoading(false)
            onAuth({ token: res.token, user: { ...auth.user } })
        } else {
            setLoading(false)
            console.log(res)
            if (res.message.startsWith('Duplicated')) setError('Email Already in use')
            if (res.message.startsWith('Something')) {
                setBanner('Something went wrong ! Please try again later')
                setTimeout(() => setBanner(null), 4000)
            }
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            {banner !== null ? <View style={styles.banner}>
                <AppText color={colors.white} size={18}>{banner}</AppText>
            </View> : null}
            <View style={{ width: '100%', height: 200 }}>
                <SharedElement id='pattern'>
                    <RegisterPattern width='100%' height='100%' />
                </SharedElement>
            </View>

            <View style={styles.content}>
                <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
                    <AppHeading size={30} color={colors.darkGrey}>Create Your Account</AppHeading>

                    <View style={{ width: '80%', marginTop: 5 }}>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: '',
                                passwordConfirm: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={values => handleSignUp(values)}
                        >
                            {({ errors, touched, handleChange, values, handleSubmit }) => (
                                <View style={{ alignItems: 'center', width: '100%' }}>

                                    <AppInput placeholder='Name' onChange={handleChange('name')} value={values.name} icon='account' keyboardType='default' />
                                    {errors.name && touched.name ? <AppText color={colors.primary} size={16}>{errors.name}</AppText> : null}
                                    <AppInput placeholder='Email' onChange={handleChange('email')} value={values.email} icon='email' keyboardType='email-address' />
                                    {error ? <AppText color={colors.primary} size={16}>{error}</AppText> : null}
                                    {errors.email && touched.email ? <AppText color={colors.primary} size={16}>{errors.email}</AppText> : null}
                                    <AppInput placeholder='Password' onChange={handleChange('password')} value={values.password} icon='lock' secureTextEntry />
                                    {errors.password && touched.password ? <AppText color={colors.primary} size={16}>{errors.password}</AppText> : null}
                                    <AppInput placeholder='Confirm Password' onChange={handleChange('passwordConfirm')} value={values.passwordConfirm} icon='lock' secureTextEntry />
                                    {errors.passwordConfirm && touched.passwordConfirm ? <AppText color={colors.primary} size={16}>{errors.passwordConfirm}</AppText> : null}

                                    {loading && <ActivityIndicator color={colors.primary} size='large' animating={loading} />}
                                    <AppButton onPress={handleSubmit} style={{ marginTop: 20, marginBottom: 20 }} color={colors.primary} width='100%' title='Create Your Account' textColor={colors.white} size={18} />
                                </View>
                            )}

                        </Formik>

                    </View>


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
        borderTopLeftRadius: 75,
        borderBottomRightRadius: 75,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',

    },
    banner: {
        position: 'absolute',
        top: 0,
        width: '80%',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        height: 80,
        paddingVertical: 20,
        paddingHorizontal: 10
    }
});