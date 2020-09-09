import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, StatusBar, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native'
import AppHeading from '../components/AppHeading'
import AppText from '../components/AppText'
import moment from 'moment'
import AuthContext from '../context/AuthContext'
import userApi from '../api/user'
import StoryThumbNail from '../components/StoryThumbNail';


import colors from '../config/colors';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {

    const [loading, setLoading] = useState(true)
    const { user, onLogout } = useContext(AuthContext)
    const [stories, setStories] = useState([])
    const [banner, setBanner] = useState(null)

    const getStories = async () => {
        const res = await userApi.getStories(user.token)
        if (res.status === 'success') {
            setStories(res.stories)
            setLoading(false)
        } else {
            setLoading(false)
            setBanner(res.message)
            setTimeout(() => setBanner(null), 4000)
        }
    }

    useEffect(() => {
        getStories()
    }, [])


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={loading} size='large' color={colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
            {banner !== null ? <View style={styles.banner}>
                <AppText color={colors.white} size={18}>{banner}</AppText>
            </View> : null}
            <View style={styles.header}>
                <View style={{ width: '100%', paddingVertical: 10, alignItems: 'flex-start' }}>
                    <AppText size={18} color={colors.darkGrey}>{moment(Date.now()).format('LL')}</AppText>
                </View>
                <AppHeading color={colors.darkGrey} size={24}>Your Stories</AppHeading>
            </View>
            <View style={{ height: height / 2, width: '100%' }}>
                <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
                    {stories.map(story => {
                        return (
                            <TouchableNativeFeedback onPress={() => navigation.navigate('Story', { data: story })} key={story._id}>
                                <StoryThumbNail id={story._id} title={story.title} image={story.images[0]} createdAt={story.createdAt} />
                            </TouchableNativeFeedback>
                        )
                    })}


                </ScrollView>
            </View>
            <AppHeading>Home Screen</AppHeading>



            <StatusBar hidden />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    },
    scrollView: {
        padding: 20,
        height: '100%',
        width: '100%',
    },
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
        position: 'absolute',
        left: 10,
        bottom: 40,
        textAlign: 'left'
    },
    storyDesc: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        textAlign: 'left'
    },
    header: {
        padding: 20,
        width: '100%',
        justifyContent: 'center'
    }
})
