const developers = {
  ssj1: "ssj1",
  szb1: "szb1",
  vrt11: "vrt11",
};

const sectors = {
  davt: "davt",
  dkvp: "dkvp",
};

const departments = {
  tav: "tav",
};

const instructions = [
  {
    developer: developers.ssj1,
    sector: sectors.davt,
    department: departments.tav,
    number: "20915546.25300.00707 ТІ",
    title:
      "Технологічна iнструкцiя на проведення технічного обслуговування і поточного ремонту блоків вентиляторів БВ-01, БВ-11, БВ-13, БВ-14 шаф ПТК СНЕ РВ, СНЕ ТВ, УСБ енергоблоків № 1, 2",
    date: "26.10.2022",
    iPathWord: "./base/20915546.25300.00707 ТІ/20915546.25300.00707.doc",
  },
  {
    developer: developers.ssj1,
    sector: sectors.davt,
    department: departments.tav,
    number: "20915546.25000.00615 ТИ",
    title:
      "Технологическая инструкция на проведение технического обслуживания и ремонта блока нагрузок БН-01",
    date: "23.04.2021",
    iPathWord: "./base/20915546.25000.00615 ТИ/20915546.25000.0615.doc",
  },
  {
    developer: developers.ssj1,
    sector: sectors.davt,
    department: departments.tav,
    number: "20915546.25300.00734 ТІ",
    title:
      "Технологічна iнструкцiя на проведення технічного обслуговування та поточного ремонту асинхронних електродвигунів номінальною потужністю до 22 кВт",
    date: "26.01.2024",
    iPathWord: "./base/20915546.25300.00734 ТІ/20915546.25300.00734.doc",
  },
  {
    developer: developers.szb1,
    sector: sectors.davt,
    department: departments.tav,
    number: "20915546.25300.00482 ТИ",
    title:
      "Технологическая инструкция для проведения технического обслуживания, текущего и капитального ремонта схемы сигнализации положения обратного, предохранительного клапана реакторного отделения энергоблоков № 1, 2",
    date: "18.11.2021",
    iPathWord: "./base/20915546.25300.00482 ТИ/20915546.25300.00482.doc",
  },

];

export default instructions;


const devs = [{
  id: "tav",
  title: "ЦТАВ",
  sectors: [
    {
      id: "davt",
      title: "Дільниця автоматики",
      docs: [],
      groups: [
        {
          id: "ssj1",
          title: "Група ССЖ-1",
          docs: [
            {
              id: "i1",
              number: "20915546.25300.00707 ТІ",
              title:
                "Технологічна iнструкцiя на проведення технічного обслуговування і поточного ремонту блоків вентиляторів БВ-01, БВ-11, БВ-13, БВ-14 шаф ПТК СНЕ РВ, СНЕ ТВ, УСБ енергоблоків № 1, 2",
              date: "26.10.2022",
              instructionPath: "",
              protocols: [
                {
                  id: "p1",
                  title: "Протокол технічного обслуговування блоків вентиляторів",
                  protocolPath: "",
                  protocolType: "ТО",
                  protocolInfo: ['sadfdsaf', 'sadfsadf', 'asddsaf'],
                  protocolJobs: [{
                    order: "6.1.1",
                    job: "Робота 1"
                  },
                  {
                    order: "6.1.2",
                    job: "Робота 2"
                  },
                  {
                    order: "6.1.2",
                    job: "Робота 3"
                  },
                  {
                    order: "6.1.2",
                    job: "Робота 4"
                  },
                  {
                    order: "6.1.3",
                    job: "Робота 5"
                  },
                ]
                }
              ]
            },
          ],
        },
        {
          id: "szb1",
          title: "Група СЗБ-1",
          docs: [],
        }
      ]
    },
    {
      id: "dkvp",
      title: "Дільниця ремонту КВП",
      docs: [],
      groups: [
        {
          id: "vrt11",
          title: "Група 1ВРТ-1",
          docs: [],
        },
        {
          id: "vrt12",
          title: "Група 1ВРТ-2",
          docs: [],
        },
      ]
    }
  ]
}];
