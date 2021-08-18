import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import styles from './styles';

export const TDateTimePicker: React.FC<{
  value: Date;
  onChange: (date: Date) => void;
  mode: any;
  title: string;
}> = ({value, onChange, mode, title}) => {
  const [date, setDate] = useState(value);
  const [show, setShow] = useState(Platform.OS === 'ios');

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const _onChange = (_event: Event, selectedDate?: Date) => {
    const currentDate: Date = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onChange(selectedDate!);
  };

  const showPicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.title}>{title}</Text>
      {Platform.OS !== 'ios' && (
        <TouchableOpacity onPress={showPicker} style={styles.selector}>
          <Text>
            {mode === 'date'
              ? date.toLocaleDateString('en-US')
              : date.toLocaleTimeString('en-US')}
          </Text>
          {mode === 'time' && (
            <FontAwesomeIcon style={styles.icon} icon={faClock} color="gray" />
          )}
        </TouchableOpacity>
      )}
      {show && (
        <View style={styles.ios}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode || 'date'}
            is24Hour={true}
            display="default"
            onChange={_onChange}
          />
        </View>
      )}
    </View>
  );
};

export default TDateTimePicker;
