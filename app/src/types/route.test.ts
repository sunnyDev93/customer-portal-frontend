import {RouteInfo, SiteMap} from './route';

describe('RouteInfo and SiteMap', () => {
    const routeInfo: RouteInfo = {
        key: 'home',
        label: 'Home',
        path: '/',
        element: 'Home Component'
    };

    const siteMap: SiteMap = {
        home: routeInfo
    };

    it('should have a valid RouteInfo object', () => {
        expect(routeInfo).toBeDefined();
        expect(routeInfo.key).toBe('home');
        expect(routeInfo.label).toBe('Home');
        expect(routeInfo.path).toBe('/');
        expect(routeInfo.element).toBe('Home Component');
    });

    it('should have a valid SiteMap object', () => {
        expect(siteMap).toBeDefined();
        expect(siteMap.home).toBe(routeInfo);
    });
});
