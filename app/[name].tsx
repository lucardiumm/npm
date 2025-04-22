import { colors } from '@/extra/colors'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Haptics from 'expo-haptics'
import Markdown from 'react-native-markdown-display'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { config } from '@/extra/config'

export default function Page() {
    const { name } = useLocalSearchParams()
    const [copy, setCopy] = useState('')

    const Back = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        router.back()
    }

    useEffect(() => {
        axios.get(config.urls.api + '/' + name).then((response) => {
            if (response.status === 200) {
                const repository = response.data.collected.metadata.links.repository as string

                const companySlash = repository.indexOf('m/')
                const repoSlash = repository.lastIndexOf('/')

                const repo = repository.slice(repoSlash + 1)
                const company = repository.slice(companySlash + 2, repoSlash)
                console.log(company)

                axios.get(`https://raw.githubusercontent.com/${company}/${repo}/refs/heads/main/README.md`).then((response) => {
                    setCopy(response.data)
                })
            }   
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={Back} style={styles.back}>
                <Text style={styles.title}>{name}</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.md}>
                <Markdown>
                    {copy}
                </Markdown>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 25,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light,
    },
    back: {
        marginRight: 'auto',
        marginLeft: '10%',
        marginTop: '10%',
    },
    title: {
        fontWeight: '700',
        fontSize: 40,
        color: colors.dark,
    },
    md: {
        backgroundColor: 'transparent',
        width: '80%',
        height: '80%',
    },
})