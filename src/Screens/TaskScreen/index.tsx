import React, {useContext} from 'react';
import {Text, View, TextInput} from 'react-native';
import Button from '../../Components/Button';
import DateTimePicker from '../../Components/DateTimePicker';
import {useForm, Controller} from 'react-hook-form';
import ToDoContext, {ToDo} from '../../store/toDoContext';
import Picker from '../../Components/Picker';
import styles from './styles';

const Field: React.FC<{
  title: string;
  placeholder: string;
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string;
  };
}> = ({placeholder, title, field: {onBlur, onChange, value}}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

export default function TaskScreen({
  navigation,
}: {
  navigation: {goBack: () => void};
}): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ToDo>();

  const toDoContext = useContext(ToDoContext);

  const onSubmit = (data: ToDo) => {
    toDoContext.addToDo(data);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field}) => (
            <Field
              placeholder="Design team meeting"
              title="Title"
              field={field}
            />
          )}
          name="title"
          defaultValue=""
        />
        {errors.title && <Text style={styles.error}>This is required.</Text>}

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <DateTimePicker
              value={value}
              onChange={onChange}
              mode="date"
              title="Deadline"
            />
          )}
          name="deadline"
          defaultValue={new Date()}
        />

        <View style={styles.timeContainer}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DateTimePicker
                value={value}
                onChange={onChange}
                mode="time"
                title="Start time"
              />
            )}
            name="startTime"
            defaultValue={new Date()}
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DateTimePicker
                value={value}
                onChange={onChange}
                mode="time"
                title="End time"
              />
            )}
            name="endTime"
            defaultValue={new Date()}
          />
        </View>

        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <View style={styles.fieldContainer}>
              <Picker
                label="Remind"
                placeholder="10 minutes early"
                items={[
                  {label: '5 minutes early', value: '0'},
                  {label: '10 minutes early', value: '1'},
                  {label: '15 minutes early', value: '2'},
                ]}
                onSelect={onChange}
              />
            </View>
          )}
          name="remind"
          defaultValue="1"
        />

        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <View style={styles.fieldContainer}>
              <Picker
                label="Repeat"
                placeholder="weekly"
                items={[
                  {label: 'daily', value: '0'},
                  {label: 'weekly', value: '1'},
                  {label: 'monthly', value: '2'},
                ]}
                onSelect={onChange}
              />
            </View>
          )}
          name="repeat"
          defaultValue="1"
        />
      </View>
      <Button text="Create a task" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
