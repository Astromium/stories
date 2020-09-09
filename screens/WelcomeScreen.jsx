import React from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';

import WelcomePattern from '../assets/svg/WelcomePattern';
import colors from '../config/colors';
import AppHeading from '../components/AppHeading';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { SharedElement } from 'react-native-shared-element'


export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 250, marginTop: 0 - StatusBar.currentHeight, zIndex: 100 }}>
                <SharedElement id='pattern'>
                    <WelcomePattern width='100%' height='100%' />
                </SharedElement>
            </View>
            <View style={styles.content}>
                <View style={{ width: '100%', marginTop: 20, alignItems: 'center' }}>
                    <AppHeading size={34} color={colors.darkGrey}>Welcome To Stories</AppHeading>
                    <AppText size={16} color={colors.darkGrey} style={{ marginTop: 15, opacity: 0.8 }}>
                        Save your happy moments & memories in a form of a story, to look at them later and
                        remember the good old days
                    </AppText>

                    <AppButton onPress={() => navigation.navigate('Register')} style={{ marginTop: 20, marginBottom: 20 }} color={colors.primary} width='80%' title='Create Your Account' textColor={colors.white} size={18} />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <AppText size={16} color={colors.primary}>Already Have an Account? Log in</AppText>
                    </TouchableOpacity>

                </View>
            </View>
            <StatusBar backgroundColor={colors.background} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        alignItems: 'center'
    }
});