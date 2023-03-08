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

let hk = data[0];

for (let key in hk) {
    if (Array.isArray(hk[key])) {
        let listString = ""
        for (let list in hk[key]) {
            if (typeof hk[key][list] == "object" && (Array.isArray(hk[key][list]) != true)) {
                let tempObj = hk[key][list]
                for (let item in tempObj) {
                listString = listString + item + ": " + tempObj[item] + " "
                }
            } else {
                listString = listString + " " + hk[key][list]
            }
        }
        console.log(key.substring(0,1).toUpperCase() + key.substring(1) + ":" + listString)
    } else if (typeof hk[key] == "object" && (Array.isArray(hk[key]) != true)) {
        let tempObj = hk[key]
        let listString = ""
        for (let item in tempObj) {
            listString = listString + item + ": " + tempObj[item] + " "
        }
        console.log(key.substring(0,1).toUpperCase() + key.substring(1) + ":" + listString)
    } else {
        console.log(key.substring(0,1).toUpperCase() + key.substring(1) + ": " + hk[key])
    }

    
}