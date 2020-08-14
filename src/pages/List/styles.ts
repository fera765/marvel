import styled, { css } from 'styled-components/native';

interface SelectProps {
  select?: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background: #2e2e2e;
`;
export const BoxItem = styled.View`
  width: 100%;
  margin-top: 30px;
  background: #fff;
  border-radius: 10px;
  flex-basis: 0;
  height: 400px;
`;

export const Thumb = styled.Image`
  width: 100%;
  max-height: 200px;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  resize-mode: cover;
`;
export const Namecomic = styled.Text`
  font: bold 16px/16px '';
  margin: 16px 16px 0 16px;
  color: #000;
`;
export const IssueNumber = styled.Text<SelectProps>`
  font: normal 16px/16px '';
  margin: 16px;
  color: #000;

  ${props =>
    props.select &&
    css`
      font-weight: bold;
      font-size: 18px;
    `}
`;

export const BoxPrice = styled.View`
  margin: 5px 16px;
  flex-direction: row;
`;

export const BoxPriceType = styled.Text`
  font: normal 16px/16px '';
  color: #000;
`;
export const BoxPriceText = styled.Text`
  font: bold 16px/16px '';
  margin-left: 10px;
  color: #000;
`;
