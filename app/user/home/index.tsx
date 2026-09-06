import React, { useEffect } from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'
import { BottomNavigation, Icon } from 'react-native-paper';
import HomeTabs from './_components/home-tabs';
import ProfileTabs from './_components/profile-tabs';
import { BackHandler, TouchableOpacity, View, StyleSheet } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';

const renderScene = BottomNavigation.SceneMap({
    home: HomeTabs,
    profile: ProfileTabs
});

const UserHomepage = () => {
    const router = useRouter()
    const [index, setIndex] = React.useState(0);

    const tabs = [
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    ]


    useEffect(() => {
        const backAction = () => {
            if (index > 0) {
                setIndex(0); 
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [index]);

    return (
        <SafeAreaLayoutWrapper>
            <View style={styles.fabContainer}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={styles.fab}
                    onPress={() => router.push("/user/add-transaction" as RelativePathString)}
                >
                    <Icon source="plus" size={32} color="white" />
                </TouchableOpacity>
            </View>

            <BottomNavigation
                navigationState={{ index, routes: tabs }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                activeColor="black"
                inactiveColor="#999"
                barStyle={styles.bottomBar}
                theme={{
                    colors: {
                        secondaryContainer: "transparent",
                    }
                }}
                shifting={true}
            />
        </SafeAreaLayoutWrapper>
    )
}

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 40, 
        left: "50%",
        transform: [{ translateX: -30 }],
        zIndex: 10, 
    },
    fab: {
        height: 60,
        width: 60,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    bottomBar: {
        backgroundColor: "#fff",
        height: 80,
        borderTopWidth: 0.5,
        borderTopColor: '#e0e0e0',
    }
});

export default UserHomepage