//IM-2021-056 - M.G. Venuja Prasanjith

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    // Prevent invalid consecutive operators
    if (
      (['+', '*', '/', '%'].includes(value) && input === '') ||
      (['+', '-', '*', '/', '%'].includes(value) && ['+', '-', '*', '/', '%'].includes(input.slice(-1))) // Prevent consecutive operators
    ) {
      return;
    }
    // add new value to the input
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      const tokens = input.split(/(\+|\-|\*|\/|\%)/);
      let total = parseFloat(tokens[0]);

      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextValue = parseFloat(tokens[i + 1]);

        if (operator === '+') total += nextValue;
        else if (operator === '-') total -= nextValue;
        else if (operator === '*') total *= nextValue;
        else if (operator === '/') {
          if (nextValue === 0) {
            setResult('Error');
            return;
          }
          total /= nextValue;
        } else if (operator === '%') total %= nextValue;
      }
      setResult(total.toString());
    } catch (error) {
      setResult('Error');
    }
  };


//Percentage calculation
  const calculatePercentage = () => {
    try {
      if (input === '') return;
      const value = parseFloat(input);
      const percentage = (value / 100).toFixed(4);  //Calculate the percentage (value divided by 100)
      setInput(`${input}%`);
      setResult(percentage.toString());
    } catch (error) {
      setResult('Error');  //If has error, set the result to 'Error'
    }
  };

//clear Input, Result
  const clearInput = () => {
    setInput('');
    setResult('');
  };

//remove last input value
  const deleteLast = () => {
    setInput(input.slice(0, -1));
  };

  const calculateSqrt = () => {
    try {
      if (input === '') return; // If input empty not perform anything
      const value = parseFloat(input);
      if (value < 0) {
        setResult('Error'); // block negative inputs
      } else {
        const sqrtResult = Math.sqrt(value).toFixed(4); // Calculate square root
        setInput(`√(${input})`); // Update the input to display √(value)
        setResult(sqrtResult.toString()); // Show the result
      }
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={clearInput}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={deleteLast}>
          <Ionicons name="arrow-back" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={calculateSqrt}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => handleInput('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => handleInput('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => handleInput('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => handleInput('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]} onPress={() => handleInput('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={calculatePercentage}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={calculateResult}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  screen: {
    padding: 20,
    alignItems: 'flex-end',
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    margin: 10,
    height: '20%',
    minHeight: 100,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 36,
    color: '#212529',
    textAlign: 'right',
    width: '100%',
  },
  resultText: {
    fontSize: 24,
    color: '#868e96',
    textAlign: 'right',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
  },
  button: {
    padding: 20,
    borderRadius: 50,
    margin: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  orangeButton: {
    backgroundColor: '#f35b04',
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
  },
});
