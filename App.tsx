import { Alert, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ThemeContext } from './src/context/ThemeContext';
import { myColors } from './src/styles/Colors';
import Button from './src/components/Button';
import MyKeyboard from './src/components/MyKeyboard';
import Icon from 'react-native-vector-icons/FontAwesome';

const SunIcon = <Icon name="sun-o" size={30} color={myColors.blue} />;
const MoonIcon = <Icon name="moon-o" size={30} color={myColors.blue} />;


export default function App() {

    const [theme, setTheme] = useState('light')

    return (
        <ThemeContext.Provider value={theme}>
            <View style={theme == 'light' ? styles.container : [styles.container, { backgroundColor: '#000' }]}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', borderColor: myColors.blue, borderWidth: 1, borderRadius: 5, margin: 8, padding: 5 }}>
                    {theme == 'light' ? SunIcon : MoonIcon}
                    <Switch value={theme == 'light'} onValueChange={() => setTheme(theme == 'light' ? 'dark' : 'light')} />
                </View>
                <MyKeyboard />
            </View>
        </ThemeContext.Provider>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.light,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
