import styled from 'styled-components/native';

interface IStyles {
  status: number;
}

export const Wrapper = styled.View`
  max-height: 85%;
  margin-top: 20px;
  padding-top: 30px;
`;

export const ListContainer = styled.FlatList`
  margin-top: 30px;
`;

export const SingleWord = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
`;

export const DataWord = styled.View<IStyles>`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  width: 70%;
  justify-content: space-between;
  padding: 0 40px 0 10px;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
