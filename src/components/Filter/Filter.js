const Filter = ({ value, onChange }) => {
   return (
      <label>
         filter for name
         <input type="text" value={value} onChange={onChange} />
      </label>
   );
};

export default Filter;
