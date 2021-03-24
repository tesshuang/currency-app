import '../App.css';

const Toggle = ({ action, changeAction }) => (
  <div className="switch-toggle">
    <input
      id="buy"
      name="action"
      type="radio"
      onChange={() => changeAction('high')}
      checked={action === 'high' && true}
    />
    <label htmlFor="buy">BUY</label>
    <input
      id="hold"
      name="action"
      type="radio"
      onChange={() => changeAction('equal')}
      checked={action === 'equal' && true}
    />
    <label htmlFor="hold">HOLD</label>
    <input
      id="sell"
      name="action"
      type="radio"
      onChange={() => changeAction('low')}
      checked={action === 'low' && true}
    />
    <label htmlFor="sell">SELL</label>
  </div>
);

export default Toggle;
