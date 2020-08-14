import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
`;
export const Scroll = styled.ScrollView`
  flex: 1;
`;
export const Content = styled.View`
  flex: 1;
  width: ${width}px;
  height: ${height}px;
  background: #242222;
`;
export const ContentHome = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ContentPage = styled.View`
  position: absolute;
  top: 70px;
  margin-top: 10px;
`;
export const ContentPageScroll = styled.View`
  flex: 1;
`;
export const ContentPageText = styled.Image`
  width: 150px;
  height: 150px;
`;
