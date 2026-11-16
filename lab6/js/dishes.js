/* exported dishes */
// Все блюда, которые есть в меню.
// Порядок здесь не важен: перед выводом на страницу блюда сортируются по названию.
// kind - тип блюда, по нему работают фильтры (совпадает с data-kind у кнопок).
const dishes = [
    {
        keyword: 'tom_yum',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        count: '500 г',
        image: 'soups/tomyum',
        kind: 'fish'
    },
    {
        keyword: 'gazpacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350 г',
        image: 'soups/gazpacho',
        kind: 'veg'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        count: '425 г',
        image: 'soups/ramen',
        kind: 'meat'
    },
    {
        keyword: 'mushroom_soup',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '330 г',
        image: 'soups/mushroom_soup',
        kind: 'veg'
    },
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        count: '350 г',
        image: 'soups/chicken',
        kind: 'meat'
    },
    {
        keyword: 'norwegian_soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '330 г',
        image: 'soups/norwegian_soup',
        kind: 'fish'
    },
    {
        keyword: 'pizza_margherita',
        name: 'Пицца Маргарита',
        price: 450,
        category: 'main-course',
        count: '470 г',
        image: 'main_course/pizza',
        kind: 'veg'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main-course',
        count: '310 г',
        image: 'main_course/lasagna',
        kind: 'meat'
    },
    {
        keyword: 'fish_cutlet_rice',
        name: 'Рыбная котлета с рисом и спаржей',
        price: 320,
        category: 'main-course',
        count: '270 г',
        image: 'main_course/fishrice',
        kind: 'fish'
    },
    {
        keyword: 'fried_potatoes',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main-course',
        count: '250 г',
        image: 'main_course/friedpotatoeswithmushrooms1',
        kind: 'veg'
    },
    {
        keyword: 'shrimp_pasta',
        name: 'Паста с креветками',
        price: 340,
        category: 'main-course',
        count: '280 г',
        image: 'main_course/shrimppasta',
        kind: 'fish'
    },
    {
        keyword: 'chicken_cutlets',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main-course',
        count: '280 г',
        image: 'main_course/chickencutletsandmashedpotatoes',
        kind: 'meat'
    },
    {
        keyword: 'caesar',
        name: 'Цезарь с цыпленком',
        price: 370,
        category: 'salad',
        count: '220 г',
        image: 'salads_starters/caesar',
        kind: 'meat'
    },
    {
        keyword: 'korean_salad',
        name: 'Корейский салат с овощами и яйцом',
        price: 330,
        category: 'salad',
        count: '250 г',
        image: 'salads_starters/saladwithegg',
        kind: 'veg'
    },
    {
        keyword: 'tuna_salad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad',
        count: '250 г',
        image: 'salads_starters/tunasalad',
        kind: 'fish'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad',
        count: '235 г',
        image: 'salads_starters/caprese',
        kind: 'veg'
    },
    {
        keyword: 'fries_caesar',
        name: 'Картофель фри с соусом Цезарь',
        price: 280,
        category: 'salad',
        count: '235 г',
        image: 'salads_starters/frenchfries1',
        kind: 'veg'
    },
    {
        keyword: 'fries_ketchup',
        name: 'Картофель фри с кетчупом',
        price: 260,
        category: 'salad',
        count: '235 г',
        image: 'salads_starters/frenchfries2',
        kind: 'veg'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/cappuccino',
        kind: 'hot'
    },
    {
        keyword: 'orange_juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/orangejuice',
        kind: 'cold'
    },
    {
        keyword: 'green_tea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/greentea',
        kind: 'hot'
    },
    {
        keyword: 'carrot_juice',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/carrotjuice',
        kind: 'cold'
    },
    {
        keyword: 'black_tea',
        name: 'Черный чай',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/tea',
        kind: 'hot'
    },
    {
        keyword: 'apple_juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'beverages/applejuice',
        kind: 'cold'
    },
    {
        keyword: 'donuts_6',
        name: 'Пончики (6 штук)',
        price: 650,
        category: 'dessert',
        count: '700 г',
        image: 'desserts/donuts',
        kind: 'large'
    },
    {
        keyword: 'baklava',
        name: 'Пахлава',
        price: 220,
        category: 'dessert',
        count: '300 г',
        image: 'desserts/baklava',
        kind: 'medium'
    },
    {
        keyword: 'chocolate_cheesecake',
        name: 'Шоколадный чизкейк',
        price: 260,
        category: 'dessert',
        count: '125 г',
        image: 'desserts/chocolatecheesecake',
        kind: 'small'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 240,
        category: 'dessert',
        count: '125 г',
        image: 'desserts/checheesecake',
        kind: 'small'
    },
    {
        keyword: 'donuts_3',
        name: 'Пончики (3 штуки)',
        price: 410,
        category: 'dessert',
        count: '350 г',
        image: 'desserts/donuts2',
        kind: 'medium'
    },
    {
        keyword: 'chocolate_cake',
        name: 'Шоколадный торт',
        price: 270,
        category: 'dessert',
        count: '140 г',
        image: 'desserts/chocolatecake',
        kind: 'small'
    }
];
