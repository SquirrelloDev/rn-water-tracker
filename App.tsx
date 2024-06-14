import {StyleSheet} from 'react-native';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/api";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Dashboard from "./screens/Dashboard";
const Stack = createNativeStackNavigator()
export default function App() {

    return (
        <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Dashboard'} component={Dashboard}/>
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
