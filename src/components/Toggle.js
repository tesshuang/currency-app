import '../App.css';

const Toggle = ({ action }) => (
  <div className="switch-toggle">
    <input id="buy" name="action" type="radio" />
    <label htmlFor="buy">BUY</label>
    <input id="hold" name="action" type="radio" />
    <label htmlFor="hold">HOLD</label>
    <input id="sell" name="action" type="radio" />
    <label htmlFor="sell">SELL</label>
  </div>
);

export default Toggle;
