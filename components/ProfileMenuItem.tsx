import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';

interface ProfileMenuItemProps {
    icon: string;
    title: string;
    onPress: () => void;
    color?: string;
}

const ProfileMenuItem = ({ icon, title, onPress, color = "black" }: ProfileMenuItemProps) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.menuLeft}>
            <View style={styles.iconContainer}>
                <Icon source={icon} size={22} color={color} />
            </View>
            <Text style={[styles.menuText, { color }]}>{title}</Text>
        </View>
        <Icon source="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 35,
        alignItems: 'center',
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProfileMenuItem