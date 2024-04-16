const category = [
  { _id: 1, name: "top" },
  { _id: 2, name: "jeans" },
  { _id: 3, name: "dress" },
  { _id: 4, name: "shoes" },
  { _id: 5, name: "accessories" },
  { _id: 6, name: "hats" },
];

const prices = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "0 to 199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "200 to 399",
    array: [200, 399],
  },
  {
    _id: 3,
    name: "400 to 599",
    array: [400, 599],
  },
  {
    _id: 4,
    name: "More than 600",
    array: [600, 1500000],
  },
];

export { category, prices };
