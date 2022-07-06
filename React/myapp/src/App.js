import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [set, setSet] = useState(false);
  const [coins, setCoins] = useState([]);
  const [my, setMy] = useState(0);
  const onChange = (e) => {
    console.log(e.target.value);
    setMy(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (my === null) {
      return;
    }
    setSet(true);
  };
  useEffect(() => {
    fetch("http://api.coinpaprika.com/v1/tickers").then((response) =>
      response.json().then((json) => {
        setCoins(json);
        setLoading(false);
      })
    );
  }, []);

  return (
    <div>
      <h1>The Coin! ({loading ? "?" : coins.length})</h1>
      {set ? (
        my + "USD"
      ) : (
        <form onSubmit={onSubmit}>
          <input name="my" type="text" onChange={onChange}></input>
          <button>reply</button>
        </form>
      )}
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}): {my / coin.quotes.USD.price} QTY
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
