import { BasketProducts, Category, Favourite, Filter, Product, SubCategory } from './Global.model';
import { defaultGlobalProviderData, GlobalContextProps, GlobalProviderData } from './Global.provider';

export function getGlobalProviderMockData( defaultGlobalProviderDataProps?: GlobalProviderData ): GlobalContextProps {
    const updateMenuItems = jest.fn();
    const updateCurrentUser = jest.fn();
    const updateProducts = jest.fn();
    const updateCategories = jest.fn();
    const updateSubCategories = jest.fn();
    const updateFavourites = jest.fn();
    const updateFavouritesCollection = jest.fn();
    const updateBasketProducts = jest.fn();
    const updateBasketProductsCollection = jest.fn();
    const signup = jest.fn();
    const login = jest.fn();
    const logout = jest.fn();
    const resetPassword = jest.fn();
    const updateEmail = jest.fn();
    const updatePassword = jest.fn();
    const updateFilters = jest.fn();
    const updateFilteredOptions = jest.fn();
    const updateCheckedFilters = jest.fn();
    const updateFilteredProducts = jest.fn();
    const updateActiveMenu = jest.fn();
    const updateActiveMenuItem = jest.fn();
    const updateLoading = jest.fn();

    const defaultProviderData = defaultGlobalProviderDataProps || defaultGlobalProviderData;

    const data = defaultProviderData;
    return {
        data: data,
        updateMenuItems,
        updateCurrentUser,
        updateProducts,
        updateCategories,
        updateSubCategories,
        updateFavourites,
        updateFavouritesCollection,
        updateBasketProducts,
        updateBasketProductsCollection,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateFilters,
        updateFilteredOptions,
        updateCheckedFilters,
        updateFilteredProducts,
        updateActiveMenu,
        updateActiveMenuItem,
        updateLoading
    };
}

export function getDefaultGlobalProviderDataProps(): GlobalProviderData {
    const products: Product[] = [
        {
            'categoryId': 1,
            'color': 'color',
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'description': 'description',
            'id': 'g1UBk',
            // eslint-disable-next-line max-len
            'imgUrl': 'https://firebasestorage.googleapis.com/v0/b/clothes-store-cc681.appspot.com/o/shiny-white-nght_1_thumbnail.jpg?alt=media&token=12ff1a18-1fa4-4155-b8b3-66a10a799d9c',
            'price': 100,
            'sizes': [
                {
                    'size': 'S',
                    'stock': 10
                },
                {
                    'size': 'M',
                    'stock': 8
                },
                {
                    'size': 'L',
                    'stock': 6
                }
            ],
            'subcategoryId': 6,
            'title': 'title',
            'userId': 'Gkua5'
        }
    ];

    const categories: Category[] = [
        {
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 2,
            'name': 'Womens'
        },
        {
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 1,
            'name': 'Mens'
        }
    ];

    const subCategories: SubCategory[] = [
        {
            'categoryId': 2,
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 7,
            'name': 'Name'
        }
    ];

    const currentUser: any = {
        uid: 'p0Oacugr3lahoX57pDwN2PalHLW2'
    };

    const basketProducts: BasketProducts[] = [
        {
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 'p0Oacugr3lahoX57pDwN2PalHLW2',
            'products': [
                {
                    'id': '1615858712400',
                    'productId': 'g1UBk',
                    'quantity': '2',
                    'size': 'S'
                },
                {
                    'id': '1615858721981',
                    'productId': 'BKqnKh51SiP6shxE6ELB',
                    'quantity': '1',
                    'size': 'XL'
                }
            ]
        }
    ];

    const favourites: Favourite[] = [
        {
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 'p0Oacugr3lahoX57pDwN2PalHLW2',
            'products': [ 'g1UBk', 'BKqnKh51SiP6shxE6ELB' ]
        }
    ];

    const filters: Filter[] = [
        {
            'name': 'Mens',
            'products': [ 'g1UBk' ]
        },
        {
            'name': 'Womens',
            'products': [ 'g1UBk' ]
        }
    ];

    const checkedFilters = {};

    const defaultGlobalProviderDataProps: GlobalProviderData = {
        menuItems: [],
        currentUser: currentUser,
        products: products,
        categories: categories,
        subCategories: subCategories,
        favourites: favourites,
        filters: filters,
        filteredOptions: [],
        checkedFilters: checkedFilters,
        filteredProducts: [] as Product[],
        basketProducts: basketProducts,
        activeMenu: { 'home': true },
        loading: false
    };

    return defaultGlobalProviderDataProps;
}
