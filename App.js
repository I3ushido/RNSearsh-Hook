import React, {useState, useEffect, useMemo, useSelector} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  FlatList,
} from 'react-native';

import axios from 'axios';
const URL = 'https://api.publicapis.org/categories';

const App = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);

  useEffect(() => {
    axios(URL)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        setFilter(response.data);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  }, []);

  const handleSearch = text => {
    if (text) {
      const newData = data.filter(item => {
        const itemData = item ? item : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilter(newData);
      setSearch(text);
    } else {
      setFilter(data);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
          Search Something!
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => handleSearch(text)}
          value={search}
        />
        <View style={{flex: 1}}>
          <FlatList
            data={filter}
            renderItem={({item}) => (
              <View>
                <Text style={{textAlign: 'center'}}>{item}</Text>
              </View>
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
