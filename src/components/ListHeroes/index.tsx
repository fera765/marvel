import React, { useState, useEffect } from 'react';
import { FlatList, Animated, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import md5 from 'js-md5';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  BoxItem,
  SearchBox,
  CheckHeroes,
  Thumb,
  BoxItemText,
  ItemText,
  SaveBox,
  SaveBoxButton,
  SaveBoxText,
} from './styles';

interface PropsHeroes {
  id: number;
  title: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const KEY_PUBLIC = '11ca0e472c329ba03f0108931a3018a9';
const KEY_PRIVATED = 'd4fc3633f5926618e57b0b727bf69c65e28d2cb0';

const ListHeroes: React.FC = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [listData, setList] = useState([]);
  const [heroes, setHeroes] = useState(0);
  const [search, setSearch] = useState('');

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    async function initList() {
      try {
        const timestamp = Number(new Date());
        const createHash = md5.create();
        createHash.update(timestamp + KEY_PRIVATED + KEY_PUBLIC);

        const filter = search.length > 0 && `&nameStartsWith=${search}`;
        const response = await axios.get(
          `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}${filter}&orderBy=name&limit=${50}&apikey=${KEY_PUBLIC}&hash=${createHash.hex()}`,
        );

        const { data } = response.data;
        setList(data.results);
      } catch (err) {
        console.log(err);
      }
    }
    initList();
  }, [search]);

  function handleSearch(value: String) {
    setSearch(value.replace(' ', '-'));
  }

  function handleSelect(id: Number) {
    if (id !== heroes) {
      animation.setValue(0);
      setHeroes(id);
      Animated.timing(animation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }
  async function handlePage() {
    await AsyncStorage.setItem('@Marvel:FavoriteHeroe', String(heroes));
    navigation.navigate('List');
  }

  return (
    <Container style={{ width }}>
      <SearchBox
        onChangeText={e => handleSearch(e)}
        autoCorrect={false}
        placeholder="Buscar herói favorito"
      />
      <FlatList
        numColumns={2}
        data={listData}
        keyExtractor={item => String(item.id)}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 100,
        }}
        renderItem={({ item }: { item: PropsHeroes }) => {
          return (
            <BoxItem
              activeOpacity={0.7}
              onPress={() => handleSelect(Number(item.id))}
            >
              {heroes === item.id && (
                <CheckHeroes>
                  <Icon name="check-circle" size={50} color="#fff" />
                </CheckHeroes>
              )}
              <Thumb
                source={{
                  uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                }}
              />
              <BoxItemText>
                <ItemText>{item.name}</ItemText>
              </BoxItemText>
            </BoxItem>
          );
        }}
      />
      {heroes !== 0 && (
        <SaveBox style={{ transform: [{ scale: animation }] }}>
          <SaveBoxButton onPress={handlePage} activeOpacity={0.7}>
            <SaveBoxText>SALVAR</SaveBoxText>
          </SaveBoxButton>
        </SaveBox>
      )}
    </Container>
  );
};
export default ListHeroes;
