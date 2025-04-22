import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { Tabs } from 'expo-router'

export default function Layout() {
    

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'none',
                }
            }}
        >
            <Tabs.Screen 
                name={'index'} 
                options={{

                }}
            />
             <Tabs.Screen 
                name={'[name]'} 
                options={{

                }}
            />
        </Tabs>
    )
}