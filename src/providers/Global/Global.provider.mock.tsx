import { Category, Filter, Product, ProductProperties, SubCategory } from './Global.model';
import { GlobalContextProps, GlobalProviderData } from './Global.provider';

export function getGlobalProviderMockData( defaultGlobalProviderDataProps: GlobalProviderData ): GlobalContextProps {
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

    const defaultProviderData = defaultGlobalProviderDataProps;

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
            'imgUrl': 'https://dummyimage.com/640x360/fff/aaa',
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
            'subcategoryId': 1,
            'title': 'title',
            'userId': 'Gkua5'
        },
        {
            'categoryId': 2,
            'color': 'color',
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'description': 'description',
            'id': 'kBU1g',
            'imgUrl': 'https://dummyimage.com/640x360/fff/aaa',
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
            'subcategoryId': 2,
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
            'id': 1,
            'name': 'Mens'
        },
        {
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 2,
            'name': 'Womens'
        }
    ];

    const subCategories: SubCategory[] = [
        {
            'categoryId': 1,
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 1,
            'name': 'Name'
        },
        {
            'categoryId': 2,
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 2,
            'name': 'Name'
        }
    ];

    const currentUser: any = {
        uid: 'p0Oacugr3lahoX57pDwN2PalHLW2'
    };

    const basketProducts: ProductProperties[] = [
        {
            'id': '1615858712400',
            'productId': 'g1UBk',
            'quantity': '2',
            'size': 'S'
        },
        {
            'id': '1615858721981',
            'productId': 'kBU1g',
            'quantity': '1',
            'size': 'XL'
        }
    ];

    const favourites: string[] = [ 'g1UBk', 'kBU1g' ];

    const filters: Filter[] = [
        {
            'name': 'Mens',
            'products': [ 'g1UBk' ]
        },
        {
            'name': 'Womens',
            'products': [ 'kBU1g' ]
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
        filteredOptions: [] as string[],
        checkedFilters: checkedFilters,
        filteredProducts: [] as Product[],
        basketProducts: basketProducts,
        activeMenu: { 'home': true },
        loading: false
    };

    return defaultGlobalProviderDataProps;
}
