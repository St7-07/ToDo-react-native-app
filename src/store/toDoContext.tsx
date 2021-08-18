import React, {createContext, useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export type ToDo = {
  id: string;
  title: string;
  deadline: Date;
  remind: string;
  repeat: string;
  startTime: Date;
  endTime: Date;
  completed: boolean;
};

type Context = {
  addToDo: (_toDo: ToDo) => void;
  markCompleted: (id: string, completed: boolean) => void;
  state: {list: [ToDo?]};
};

const STORE_KEY = 'ToDoList';

const ToDoContext = createContext<Context>({
  addToDo: () => {},
  markCompleted: () => {},
  state: {list: []},
});

export const ToDoContextProvider = ({children}: {children: JSX.Element}) => {
  const [state, setState] = useState<{list: [ToDo?]}>({
    list: [],
  });

  useEffect(() => {
    getData(STORE_KEY).then(data => {
      if (data && data instanceof Array) {
        setState({list: data as [ToDo?]});
      }
    });
  }, []);

  const {list} = state;

  const addToDo = useCallback(
    (toDo: ToDo) => {
      list.push({...toDo, id: Date.now().toString(), completed: false});
      setState({list});
      storeData(STORE_KEY, list);
    },
    [list],
  );

  const markCompleted = useCallback(
    (id: string, completed: boolean) => {
      const task = list.find(toDo => toDo?.id === id);
      if (task) {
        task!.completed = completed;
      }
      setState({list});
      storeData(STORE_KEY, list);
    },
    [list],
  );

  return (
    <ToDoContext.Provider
      value={{
        state,
        addToDo,
        markCompleted,
      }}>
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;
