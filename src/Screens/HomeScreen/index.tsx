import React, {useContext, memo} from 'react';
import {Text, View, SectionList} from 'react-native';
import Button from '../../Components/Button';
import ToDoContext from '../../store/toDoContext';
import styles from './styles';
import Checkbox from '../../Components/Checkbox';

const Task: React.FC<{
  title: string;
  completed: boolean;
  id: string;
  markCompleted: (id: string, completed: boolean) => void;
}> = memo(({title, completed, markCompleted, id}) => (
  <View style={styles.item}>
    <Checkbox
      checked={completed}
      onPress={() => markCompleted(id, !completed)}
      color={'#' + Math.floor(Math.random() * 16777215).toString(16)}
      label={title}
    />
  </View>
));

function HomeScreen({
  navigation,
}: {
  navigation: {navigate: (screen: string) => void};
}): JSX.Element {
  const {
    state: {list},
    markCompleted,
  } = useContext(ToDoContext);

  return (
    <View style={styles.home}>
      <SectionList
        sections={[
          {
            title: 'Completed Tasks',
            data: list.filter(toDo => toDo?.completed),
          },
          {
            title: 'Pending Tasks',
            data: list
              .sort((a, b) => (a!.id > b!.id ? -1 : 1))
              .filter(toDo => !toDo?.completed),
          },
        ]}
        keyExtractor={item => item!.id}
        renderItem={({item}) => (
          <Task
            title={item!.title}
            id={item!.id}
            markCompleted={markCompleted}
            completed={item!.completed}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
      />
      <Button onPress={() => navigation.navigate('Task')} text="Add a Task" />
    </View>
  );
}

export default HomeScreen;
