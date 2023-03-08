const data = [
    {
      name: "Hong Kong",
      topLevelDomain: [".hk"],
      alpha2Code: "HK",
      alpha3Code: "HKG",
      callingCodes: ["852"],
      capital: "City of Victoria",
      altSpellings: ["HK", "香港"],
      region: "Asia",
      subregion: "Eastern Asia",
      population: 7324300,
      latlng: [22.25, 114.16666666],
      demonym: "Chinese",
      area: 1104.0,
      gini: 53.3,
      timezones: ["UTC+08:00"],
      borders: ["CHN"],
      nativeName: "香港",
      numericCode: "344",
      currencies: [
        {
          code: "HKD",
          name: "Hong Kong dollar",
          symbol: "$",
        },
      ],
      languages: [
        {
          iso639_1: "en",
          iso639_2: "eng",
          name: "English",
          nativeName: "English",
        },
        {
          iso639_1: "zh",
          iso639_2: "zho",
          name: "Chinese",
          nativeName: "中文 (Zhōngwén)",
        },
      ],
      translations: {
        de: "Hong Kong",
        es: "Hong Kong",
        fr: "Hong Kong",
        ja: "香港",
        it: "Hong Kong",
        br: "Hong Kong",
        pt: "Hong Kong",
        nl: "Hongkong",
        hr: "Hong Kong",
        fa: "هنگ‌کنگ",
      },
      flag: "https://flagcdn.com/hk.svg",
      regionalBlocs: [],
      cioc: "HKG",
    },
  ];

function extractString(inputData) {
  let outContent = ""
  outContent = outContent + " " + inputData
  return outContent;
}

function extractArray(inputData) {
  let outContent = ""
  for (let innerArray of inputData) {
    outContent = outContent + " " + innerArray
  }
  return outContent;
}

function extractObject(inputData) {
  let outContent = ""
  for (let innerObject in inputData) {
    outContent = outContent + " " + innerObject
  }
  return outContent;
}


function main() {
  for (let key in data[0]) {
    let outText = key.substring(0,1).toLocaleUpperCase() + key.substring(1) + `:`
    if (Array.isArray(data[0][key])) {
      if (extractArray(data[0][key]) instanceof Object) {
        let newData = extractObject( extractArray(data[0][key]) )
        outText = outText + newData
      } else {
      outText = outText + extractArray(data[0][key])
      }
    } else if (data[0][key] instanceof Object) {
      if (Array.isArray(extractObject(data[0][key]))) {
        let newData = extractArray( extractArray(data[0][key]) )
        outText = outText + newData
      } else {
      outText = outText + extractObject(data[0][key])
      }
    } else {
      outText = outText + extractString(data[0][key])
    }
    console.log(outText)
  }
}

main();