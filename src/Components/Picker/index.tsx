import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styles, {getShadow} from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';

type Item = {label: string; value: string};
const lightGray = '#c9c8c8';

const Picker: React.FC<{
  label: string;
  placeholder: string;
  items: Array<Item>;
  onSelect: () => void;
}> = (props: any) => {
  const {testID, items, label, onSelect, selected, style, placeholder} = props;
  const startingHeight = 0;
  const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
  const [collapsed, setCollapsed] = useState(false);
  const [picked, setPicked] = useState(selected);
  const [position, setPosition] =
    useState<{left: number; top: number; width: number}>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Animated.spring(animatedHeight, {
      friction: 100,
      toValue: collapsed ? 200 : startingHeight,
      useNativeDriver: false,
    }).start();
  });

  const hide = () => {
    setCollapsed(false);
    setTimeout(() => setVisible(false), 225);
  };

  const show = () => {
    if (touchable.current !== null) {
      touchable.current.measure((fx, fy, width, height, left, py) => {
        setPosition({
          left,
          top: py + Platform.select({ios: height + 1, android: height - 1}),
          width,
        });
        setVisible(true);
        setCollapsed(true);
      });
    } else {
      setVisible(true);
      setCollapsed(true);
    }
  };

  const selectItem = (value: string) => {
    setPicked(value);
    hide();
    onSelect(value);
  };

  let touchable = useRef<View | null>(null);

  const renderOption = (item: Item, index: number) => (
    <TouchableOpacity
      testID={`PickerItem-${item.value}`}
      key={`${index}-${item.value}`}
      onPress={() => selectItem(item.value)}
      style={[styles.item]}>
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const selectedValue = items.find(
    (item: Item) => item.value === picked,
  )?.label;

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        testID={testID}
        ref={button => {
          touchable.current = button;
        }}
        style={[
          styles.pickerContainer,
          visible ? {...getShadow(), ...styles.bordered} : null,
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => show()}
          style={styles.picker}>
          <Text
            style={[styles.pickerText, !selectedValue && {color: lightGray}]}>
            {selectedValue || placeholder}
          </Text>
          <FontAwesomeIcon
            style={styles.pickerIcon}
            icon={collapsed ? faChevronUp : faChevronDown}
            color="gray"
          />
        </TouchableOpacity>
        <Modal transparent={true} visible={visible}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => hide()}
            style={styles.modal}>
            <Animated.View
              style={[
                styles.optionsContainer,
                getShadow(7),
                position,
                {maxHeight: animatedHeight},
              ]}>
              <ScrollView
                testID="PickerItemsContainer"
                style={styles.optionsSubcontainer}
                keyboardShouldPersistTaps="always">
                {items.map(renderOption)}
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default Picker;
