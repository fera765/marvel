import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background: #242222;
  width: ${width}px;
  height: ${height}px;
`;
export const SearchBox = styled.TextInput`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  background: #fff;
`;
export const BoxItem = styled.TouchableOpacity`
  flex: 1;
  width: 130px;
  margin: 10px;
  background: #fff;
  border-radius: 10px;
  flex-basis: 0;
  height: 200px;
`;
export const CheckHeroes = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const Thumb = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  resize-mode: cover;
`;
export const BoxItemText = styled.View`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  min-height: 50px;
`;
export const ItemText = styled.Text`
  margin: 8px 6px;
  color: #fff;
  font: bold 16px/16px 'Roboto';
`;
export const SaveBox = styled(Animated.View)`
  margin-top: 20px;
`;
export const SaveBoxButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: #610d0d;
  min-height: 80px;
`;
export const SaveBoxText = styled.Text`
  margin: 8px 6px;
  color: #fff;
  font: bold 26px/26px 'Roboto';
`;
