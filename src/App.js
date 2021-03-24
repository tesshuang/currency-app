import moment from 'moment';
import { useState, useEffect } from 'react';
import Toggle from './components/Toggle';

import './App.css';

function App() {
  const [difference, setDifference] = useState(null);
  const [currentRate, setCurrentRate] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      const endpoint = 'https://api.frankfurter.app';

      const latestResponse = await fetch(`${endpoint}/latest?from=CAD&to=USD`);
      const latest = await latestResponse.json();
      setCurrentRate(latest.rates.USD);

      const today = moment().format('YYYY-MM-DD');
      const thirtyDaysBefore = moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD');

      const historicalString = `${thirtyDaysBefore}..${today}`;

      const last30DaysRes = await fetch(
        `${endpoint}/${historicalString}?from=CAD&to=USD`,
      );
      const last30Days = await last30DaysRes.json();

      const rates = Object.values(last30Days.rates).sort(
        (a, b) => a.USD - b.USD,
      );
      const mid = Math.ceil(rates.length / 2);

      const median =
        rates.length % 2 === 0
          ? (rates[mid] + rates[mid - 1]) / 2
          : rates[mid - 1];

      if (median > currentRate) {
        setDifference('low');
      } else if (median < currentRate) {
        setDifference('high');
      } else {
        setDifference('equal');
      }
      console.log(latest.rates.USD);
      console.log({ rates, median });
    };
    fetchCurrencyData();
  }, [currentRate]);

  return (
    <div className="App">
      {currentRate && difference && (
        <div>
          <h1>CAD to USD Exchange Rate</h1>
          <h3>Today's rate is {currentRate}</h3>
          <p>Suggestion of day:</p>
          <Toggle action={difference} changeAction={setDifference} />
        </div>
      )}
    </div>
  );
}

export default App;
