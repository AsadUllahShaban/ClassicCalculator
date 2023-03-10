import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Styles } from '../styles/GlobalStyles';
import { myColors } from '../styles/Colors';
import Button from './Button'

export default function MyKeyboard() {
    //defining states for storing values
    const [firstNumber, setFirstNumber] = useState("")
    const [secondNumber, setSecondNumber] = useState("")
    const [operation, setOperation] = useState("")
    const [dotPressed, setDotPressed] = useState(false)
    const [result, setResult] = useState<Number | null>(null)

    //this func will handle press for first 10 numbers pressed
    const handleNumberPress = (buttonValue: string) => {
        if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue)
        }
    }

    const handleDotPress = () => {
        if (!dotPressed) {
            setDotPressed(true);
            setFirstNumber(firstNumber + '.')
        }
    }

    //this func will handle press for any operator pressed
    const handleOperationPress = (buttonValue: string) => {
        setDotPressed(false);
        setOperation(buttonValue)
        setSecondNumber(firstNumber)
        setFirstNumber('')
    }

    //clearing all states when clear is pressed
    const clear = () => {
        setDotPressed(false)
        setOperation('')
        setSecondNumber('')
        setFirstNumber('')
        setResult(null)
    }

    // called when equal is pressed
    const getResult = () => {
        switch (operation) {
            case '+':
                clear();
                setResult(parseFloat(secondNumber) + parseFloat(firstNumber))
                break;
            case '-':
                clear();
                setResult(parseInt(secondNumber) - parseInt(firstNumber))
                break;
            case '*':
                clear();
                setResult(parseInt(secondNumber) * parseInt(firstNumber))
                break;
            case '/':
                clear();
                setResult(parseInt(secondNumber) / parseInt(firstNumber))
                break;
            default:
                clear();
                setResult(0);
                break;
        }

    }

    const printSquareRoot = () => {
        clear();
        setResult(Math.sqrt(parseInt(firstNumber)))
    }

    const printSquare = () => {
        clear();
        setResult(Math.pow(parseInt(firstNumber), 2))
    }

    const firstNumberDisplay = () => {
        if (result !== null) {
            return <Text style={result < 99999 ? [Styles.screenFirstNumber, { color: myColors.result }] : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]}>{result?.toString()}</Text>
        }
        if (firstNumber === '') {
            return <Text style={Styles.screenFirstNumber}>{'0'}</Text>
        }
        if (firstNumber && firstNumber.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
            return <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>{firstNumber}</Text>
        }
        if (firstNumber.length > 7) {
            return <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>{firstNumber}</Text>
        }
    }

    return (

        // The <> and </> symbols are called React fragments, and they are used to group multiple React elements together without creating an additional DOM node.


        <View style={Styles.viewBottom}>

            <View style={{ borderColor: myColors.blue, borderWidth: 1 }}>

                <View style={{ height: 120, width: '90%', justifyContent: 'flex-end', alignSelf: 'center' }}>
                    <Text style={Styles.screenSecondNumber}>
                        {secondNumber}
                        <Text style={{ color: 'purple', fontSize: 50, fontWeight: '500', }}>{operation}</Text>
                    </Text>
                    {firstNumberDisplay()}
                </View>
            </View>

            <View style={Styles.row}>
                <Button title='C' isGray onPress={clear} />
                <Button title='x??' isGray onPress={() => printSquare()} />
                <Button title='???' isGray onPress={() => printSquareRoot()} />
                <Button title='/' isGray onPress={() => handleOperationPress('/')} />
            </View>

            <View style={Styles.row}>
                <Button title='7' onPress={() => handleNumberPress('7')} />
                <Button title='8' onPress={() => handleNumberPress('8')} />
                <Button title='9' onPress={() => handleNumberPress('9')} />
                <Button title='x' isBlue onPress={() => handleOperationPress('*')} />
            </View>

            <View style={Styles.row}>
                <Button title='4' onPress={() => handleNumberPress('4')} />
                <Button title='5' onPress={() => handleNumberPress('5')} />
                <Button title='6' onPress={() => handleNumberPress('6')} />
                <Button title='-' isBlue onPress={() => handleOperationPress('-')} />
            </View>

            <View style={Styles.row}>
                <Button title='1' onPress={() => handleNumberPress('1')} />
                <Button title='2' onPress={() => handleNumberPress('2')} />
                <Button title='3' onPress={() => handleNumberPress('3')} />
                <Button title='+' isBlue onPress={() => handleOperationPress('+')} />
            </View>

            <View style={Styles.row}>
                <Button title='.' onPress={() => handleDotPress()} />
                <Button title='0' onPress={() => handleNumberPress('0')} />
                <Button title='???' onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <Button title='=' isBlue onPress={() => getResult()} />
            </View>
        </View >
    )
}