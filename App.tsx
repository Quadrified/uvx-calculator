import React, { useState, FC } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { evaluate } from 'mathjs';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  SlideInDown,
} from 'react-native-reanimated';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppColors from './src/themes/AppColors';
import { CalculatorInputProps } from './src/types/CalculatorInput';
import { INPUT_NUMBERS_AND_OPERATORS } from './src/utils/constants';

const App: FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const onOperatorPress = (value: string) => {
    if (value === '=') {
      onCalculateResult();
    } else if (value === 'AC') {
      clearDisplay();
    } else if (value === 'DEL') {
      deleteLastInput();
    } else {
      setDisplay(display + value);
    }
  };

  const onCalculateResult = () => {
    if (!display) {
      return;
    }
    try {
      const evalResult = evaluate(display);
      setResult(String(evalResult));
    } catch (error) {
      setResult('Input Error');
    }
  };

  const clearDisplay = () => {
    setDisplay('');
    setResult('');
  };

  const deleteLastInput = () => {
    setDisplay(display.slice(0, -1));
  };

  const renderCalculatorInput = ({ item }: CalculatorInputProps) => {
    if (item === 'DEL') {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.inputButton}
          onPress={() => onOperatorPress(item)}>
          <FontAwesome6 name="delete-left" size={32} />
        </TouchableOpacity>
      );
    }
    if (item === 'AC') {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.allClearButton}
          onPress={() => onOperatorPress(item)}>
          <Text style={styles.allClearButtonText}>{item}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.inputButton}
        onPress={() => onOperatorPress(item)}>
        <Text style={styles.inputButtonText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View
        entering={FadeIn.duration(500)}
        style={styles.displayContainer}>
        <Animated.View
          entering={FadeInRight.duration(500)}
          exiting={FadeInLeft.duration(500)}>
          <Text style={styles.inputDisplay}>{display}</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInRight.duration(500)}
          exiting={FadeInLeft.duration(500)}>
          <Text style={styles.resultDisplay}>{result}</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        entering={SlideInDown.duration(500)}
        style={styles.inputButtonsContainer}>
        <FlatList
          data={INPUT_NUMBERS_AND_OPERATORS}
          keyExtractor={input => input}
          numColumns={4}
          renderItem={renderCalculatorInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.resultButtonContainer}
          onPress={onCalculateResult}>
          <Text style={styles.resultButtonText}>{'='}</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: AppColors.calculatorBg,
  },
  displayContainer: {
    padding: 20,
    backgroundColor: AppColors.inputBg,
    height: '30%',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    elevation: 2,
    marginBottom: 20,
  },
  inputDisplay: {
    fontSize: 72,
    textAlign: 'right',
    color: AppColors.operatorBtnText,
  },
  resultDisplay: {
    fontSize: 68,
    textAlign: 'right',
    color: AppColors.operatorBtnText,
  },
  inputButtonsContainer: {
    height: '70%',
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  inputButton: {
    width: '23%',
    margin: '1%',
    padding: 25,
    backgroundColor: AppColors.numbersBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputButtonText: {
    fontSize: 34,
    color: AppColors.numbersText,
  },
  allClearButton: {
    width: '23%',
    margin: '1%',
    padding: 25,
    backgroundColor: AppColors.clearBtnBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  allClearButtonText: {
    fontSize: 32,
    color: AppColors.clearBtnText,
  },
  resultButtonContainer: {
    width: '90%',
    marginVertical: 15,
    padding: 10,
    backgroundColor: AppColors.resultBtnBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  resultButtonText: {
    fontSize: 62,
    color: AppColors.clearBtnText,
  },
});

export default App;
