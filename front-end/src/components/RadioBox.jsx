const RadioBox = ({ prices, checkedPrice, onFilters }) => {
  return (
    <div className="p-4 mb-3 border border-gray-300 rounded-md max-w-[300px]">
      {prices?.map((price) => (
        <div key={price._id} className="flex items-center mb-2">
          <input
            checked={JSON.stringify(checkedPrice) == JSON.stringify(price.array)}
            onChange={(e) => onFilters(e.target.value)}
            type="radio"
            className="mr-2"
            id={price._id}
            value={price._id}
          />
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioBox;
