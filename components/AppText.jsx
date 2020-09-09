import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function AppHeading({ size, color, children, style }) {
    return (
        <Text style={[styles.text, { fontSize: size, color, ...style }]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'NunitoSans-Regular',
        textAlign: 'center'
    }
})