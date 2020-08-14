import React, { useState, useEffect } from 'react';
import { Svg, Path, Text, TextPath } from 'react-native-svg';
import { useWindowDimensions, Animated } from 'react-native';

import { Container, Scroll, Content, ContentHome, ContentPage } from './styles';

import Marvel from '../../assets/marvel.png';

import ListHeroes from '../../components/ListHeroes';

const Home: React.FC = () => {
  const [animation] = useState(new Animated.Value(0));

  const { width, height } = useWindowDimensions();

  return (
    <Container>
      <Scroll
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}
      >
        <Content style={{ width }}>
          <ContentHome>
            <ContentPage>
              <Svg width="800" height="300" viewBox="34 0 200 300">
                <Path
                  fill="transparent"
                  id="path"
                  d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
                />
                <Text fill="#c40808" fontWeight="bold" fontSize="56">
                  <TextPath xlinkHref="#path"> Marvel Comics</TextPath>
                </Text>
              </Svg>
            </ContentPage>
            <Animated.Image
              source={Marvel}
              style={{
                width: '80%',
                height: '80%',
                marginTop: 80,
              }}
              resizeMode="contain"
            />
          </ContentHome>
        </Content>
        <ListHeroes />
      </Scroll>
    </Container>
  );
};

export default Home;
