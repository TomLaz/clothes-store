import GlobalService from '../../../services/Global/Global.service';
import i18n from 'i18next';

const menuItems = [
    {
        url: GlobalService.states.mens,
        title: i18n.t( 'global.categories.mens' )
    },
    {
        url: GlobalService.states.womens,
        title: i18n.t( 'global.categories.women' )
    },
    {
        url: GlobalService.states.summer,
        title: i18n.t( 'global.categories.summer' )
    },
    {
        url: GlobalService.states.outlet,
        title: i18n.t( 'global.categories.outlet' )
    }
];

export default menuItems;
