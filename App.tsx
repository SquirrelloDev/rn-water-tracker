import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/api";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Dashboard from "./screens/Dashboard";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Stats} from "@/screens/Stats";
import {IconButton} from "@/components/UI/IconButton";
import {AddEntryButton} from "@/components/UI/AddEntryButton";
import {PlusScreen} from "@/screens/PlusScreen";
const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

function BottomTabsNavigation(){
    return (
        <BottomTab.Navigator screenOptions={{
        }}>
            <BottomTab.Screen name='Dashboard' component={Dashboard} options={{
                tabBarIcon: ({size, color}) => <IconButton icon={'water'} color={color} size={size} />
            }}/>
            <BottomTab.Screen name='AddFluid' component={PlusScreen} options={{
                title: '',
                tabBarShowLabel: false,
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: () => <AddEntryButton />
            }}/>
            <BottomTab.Screen name='Stats' component={Stats} options={{
                title: 'Statystyki',
                tabBarIcon: ({color, size}) => <IconButton icon={'stats-chart'} color={color} size={size} />
            }}/>
        </BottomTab.Navigator>
    )
}
export default function App() {

    return (
        <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='index' component={BottomTabsNavigation} options={{
                    headerShown: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
