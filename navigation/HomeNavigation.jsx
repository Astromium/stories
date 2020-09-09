import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';


import HomeScreen from '../screens/HomeScreen';
import StoryDetailsScreen from '../screens/StoryDetailsScreen'

const Stack = createSharedElementStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName='Home' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Story' component={StoryDetailsScreen} options={(navigation) => ({
                headerBackTitleVisible: false,
                cardStyleInterpolator: ({ current: { progress } }) => {
                    return {
                        cardStyle: {
                            opacity: progress
                        }
                    }
                }
            })}

                sharedElementsConfig={(route) => {
                    const { data } = route.params
                    return [
                        {
                            id: `item.${data._id}.photo`,
                            animation: 'move',
                            resize: 'clip',
                            align: 'center-top'
                        },
                        {
                            id: `item.${data._id}.title`,
                            animation: 'fade',
                            resize: 'clip',
                            align: 'left-center'
                        },
                        {
                            id: `item.${data._id}.date`,
                            animation: 'fade',
                            resize: 'clip',
                            align: 'left-center'
                        }
                    ]
                }}
            />
        </Stack.Navigator>
    )
}


export default HomeStack