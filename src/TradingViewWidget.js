import TradingViewWidget, { Themes } from "react-tradingview-widget";

const trand = () => (
  <TradingViewWidget
    symbol="NASDAQ:AAPL"
    theme={Themes.DARK}
    locale="fa"
    autosize
  />
);
export default TradingViewWidget;