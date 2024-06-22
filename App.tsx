import {StyleSheet} from 'react-native';
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
import {SafeAreaProvider} from "react-native-safe-area-context";
import {IntroScreen} from "@/screens/Auth/IntroScreen";
import {SignupPersonalDataScreen} from "@/screens/Auth/SignupPersonalDataScreen";
import {SignupCredentialsScreen} from "@/screens/Auth/SignupCredentialsScreen";
import {LoginScreen} from "@/screens/Auth/LoginScreen";
import {RootStackParamList} from "@/types/navigation";
import useAuthStore from "@/stores/authStore";

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTab = createBottomTabNavigator()


function BottomTabsNavigation() {
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false
        }}>
            <BottomTab.Screen name='Dashboard' component={Dashboard} options={{
                tabBarIcon: ({size, color}) => <IconButton icon={'water'} color={color} size={size}/>
            }}/>
            <BottomTab.Screen name='AddFluid' component={PlusScreen} options={{
                title: '',
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: () => <AddEntryButton/>
            }}/>
            <BottomTab.Screen name='Stats' component={Stats} options={{
                title: 'Statystyki',
                tabBarIcon: ({color, size}) => <IconButton icon={'stats-chart'} color={color} size={size}/>
            }}/>
        </BottomTab.Navigator>
    )
}

export default function App() {
    const session = useAuthStore(state => state.session)
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name='Intro' component={IntroScreen} options={{
                            headerShown: false,
                        }}/>
                        <Stack.Screen name={'SignUpPersonalData'} component={SignupPersonalDataScreen} options={{
                            title: 'Rejestracja',
                            headerBackTitle: 'Powrót',
                        }}/>
                        <Stack.Screen name={'SignupCredentials'} component={SignupCredentialsScreen} options={{
                            title: 'Rejestracja',
                            headerBackTitle: 'Powrót',
                        }}/>
                        <Stack.Screen name={'Login'} component={LoginScreen}/>
                        {
                            session && (
                                <Stack.Screen name={'index'} component={BottomTabsNavigation} options={{
                                    headerShown: false
                                }}/>
                            )
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
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
