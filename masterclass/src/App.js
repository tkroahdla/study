import styled from 'styled-components';

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
// `;

// // Box의 모든 속성들을 들고 온 다음 추가적으로 아래 코드를 더해준다.
// const Circle = styled(Box)`
//   border-radius: 50px;
// `;

const Father = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

function App() {
  return (
    <Father>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      {/* as : 스타일은 유지한채 다른 태그로 사용 */}
    </Father>
  );
}

export default App;
