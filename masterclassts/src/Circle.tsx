import styled from 'styled-components';

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

interface ComProps {
  bgColor: string;
  borderColor: string;
}

const Com = styled.div<ComProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100%;
  border: 1px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor = undefined }: CircleProps) {
  return <Com bgColor={bgColor} borderColor={borderColor ?? 'black'}></Com>;
}

export default Circle;
