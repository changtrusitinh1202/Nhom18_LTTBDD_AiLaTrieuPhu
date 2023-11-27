import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './Screen/MainScreen';
import ChoiGame from './Screen/ChoiGame';
import DiemCao from './Screen/DiemCao';
import LuatChoi from './Screen/LuatChoi';


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
                
                <Stack.Screen
                 name='DiemCao'
                 component={DiemCao}
                 options={{
                     headerTransparent: true,
                     headerTitle: ''
                 }}    
                >

                </Stack.Screen>


                <Stack.Screen
                 name='LuatChoi'
                 component={LuatChoi}
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
