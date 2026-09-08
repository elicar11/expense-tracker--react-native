import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Icon, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper';
import Title from '@/components/Title';

const AboutAppScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaLayoutWrapper>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Icon source="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Title title="About" />
                </View>

                <View style={styles.logoSection}>
                    <View style={styles.logoSquare}>
                        <Icon source="wallet-outline" size={50} color="white" />
                    </View>
                    <Text style={styles.appName}>Xpense</Text>
                    <Text style={styles.version}>Version 1.0.0</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Notre Mission</Text>
                    <Text style={styles.description}>
                        Xpense qui vient du mot Expense (Dépense), a été conçu pour simplifier la gestion de vos finances personnelles.
                        Notre objectif est de vous offrir une interface minimaliste et puissante pour suivre
                        vos revenus et dépenses en temps réel, afin de vous aider à atteindre vos objectifs financiers.
                    </Text>

                    <Divider style={styles.divider} />

                    <Text style={styles.sectionTitle}>Fonctionnalités Clés</Text>
                    <View style={styles.featureItem}>
                        <Icon source="check-circle-outline" size={20} color="black" />
                        <Text style={styles.featureText}>Suivi instantané des transactions</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon source="check-circle-outline" size={20} color="black" />
                        <Text style={styles.featureText}>Statistiques détaillées (Revenus vs Dépenses)</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon source="check-circle-outline" size={20} color="black" />
                        <Text style={styles.featureText}>Gestion de profil sécurisée</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon source="check-circle-outline" size={20} color="black" />
                        <Text style={styles.featureText}>Interface sombre et élégante</Text>
                    </View>

                    <Divider style={styles.divider} />

                    <Text style={styles.sectionTitle}>Technologie & Sécurité</Text>
                    <Text style={styles.description}>
                        Cette application utilise les dernières technologies de pointe : {"\n"}
                        • <Text style={{ fontWeight: '700' }}>React Native & Expo</Text> pour une fluidité maximale.{"\n"}
                        • <Text style={{ fontWeight: '700' }}>Supabase</Text> pour une base de données cryptée et une authentification sécurisée.{"\n"}
                        • <Text style={{ fontWeight: '700' }}>PostgreSQL </Text>
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaLayoutWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        gap: 15
    },
    backButton: {
        padding: 5,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoSquare: {
        width: 100,
        height: 100,
        backgroundColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    appName: {
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        marginTop: 15,
    },
    version: {
        fontSize: 14,
        color: '#8e8e93',
        fontWeight: '600',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: 'black',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: 20,
    },
    divider: {
        marginVertical: 15,
        backgroundColor: '#eee',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    featureText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    footer: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#8e8e93',
        textAlign: 'center',
        lineHeight: 18,
    }
});

export default AboutAppScreen;