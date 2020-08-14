import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import md5 from 'js-md5';
import axios from 'axios';

import {
  Container,
  BoxItem,
  Thumb,
  Namecomic,
  IssueNumber,
  BoxPrice,
  BoxPriceType,
  BoxPriceText,
} from './styles';

const KEY_PUBLIC = '11ca0e472c329ba03f0108931a3018a9';
const KEY_PRIVATED = 'd4fc3633f5926618e57b0b727bf69c65e28d2cb0';

interface PropsHeroes {
  id: number;
  title: string;
  name: string;
  issueNumber: number;
  prices: [
    {
      type: string;
      price: number;
    },
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
}

const List: React.FC = () => {
  const [listData, setList] = useState([]);
  useEffect(() => {
    async function Init() {
      try {
        const id = await AsyncStorage.getItem('@Marvel:FavoriteHeroe');
        const timestamp = Number(new Date());
        const createHash = md5.create();
        createHash.update(timestamp + KEY_PRIVATED + KEY_PUBLIC);
        const response = await axios.get(
          `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${timestamp}&apikey=${KEY_PUBLIC}&hash=${createHash.hex()}`,
        );

        const { data } = response.data;
        setList(data.results);
      } catch (err) {
        console.log(err);
      }
    }
    Init();
  }, []);

  return (
    <Container>
      <FlatList
        data={listData}
        keyExtractor={item => String(item.id)}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 100,
        }}
        renderItem={({ item }: { item: PropsHeroes }) => {
          return (
            <BoxItem>
              <Thumb
                source={{
                  uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                }}
              />
              <Namecomic>{item.title}</Namecomic>
              <IssueNumber>
                issueNumber:
                <IssueNumber select>{item.issueNumber}</IssueNumber>
              </IssueNumber>
              {item.prices.map((price, index) => (
                <BoxPrice key={index}>
                  <BoxPriceType>{price.type}:</BoxPriceType>
                  <BoxPriceText>{price.price}</BoxPriceText>
                </BoxPrice>
              ))}
            </BoxItem>
          );
        }}
      />
    </Container>
  );
};

export default List;
