const initialData = [
  {
    date: "2024-07-23",
    bloodGlucose: 12,
    oxygenSat: 18,
    bodytemp: 36,
    heartrate: 75,
    bp: 100,
    mood: 5,
    country: "USA",
    age: 22,
    sex: "Female",
  },
  {
    date: "2024-07-24",
    bloodGlucose: 14,
    oxygenSat: 20,
    bodytemp: 37,
    heartrate: 78,
    bp: 110,
    mood: 6,
    country: "Canada",
    age: 28,
    sex: "Male",
  },
  {
    date: "2024-07-25",
    bloodGlucose: 16,
    oxygenSat: 22,
    bodytemp: 38,
    heartrate: 80,
    bp: 115,
    mood: 7,
    country: "USA",
    age: 35,
    sex: "Female",
  },
  {
    date: "2024-07-26",
    bloodGlucose: 10,
    oxygenSat: 21,
    bodytemp: 37.5,
    heartrate: 76,
    bp: 105,
    mood: 5,
    country: "USA",
    age: 45,
    sex: "Male",
  },
  {
    date: "2024-07-27",
    bloodGlucose: 13,
    oxygenSat: 19,
    bodytemp: 36.5,
    heartrate: 74,
    bp: 102,
    mood: 4,
    country: "India",
    age: 55,
    sex: "Female",
  },
  {
    date: "2024-07-28",
    bloodGlucose: 15,
    oxygenSat: 23,
    bodytemp: 37.2,
    heartrate: 77,
    bp: 108,
    mood: 6,
    country: "USA",
    age: 65,
    sex: "Male",
  },
  {
    date: "2024-07-27",
    bloodGlucose: 11,
    oxygenSat: 20,
    bodytemp: 36.8,
    heartrate: 72,
    bp: 104,
    mood: 5,
    country: "USA",
    age: 75,
    sex: "Female",
  },
  {
    date: "2024-07-23",
    bloodGlucose: 17,
    oxygenSat: 25,
    bodytemp: 37.5,
    heartrate: 79,
    bp: 112,
    mood: 8,
    country: "Canada",
    age: 23,
    sex: "Male",
  },
  {
    date: "2024-07-23",
    bloodGlucose: 17,
    oxygenSat: 25,
    bodytemp: 37.5,
    heartrate: 79,
    bp: 112,
    mood: 8,
    country: "Canada",
    age: 23,
    sex: "Male",
  },
  {
    date: "2024-07-24",
    bloodGlucose: 14,
    oxygenSat: 21,
    bodytemp: 37,
    heartrate: 75,
    bp: 109,
    mood: 6,
    country: "Canada",
    age: 43,
    sex: "Male",
  },
  {
    date: "2024-07-25",
    bloodGlucose: 14,
    oxygenSat: 21,
    bodytemp: 37,
    heartrate: 75,
    bp: 109,
    mood: 6,
    country: "Canada",
    age: 43,
    sex: "Male",
  },
  {
    date: "2024-07-26",
    bloodGlucose: 12,
    oxygenSat: 20,
    bodytemp: 36.8,
    heartrate: 74,
    bp: 107,
    mood: 5,
    country: "Canada",
    age: 62,
    sex: "Female",
  },
  {
    date: "2024-07-27",
    bloodGlucose: 15,
    oxygenSat: 24,
    bodytemp: 37.4,
    heartrate: 78,
    bp: 111,
    mood: 7,
    country: "UK",
    age: 63,
    sex: "Male",
  },
  {
    date: "2024-07-28",
    bloodGlucose: 11,
    oxygenSat: 19,
    bodytemp: 36.5,
    heartrate: 72,
    bp: 104,
    mood: 4,
    country: "Canada",
    age: 66,
    sex: "Female",
  },
  {
    date: "2024-07-29",
    bloodGlucose: 15,
    oxygenSat: 19,
    bodytemp: 36.5,
    heartrate: 72,
    bp: 104,
    mood: 4,
    country: "Japan",
    age: 38,
    sex: "Female",
  },
  {
    date: "2024-07-31",
    bloodGlucose: 16,
    oxygenSat: 23,
    bodytemp: 37.1,
    heartrate: 76,
    bp: 110,
    mood: 6,
    country: "India",
    age: 53,
    sex: "Male",
  },
  {
    date: "2024-07-31",
    bloodGlucose: 22,
    oxygenSat: 23,
    bodytemp: 37.1,
    heartrate: 76,
    bp: 110,
    mood: 6,
    country: "India",
    age: 30,
    sex: "Female",
  },
  {
    date: "2024-07-31",
    bloodGlucose: 16,
    oxygenSat: 23,
    bodytemp: 37.1,
    heartrate: 76,
    bp: 130,
    mood: 6,
    country: "Canada",
    age: 83,
    sex: "Male",
  },
  {
    date: "2024-08-01",
    bloodGlucose: 18,
    oxygenSat: 20,
    bodytemp: 45.1,
    heartrate: 88,
    bp: 110,
    mood: 10,
    country: "USA",
    age: 20,
    sex: "Female",
  },
  {
    date: "2024-08-02",
    bloodGlucose: 20,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "Russia",
    age: 20,
    sex: "Female",
  },
  {
    date: "2024-08-03",
    bloodGlucose: 10,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "Venezuela",
    age: 20,
    sex: "Female",
  },
  {
    date: "2024-08-04",
    bloodGlucose: 15,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "USA",
    age: 20,
    sex: "Female",
  },
  {
    date: "2024-08-05",
    bloodGlucose: 15,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "Brazil",
    age: 20,
    sex: "Male",
  },
  {
    date: "2024-08-06",
    bloodGlucose: 16,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "Brazil",
    age: 50,
    sex: "Female",
  },
  {
    date: "2024-08-07",
    bloodGlucose: 14,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "Mexico",
    age: 50,
    sex: "Female",
  },
  {
    date: "2024-08-08",
    bloodGlucose: 18,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "Mexico",
    age: 20,
    sex: "Female",
  },
  {
    date: "2024-08-09",
    bloodGlucose: 25,
    oxygenSat: 26,
    bodytemp: 40.1,
    heartrate: 78,
    bp: 110,
    mood: 10,
    country: "Mexico",
    age: 20,
    sex: "Female",
  },
];
export default initialData;
export const callData = [
  {
    name: "Ester Howard",
    gender: "Female",
    age: "36",
    callType: "video",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
  {
    name: "Foster Howard",
    gender: "Female",
    age: "40",
    callType: "video",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
  {
    name: "Harry Howard",
    gender: "Male",
    age: "50",
    callType: "Audio",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
  {
    name: "Alex Howard",
    gender: "Male",
    age: "32",
    callType: "video",
    blood: "O+",
    weight: "80",
    height: "170",
    location: "Mexico",
  },
];
