import GlobalService from '../../../services/Global/Global.service';
import i18n from 'i18next';

const menuItems = [
    {
        url: GlobalService.states.mens,
        title: i18n.t( 'items.mens' )
    },
    {
        url: GlobalService.states.womens,
        title: i18n.t( 'items.womens' )
    },
    {
        url: GlobalService.states.summer,
        title: i18n.t( 'items.summer' )
    },
    {
        url: GlobalService.states.outlet,
        title: i18n.t( 'items.outlet' )
    }
];

export default menuItems;
