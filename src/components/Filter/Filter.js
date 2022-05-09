import './Filter.css';

const Filter = ({ value, onChange }) => {
   return (
      <label className="label-filter">
         Filter for name
         <input type="text" value={value} onChange={onChange} />
      </label>
   );
};

export default Filter;
