import React, {  useState, useEffect } from "react";
//import PropTypes from 'prop-types'
import Coin from "./Coin";
import "./App.css";
import axios from "axios";
//import { symbol } from 'prop-types';
import TradingViewWidget from "./TradingViewWidget";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())

  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">currency</h1>
        <form>
          <input
            type="text"
            placeholder="search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="charts">
        <coingecko-coin-compare-chart-widget
          coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
          currency="usd"
          locale="en"
        ></coingecko-coin-compare-chart-widget>
      </div>
      <div></div>
      <div className="convertor">
        <crypto-converter-widget
          shadow
          symbol
          live
          background-color="#383a59"
          border-radius="0.96rem"
          fiat="iranian-rial"
          crypto="bitcoin"
          amount="1"
          decimal-places="1"
        ></crypto-converter-widget>
        {/* <a href="https://currencyrate.today/" target="_blank" rel="noopener">
          CurrencyRate.Today
        </a> */}
      </div>
      <div>
        <TradingViewWidget />
      </div>
      {filteredCoins.map((coin) => {
        return (
          <div>
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          </div>
        );
      })}
    </div>
  );
}
export default App;
