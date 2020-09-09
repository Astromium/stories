import React from 'react'
import { View, StyleSheet } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../config/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function AddButton({ onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons name='plus-circle' color={colors.white} size={40} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        bottom: 30,
        borderColor: colors.white,
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
