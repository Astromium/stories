import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import AppText from './AppText';


export default function AppButton({ width, title, color, size, textColor, style, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ width }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, backgroundColor: color, ...style, borderRadius: 25 }}>
                <AppText color={textColor} size={size}>
                    {title}
                </AppText>
            </View>
        </TouchableOpacity>
    )
}