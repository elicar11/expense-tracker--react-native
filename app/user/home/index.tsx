import React from 'react'
import SafeAreaLayoutWrapper from '@/safe-area-layout-wrapper'
import { BottomNavigation, Icon, useTheme } from 'react-native-paper';
import HomeTabs from './_components/home-tabs';
import ProfileTabs from './_components/profile-tabs';
import { TouchableOpacity, View } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';


const UserHomepage = () => {
    const router = useRouter()
    const [index, setIndex] = React.useState(0);

    const tabs = [
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    ]

    const renderScene = BottomNavigation.SceneMap({
        home: HomeTabs,
        profile: ProfileTabs
    });

    return (
        <SafeAreaLayoutWrapper>
            <View
                style={{
                    position: 'absolute',
                    bottom: 55,
                    height: 60,
                    width: 60,
                    left: "50%",
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ translateX: -30 }],
                    borderRadius: 28,
                    zIndex: 1,
                }}
            >
                <TouchableOpacity onPress={() => router.push("/user/add-transaction" as RelativePathString)}>
                    <Icon source={"plus"} size={30} color={"white"} />
                </TouchableOpacity>

            </View>

            <BottomNavigation
                navigationState={{ index, routes: tabs }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                activeColor="black"
                inactiveColor="#999"
                barStyle={{
                    backgroundColor: "#fff",
                    height: 70,
                    borderTopWidth: 1, 
                    borderTopColor: '#000'
                }}

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

export default UserHomepage