import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const Checkbox: React.FC<{
  label: string;
  color: string;
  checked?: boolean;
  onPress: () => void;
}> = ({color, onPress, checked, label}) => {
  const checkboxStyle = {
    ...styles.checkbox,
  };

  let icon;

  if (checked) {
    icon = <FontAwesomeIcon icon={faCheck} color="white" />;
    checkboxStyle.backgroundColor = color;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles.labelRight]}>
      <View style={styles.labelWrapper}>
        <Text style={[styles.labelStyle]}>{label}</Text>
      </View>
      <View
        testID="checkbox"
        style={[
          checkboxStyle,
          styles.size,
          styles.border,
          {borderColor: color},
        ]}>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
