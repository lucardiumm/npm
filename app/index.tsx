import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '@/extra/colors'
import { useState } from 'react'
import Toaster from '@/public/images/Toaster.png'
import Label from '@/components/Icons/Label'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'

export default function Page() {
    const [search, setSearch] = useState('')

    const Press = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        await WebBrowser.openBrowserAsync('https://github.com/lucardiumm')
    }

    const Submit = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        router.push(`/${search.toLowerCase()}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.github} onPress={Press}>
                <AntDesign name={'github'} size={27.5} color={colors.dark} />
            </TouchableOpacity>

            <View style={styles.glow}>
                <Image 
                    style={styles.icon}
                    resizeMode={'contain'}
                    source={Toaster}
                    alt={'Logo'}
                />
            </View>

           {/*  <Label /> */}

            <Text style={styles.text}>Browse README file of any npm package</Text>

            <KeyboardAvoidingView
                style={{ flex: 0 }}
                keyboardVerticalOffset={100}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <TextInput 
                    autoCorrect={false}
                    autoComplete={'off'}
                    onChangeText={setSearch}
                    autoCapitalize={'none'}
                    value={search}
                    onSubmitEditing={() => {
                        Submit()
                    }}
                    keyboardType={'default'}
                    style={styles.input}    
                    placeholder={'Search for npm package'}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light,
    },
    github: {
        position: 'absolute',
        top: 75,
        right: 50,
    },
    view: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 125,
    },
    glow: {
        shadowColor: "#B9DDFFB8",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 3,
        shadowRadius: 30,
        elevation: 5,
    },
    input: {
        fontSize: 16,
        width: 300,
        height: 60,
        fontWeight: '500',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: colors.border,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        alignItems: 'center',
        textAlign: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    text: {
        color: colors.text,
    },
})