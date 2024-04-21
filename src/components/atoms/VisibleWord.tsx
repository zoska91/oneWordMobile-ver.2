import { FC } from 'react';
import styled from 'styled-components/native';

interface VisibleWordProps {
  children: React.ReactNode;
}

const Wrapper = styled.View`
  border: 4px dashed ${({ theme }) => theme.colorSecondary};
  width: 100%;
  padding: 20px 15px;
  margin-top: 20px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
`;

const VisibleWord: FC<VisibleWordProps> = ({ children }) => {
  return (
    <Wrapper>
      <StyledText style={{ fontFamily: 'JosefinSans_400Regular' }}>{children}</StyledText>
    </Wrapper>
  );
};

export default VisibleWord;
