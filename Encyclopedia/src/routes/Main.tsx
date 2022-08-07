import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const Wrapper1 = styled.div`
  width: 100vw;
  height: 50vw;
`;

const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-color: black;
  border-width: 10px;
`;

const Wrapper3 = styled.div`
  border-color: black;
  border-width: 10px;
  width: 80vw;
  height: 10vw;
`;

interface tabProps {
  tabIndex: string;
}

const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
  console.log(e.key);
};

function Main() {
  return (
    <Wrapper1>
      <Wrapper2>
        <Wrapper3>Wrapper3</Wrapper3>

        {/* <input type="text" name="message" onKeyDown={onKeyPress}></input> */}
      </Wrapper2>
    </Wrapper1>
  );
}
export default Main;
