import styled, { keyframes } from 'styled-components';

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
// `;

// // Box의 모든 속성들을 들고 온 다음 추가적으로 아래 코드를 더해준다.
// const Circle = styled(Box)`
//   border-radius: 50px;
// `;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vh;
  justify-content: center;
  align-items: center;
`;

const anim = keyframes`
from{
  color:tomato;
}
to{
  color:teal;
}
`;

const Btn = styled.button`
  animation: ${anim} 0.5s infinite;
`;

function App() {
  return (
    <Wrapper>
      <Btn>asdf</Btn>
    </Wrapper>
  );
}

export default App;
