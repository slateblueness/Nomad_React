import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  // useState() 안을 비워 두면 기본값이 undefined 되기 때문에
  // 비우지 않도록 해야 함! (비우면 에러 발생)

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? null : `(Total: ${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((coin) => (
          <li>
            {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// input태그를 만들어서 거기에 숫자를 입력하면
// 그 숫자로 각각의 코인을 몇 개 구매할 수 있는지 알려 주는 계산기 만들기
