import styled from 'styled-components/native';

interface LabelType {
  big?: boolean;
  light?: boolean;
}

export const Wrapper = styled.ScrollView`
  padding-top: 40px;
  margin-bottom: 20px;
`;

export const SmallTitle = styled.Text`
  color: ${({ theme }) => theme.colorPrimary};
  font-size: 24px;
  text-transform: uppercase;
  margin-top: 15px;
`;

export const FormLabel = styled.View<LabelType>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 10px;
  width: 80%;
  margin: 15px auto 0;
`;

export const Desc = styled.Text<LabelType>`
  font-size: 12px;
  color: ${({ theme, light }) => (light ? '#fff' : theme.colorPrimary)};
  opacity: 0.7;
  margin-bottom: 7px;
  padding: 10px 40px;
`;

export const Separator = styled.View`
  border-bottom-color: ${({ theme }) => theme.colorPrimary};
  border-bottom-width: 2px;
  width: 80%;
  margin: 10px auto 20px;
`;

export const Placeholder = styled.View`
  height: 50px;
  width: 100%;
`;
