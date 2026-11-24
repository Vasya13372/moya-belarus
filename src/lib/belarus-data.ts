export type Region = {
  id: string;
  name: string;
  center: string;
  area: number;
  population: number;
  centerPopulation: number;
  founded: string;
  fact: string;
};

export const REGIONS: Region[] = [
  { id: "brest", name: "Брестская область", center: "Брест", area: 32786, population: 1310, centerPopulation: 340, founded: "1019", fact: "Здесь Брестская крепость и большая часть Беловежской пущи — одного из последних первобытных лесов Европы." },
  { id: "vitebsk", name: "Витебская область", center: "Витебск", area: 40051, population: 1070, centerPopulation: 360, founded: "974", fact: "Озёрный край: Браславские озёра, Полоцк — древнейший город страны, родина «Славянского базара»." },
  { id: "gomel", name: "Гомельская область", center: "Гомель", area: 40372, population: 1330, centerPopulation: 500, founded: "1142", fact: "Самая большая область. Дворцово-парковый ансамбль Румянцевых-Паскевичей на берегу Сожа." },
  { id: "grodno", name: "Гродненская область", center: "Гродно", area: 25127, population: 990, centerPopulation: 360, founded: "1127", fact: "Мирский замок, Августовский канал и самая «европейская» архитектура старого города." },
  { id: "minsk", name: "Минская область", center: "Минск", area: 39854, population: 1470, centerPopulation: 1990, founded: "1067", fact: "Несвижский замок Радзивиллов, Дзержинская гора — высшая точка страны, 345 м." },
  { id: "mogilev", name: "Могилёвская область", center: "Могилёв", area: 29068, population: 980, centerPopulation: 355, founded: "1267", fact: "Буйничское поле, Днепр и город с одной из самых широких главных площадей в стране." },
];

export const MINSK_CITY = { name: "г. Минск", area: 409, population: 1990 };

export const POPULATION_HISTORY = [
  { year: 1959, value: 8.06 },
  { year: 1970, value: 9.0 },
  { year: 1979, value: 9.56 },
  { year: 1989, value: 10.15 },
  { year: 1994, value: 10.24 },
  { year: 1999, value: 10.04 },
  { year: 2009, value: 9.5 },
  { year: 2019, value: 9.41 },
  { year: 2024, value: 9.16 },
  { year: 2026, value: 9.07 },
];

export const AGE_GROUPS = [
  { label: "Моложе трудоспособного", range: "0–15 лет", share: 18, token: "var(--chart-3)" },
  { label: "Трудоспособный возраст", range: "16–60/62", share: 56, token: "var(--chart-2)" },
  { label: "Старше трудоспособного", range: "60+/62+", share: 26, token: "var(--chart-1)" },
];

export const LAND_USE = [
  { label: "Леса", share: 40, note: "≈ 8,3 млн га — «лёгкие Европы»", token: "var(--chart-4)" },
  { label: "Сельхозугодья", share: 41, note: "пашни, луга и пастбища", token: "var(--chart-2)" },
  { label: "Болота", share: 4, note: "Полесье — крупнейший болотный массив", token: "var(--chart-5)" },
  { label: "Воды", share: 2, note: "≈ 20 800 рек и 10 800 озёр", token: "var(--chart-3)" },
  { label: "Застройка и прочее", share: 13, note: "города, дороги, нарушенные земли", token: "var(--chart-1)" },
];

export const URBAN_BY_REGION = [
  { name: "г. Минск", share: 100 },
  { name: "Гомельская", share: 80 },
  { name: "Могилёвская", share: 86 },
  { name: "Гродненская", share: 72 },
  { name: "Брестская", share: 70 },
  { name: "Витебская", share: 79 },
  { name: "Минская", share: 54 },
];

export const AGE_STATS = [
  { k: "Средний возраст", v: "42,1", unit: "года" },
  { k: "Продолжительность жизни", v: "74,6", unit: "лет" },
  { k: "Женщин", v: "53", unit: "%" },
];

export const UNESCO = [
  { name: "Беловежская пуща", year: 1992, type: "Природное наследие", text: "Древнейший реликтовый лес Европы, общий с Польшей. Здесь живёт крупнейшая в мире вольная популяция зубров — более 700 особей.", img: "pushcha" },
  { name: "Мирский замок", year: 2000, type: "Культурное наследие", text: "Готика, ренессанс и барокко в одном ансамбле XVI века. Замок Ильиничей, затем Радзивиллов, стоит на берегу пруда.", img: "mir" },
  { name: "Несвижский замок", year: 2005, type: "Культурное наследие", text: "Резиденция Радзивиллов с костёлом Божьего Тела — первым барочным храмом Восточной Европы.", img: "nesvizh" },
  { name: "Геодезическая дуга Струве", year: 2005, type: "Культурное наследие", text: "Цепь триангуляционных пунктов от Норвегии до Чёрного моря, по которой впервые точно измерили форму Земли. В Беларуси — 5 пунктов.", img: "minsk" },
  { name: "Обряд «Цари Максимилианы»", year: 2009, type: "Нематериальное наследие", text: "Народная новогодняя театральная драма из села Семежево — живой обряд, который передаётся из поколения в поколение.", img: "kupalle" },
  { name: "Будславский фэст", year: 2018, type: "Нематериальное наследие", text: "Праздник почитания Будславской иконы Божьей Матери — паломничество, собирающее тысячи людей каждый июль.", img: "straw" },
];
