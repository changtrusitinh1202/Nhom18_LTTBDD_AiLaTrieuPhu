import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './Screen/MainScreen';
import DiemCao from './Screen/DiemCao';
import ChoiGame from './Screen/ChoiGame';


export default function App() { 
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='MainScreen'
                    component={MainScreen}
                    options={{
                        headerTransparent: true,
                        headerTitle: ''
                    }}              
                >
                </Stack.Screen>


                <Stack.Screen
                    name='ChoiGame'
                    component={ChoiGame}
                    options={{
                        headerTransparent: true,
                        headerTitle: ''
                    }}    
                 
                >
                    
                </Stack.Screen>

              
            </Stack.Navigator>
        </NavigationContainer>
    )
}
