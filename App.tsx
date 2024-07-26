import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/utils/api";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Dashboard from "@/screens/Dashboard";
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
import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {SettingsScreen} from "@/screens/SettingsScreen";
import {AccountScreen} from "@/screens/Settings/AccountScreen";
import {PrefsScreen} from "@/screens/Settings/PrefsScreen";
import {NotificationsScreen} from "@/screens/Settings/NotificationsScreen";
import {UpdatesScreen} from "@/screens/Settings/UpdatesScreen";
import {BugReportScreen} from "@/screens/Settings/BugReportScreen";
import {FaqScreen} from "@/screens/Settings/FaqScreen";
import {LogOutBtn} from "@/components/Auth/LogOutBtn";
import Toast from "react-native-toast-message";

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
            <StatusBar style={'dark'}/>
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName={'index'}>
                                <Stack.Screen name='Intro' component={IntroScreen} options={{
                                    headerShown: false,
                                }}/>
                                <Stack.Screen name={'SignUpPersonalData'} component={SignupPersonalDataScreen}
                                              options={{
                                                  title: 'Rejestracja',
                                              }}/>
                                <Stack.Screen name={'SignupCredentials'} component={SignupCredentialsScreen} options={{
                                    title: 'Rejestracja',
                                }}/>
                                <Stack.Screen name={'Login'} component={LoginScreen}/>
                                {
                                    session && (
                                        <>
                                            <Stack.Screen name={'index'} component={BottomTabsNavigation} options={{
                                                headerShown: false
                                            }}/>
                                            <Stack.Screen name={'Settings'} component={SettingsScreen} options={{
                                                title: 'Ustawienia',
                                                headerBackTitle: 'Powrót',
                                                headerRight: LogOutBtn
                                            }}/>
                                            <Stack.Screen name={'Account'} component={AccountScreen} options={{
                                                title: 'Konto',
                                                headerBackTitle: 'Powrót'
                                            }}/>
                                            <Stack.Screen name={'Preferences'} component={PrefsScreen} options={{
                                                title: 'Ustawienia aplikacji',
                                                headerBackTitle: 'Powrót',
                                            }}/>
                                            <Stack.Screen name={'Notifications'} component={NotificationsScreen} options={{
                                                title: 'Ustawienia powiadomień',
                                                headerBackTitle: 'Powrót',
                                            }}/>
                                            <Stack.Screen name={'Updates'} component={UpdatesScreen} options={{
                                                title: 'Co nowego?',
                                                headerBackTitle: 'Powrót',
                                                presentation: 'modal'
                                            }}/>
                                            <Stack.Screen name={'BugReport'} component={BugReportScreen} options={{
                                                title: 'Zgłoś błąd',
                                                headerBackTitle: 'Powrót',
                                                presentation: 'modal'
                                            }}/>
                                            <Stack.Screen name={'FAQ'} component={FaqScreen} options={{
                                                title: 'FAQ',
                                                headerBackTitle: 'Powrót',
                                                presentation: 'modal'
                                            }}/>
                                        </>

                                    )
                                }
                            </Stack.Navigator>
                            <Toast/>
                        </NavigationContainer>
                    </SafeAreaProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
