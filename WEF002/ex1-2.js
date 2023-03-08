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

function dataArrayToStringList(array) {
    let objects = array[0]
    for (let key in objects) {
        let outText = key.substring(0,1).toLocaleUpperCase() + key.substring(1) + `: `
        if (Array.isArray(objects[key])) {
            for (let innerArray of objects[key]) {
                if (innerArray instanceof Object) {
                    for (let innerObject in innerArray) {
                        outText = outText + innerObject.substring(0,1).toLocaleUpperCase() + innerObject.substring(1) + `: ` + `${innerArray[innerObject]} `
                    }
                } else {
                    outText = outText + `${innerArray} `
                }
            }
        } else if (objects[key] instanceof Object) {
            for (let innerObject in objects[key]) {
                outText = outText + `${innerObject}: ${objects[key][innerObject]} `
            }
        } else {
            outText = outText + `${objects[key]}`
        }
        // return outText;
        console.log(outText)
    }
}


console.log(dataArrayToStringList(data))