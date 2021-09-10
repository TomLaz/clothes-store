import { BasketI, BasketProductI, CategoryI, FavoritesI, FilterI, ProductI } from '../../models/Global.model';
import GlobalService from '../../services/Global/Global.service';
import { GlobalContextProps, GlobalProviderData } from './Global.provider';

export function getGlobalProviderMockData( defaultGlobalProviderDataProps: GlobalProviderData ): GlobalContextProps {
    const updateJwt = jest.fn();
    const updateRole = jest.fn();
    const updateEmail = jest.fn();
    const updateFavourites = jest.fn();
    const updateBasket = jest.fn();
    const updateFilters = jest.fn();
    const updateFilteredOptions = jest.fn();
    const updateCheckedFilters = jest.fn();
    const updateFilteredProducts = jest.fn();
    const updateActiveMenu = jest.fn();
    const updateActiveMenuItem = jest.fn();
    const noUserLogged = jest.fn();
    const updateLoading = jest.fn();

    const defaultProviderData = defaultGlobalProviderDataProps;

    const data = defaultProviderData;
    return {
        data: data,
        updateJwt,
        updateRole,
        updateEmail,
        updateFavourites,
        updateBasket,
        updateFilters,
        updateFilteredOptions,
        updateCheckedFilters,
        updateFilteredProducts,
        updateActiveMenu,
        updateActiveMenuItem,
        noUserLogged,
        updateLoading
    };
}

export function getDefaultGlobalProviderDataProps(): GlobalProviderData {
    const products: ProductI[] = [
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
            'price': 110,
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
            'title': 'title',
            'userId': 'Gkua5'
        }
    ];

    const categories: CategoryI[] = [
        {
            'id': 1,
            'name': 'Mens'
        },
        {
            'id': 2,
            'name': 'Womens'
        }
    ];

    const basketProducts: BasketProductI[] = [
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

    const basket = {
        'createdAt': {
            'nanoseconds': 215000000,
            'seconds': 1615003734
        },
        'id': '1',
        'products': basketProducts
    };

    const favourites: FavoritesI = {
        'id': '1',
        'products': [ 'g1UBk', 'kBU1g' ]
    };

    const filters: FilterI[] = [
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
        jwt: '',
        role: 'user',
        email: 'email@email.com',
        menuItems: [],
        products: products,
        categories: categories,
        favourites: favourites,
        filters: filters,
        filteredOptions: [] as string[],
        checkedFilters: checkedFilters,
        filteredProducts: [] as ProductI[],
        basket: basket,
        activeMenu: { 'home': true },
        loading: false
    };

    return defaultGlobalProviderDataProps;
}

export function mockGlobalProviderData(): any {
    let getProductsSpy: jest.SpyInstance<Promise<ProductI[]>>,
        getCategoriesSpy: jest.SpyInstance<Promise<CategoryI[]>>,
        getFavoritesSpy: jest.SpyInstance<Promise<FavoritesI | undefined>>,
        getBasketSpy: jest.SpyInstance<Promise<BasketI | undefined>>;

    const spyMocks = (): any => {
        getProductsSpy = jest.spyOn( GlobalService, 'getProducts' );
        getCategoriesSpy = jest.spyOn( GlobalService, 'getCategories' );
        getFavoritesSpy = jest.spyOn( GlobalService, 'getFavorites' );
        getBasketSpy = jest.spyOn( GlobalService, 'getBasket' );
    };

    const globalProviderDataProps = getDefaultGlobalProviderDataProps();

    const resolveMocks = (): any => {
        getProductsSpy.mockReturnValue( Promise.resolve( globalProviderDataProps.products ) );
        getCategoriesSpy.mockReturnValue( Promise.resolve( globalProviderDataProps.categories ) );
        getFavoritesSpy.mockReturnValue( Promise.resolve( globalProviderDataProps.favourites ) );
        getBasketSpy.mockReturnValue( Promise.resolve( globalProviderDataProps.basket ) );
    };

    const mocksClear = (): any => {
        getProductsSpy.mockClear();
        getCategoriesSpy.mockClear();
        getFavoritesSpy.mockClear();
        getBasketSpy.mockClear();
    };

    return {
        globalProviderDataProps,
        spyMocks,
        resolveMocks,
        mocksClear
    };
}
