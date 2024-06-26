const CheckBox = ({
  category,
  checkedCategory,
  onFilters,
}: {
  category: { _id: number; name: string }[];
  checkedCategory: string[];
  onFilters: (newChecked: string[]) => void;
}) => {
  const handleToggle = (continentId: string) => {
    const currentIndex = checkedCategory.indexOf(continentId);

    const newChecked = [...checkedCategory];

    if (currentIndex === -1) {
      newChecked.push(continentId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };
  return (
    <div className="p-4 mb-3 border border-gray-300 rounded-md max-w-[300px]">
      {category?.map((category) => (
        <div key={category._id} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleToggle(category._id.toString())}
            checked={
              checkedCategory.indexOf(category._id.toString()) === -1 ? false : true
            }
          />
          <label>{category.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
