import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button: React.FC<{
  text: string;
  onPress: () => void;
}> = ({text, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
