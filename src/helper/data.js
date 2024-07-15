export const data = [
  { firstName: "John", lastName: "Doe", age: 28, sex: "Male" },
  { firstName: "Jane", lastName: "Smith", age: 22, sex: "Female" },
  { firstName: "Michael", lastName: "Johnson", age: 35, sex: "Male" },
  { firstName: "Emily", lastName: "Davis", age: 30, sex: "Female" },
  { firstName: "William", lastName: "Brown", age: 42, sex: "Male" },
  { firstName: "Linda", lastName: "Wilson", age: 26, sex: "Female" },
  { firstName: "Robert", lastName: "Moore", age: 34, sex: "Male" },
  { firstName: "Patricia", lastName: "Taylor", age: 29, sex: "Female" },
  { firstName: "James", lastName: "Anderson", age: 40, sex: "Male" },
  { firstName: "Barbara", lastName: "Thomas", age: 24, sex: "Female" },
];

export const editAndDisabledCellData = [
  {
    firstName: {
      value: "John",
      isEditable: false,
    },
    lastName: {
      value: "Doe",
      isEditable: true,
    },
    age: { value: 28, isEditable: false },
    sex: { value: "Male", isEditable: false },
  },
  {
    firstName: {
      value: "Jane",
      isEditable: true,
    },
    lastName: {
      value: "Smith",
      isEditable: false,
    },
    age: {
      value: 22,
      isEditable: false,
    },
    sex: {
      value: "Female",
      isEditable: true,
    },
  },
  {
    firstName: {
      value: "Michael",
      isEditable: false,
    },
    lastName: {
      value: "Johnson",
      isEditable: true,
    },
    age: {
      value: 35,
      isEditable: false,
    },
    sex: {
      value: "Male",
      isEditable: true,
    },
  },
];
