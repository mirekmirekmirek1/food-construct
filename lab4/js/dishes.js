/* exported dishes */
// Все блюда, которые есть в меню.
// Порядок здесь не важен: перед выводом на страницу блюда сортируются по названию.
const dishes = [
    {
        keyword: 'norwegian_soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '330 г',
        image: 'soups/norwegian_soup'
    },
    {
        keyword: 'gazpacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350 г',
        image: 'soups/gazpacho'
    },
    {
        keyword: 'mushroom_soup',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '330 г',
        image: 'soups/mushroom_soup'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main-course',
        count: '310 г',
        image: 'main_course/lasagna'
    },
    {
        keyword: 'fried_potatoes',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main-course',
        count: '250 г',
        image: 'main_course/friedpotatoeswithmushrooms1'
    },
    {
        keyword: 'chicken_cutlets',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main-course',
        count: '280 г',
        image: 'main_course/chickencutletsandmashedpotatoes'
    },
    {
        keyword: 'orange_juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/orangejuice'
    },
    {
        keyword: 'carrot_juice',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/carrotjuice'
    },
    {
        keyword: 'apple_juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/applejuice'
    }
];
