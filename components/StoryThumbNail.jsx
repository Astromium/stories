import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import AppHeading from './AppHeading'
import AppText from './AppText'
import moment from 'moment'
import { SharedElement } from 'react-navigation-shared-element'

import colors from '../config/colors';

const { width } = Dimensions.get('window')

export default function StoryThumbNail({ image, title, createdAt, id }) {
    return (

        <View style={styles.storyContainer}>
            <SharedElement id={`item.${id}.photo`}>
                <Image source={{ uri: `http://192.168.1.5:3000/public/img/stories/${image}` }} resizeMode='cover' style={styles.storyThumb} />
            </SharedElement>

            <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 10, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <SharedElement id={`item.${id}.title`}>
                    <AppHeading color={colors.white} size={18} style={styles.storyTitle}>{title}</AppHeading>
                </SharedElement>

                <SharedElement id={`item.${id}.date`}>
                    <AppText color={colors.primary} size={13} style={{ width: '80%', opacity: 0.8 }} style={styles.storyDesc}>
                        {moment(createdAt).format('LL')}
                    </AppText>
                </SharedElement>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    storyContainer: {
        width: width * 0.7,
        position: 'relative',
        marginRight: 10,
        borderRadius: 15,
        overflow: 'hidden'
    },
    storyThumb: {
        width: '100%',
        height: '100%'
    },
    storyTitle: {
        left: 10,
        bottom: 20,
        textAlign: 'left',
    },
    storyDesc: {
        left: 10,
        bottom: 10,
        textAlign: 'left'
    }
})