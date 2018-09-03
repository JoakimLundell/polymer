import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

import AppHello from './shared/hello/hello.js';
import AppHeader from './shared/header/header.js';
import AppMenu from './shared/menu/menu.js';
import AppReferenceList from './shared/referencelist/referencelist.js';
import AppContent from './shared/content/content.js';
import AppSearchBar from './shared/searchbar/searchbar.js';
import AppShowPerPage from './shared/showperpage/showperpage.js';
import AppFooter from './shared/footer/footer.js';
import AppAutocomplete from './shared/autocomplete/autocomplete.js';
import AppPagination from './shared/pagination/pagination.js';
import AppModal from './shared/modal/modal.js';
import AppCookies from './shared/cookies/cookies.js';
import AppCookiesButtons from './shared/cookies/cookies-buttons.js'
import AppText from './shared/text/text.js'
import AppLogo from './shared/logo/logo.js'

import AppAdd from './pages/add.js';
import AppOpen from './pages/open/open.js';

export default class SandboxApp extends PolymerElement {

    constructor() {
        super();
        // ----------------
        // Event listeners
        // ----------------
        this.addEventListener('navigate', this.navigateHandler)
        this.addEventListener('add', this.addHandler)
        this.addEventListener('paginate', this.paginateHandler)
        this.addEventListener('showperpage', this.showPerPageHandler)
        this.addEventListener('open', this.openHandler)
        this.addEventListener('close-modal', this.closeModalHandler)
        this.addEventListener('confirm', this.confirmDeleteHandler)
        this.addEventListener('cookie-deny', this.cookieDenyHandler)
        this.addEventListener('cookie-accept', this.cookieAcceptHandler)
        // ------------------
        // Initialize events
        // ------------------
        this.dispatchEvent(new CustomEvent('navigate', { detail: { target: window.location.pathname == '/' ? 'home' : window.location.pathname } }));

    }
    ready() {
        super.ready()
        //console.log("ready");
        this._checkCookies();
    }

    static get template() {
        return html`
        <style>
            :host {
                min-height: 100%;
                font-size: 1rem;
                background: var(--color);
                display: grid;
                grid-template-areas: "header" "content" "footer";
                grid-template-columns: auto;
                grid-template-rows: auto 1fr auto;
            }
        </style>

        <app-header>
            <!--div> EVRY | Interactive Basic</div-->
            <app-logo></app-logo>
            <app-menu navigation="[[state.navigation]]"></app-menu>
        </app-header>

        <app-content current-route=[[state.currentRoute]]>
        <app-cookies open="[[state.cookie.show]]">
            <div>Cookies</div>
            <div>Oh yes! We use cookies to help you navigate on this page. Please approve</div>
            <app-cookies-buttons></app-cookies-buttons>
        </app-cookies>
            <!--div style="border: 1px solid red;">TEST:
            [[state.activeReference]] - [[state.pagination.view]]

            sidor = [[state.pagination.pageCount]]</div-->

            <app-start route="home">
                <app-text header>References</app-text>
                <app-text paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nisl at est viverra laoreet et a lorem. Donec
                            consectetur ante fringilla. Eos delectus, aperiam facere sint magni animi odio non totam esse? Molestias
                            explicabo reprehenderit dolor ex laboriosam omnis dolorum officia ipsa minus aliquam.
                        </app-text>
                <app-searchbar>
                    <app-autocomplete data="[[state.components]]"></app-autocomplete>
                    <app-show-per-page values="[[state.pagination.showPerPage]]" active="[[state.pagination.size]]"></app-show-per-page>
                </app-searchbar>

                <app-referencelist references="[[state.pagination.data]]">Menu</app-referencelist>
                <app-pagination links="[[state.pagination]]"></app-pagination>
            </app-start>

            <app-about route="about">
                <h1>This the about page</h1>
            </app-about>

            <app-add route="add">
                <h1>Add new Interactive Basic Reference</h1>
            </app-add>

            <app-open route="open" reference="[[state.activeReference]]">
                <h1>Edit Interactive Basic Reference</h1>
            </app-open>




        </app-content>

        <app-footer>© Copyright 2018 EVRY – All Rights Reserved

            <a href="#" on-click="_deleteCookie">Radera Cookie</a>
        </app-footer>

        <app-modal open="[[state.modal]]">
            <h2>Please confirm</h2>
            <p> Are you sure you want to delete reference?</p>
            <button>Delete</button>
            <button on-click="close">Cancel</button>
        </app-modal>

        <!--app-hello>
        </app-hello-->
        `
    }



    // ----------------------
    // Methods and functions
    // ----------------------
    navigateHandler(detail) {
        this.state.routes.map((route) => {
            if (this._trimLeadingSlash(route.name) == this._trimLeadingSlash(detail.detail.target)) {
                if (!route.protected || authentication.status(detail.detail.target)) {
                    window.history.pushState({}, null, detail.detail.target);

                    this.state.routes.map((nav, index) => {
                        this.set(`state.navigation.${index}.active`, false)
                        if (this._trimLeadingSlash(nav.name) == this._trimLeadingSlash(detail.detail.target)) {
                            this.set(`state.navigation.${index}.active`, true)
                            this.set('state.currentRoute', nav.name)
                        }
                    })
                } else {
                    this.dispatchEvent(new CustomEvent('navigate', { detail: { target: 'login' } }));
                }
            }
        })
    }

    _trimLeadingSlash(path) {
        if (path[0] == '/') {
            return path.substring(1)
        } else {
            return path
        }
    }

    confirmDeleteHandler(reference) {
        //console.log("open modal");
        this.set('state.modal', true);
    }

    closeModalHandler(reference) {
        //console.log("close modal");
        this.set('state.modal', false);
    }

    openHandler(reference) {
        //console.log(reference.detail.target);
        this.set('state.activeReference', reference.detail.target);
        this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: 'open' } }));
    }

    addHandler(detail) {
        //console.dir(detail);
        //alert(detail.detail.reference);

        this.push('state.components', {
            'id': '100',
            'customer_number': '12345678',
            'reference': detail.detail.reference,
            'active': 1,
            'filename': '1.jpg',
            'original_filename': 'background.jpg',
            'width': '1920',
            'height': '1080',
            'created_at': '20180312 15:17:24',
            'updated_at': '2018-04-06 08:27:46'});
        //let a = this.pop(this.components);

        //this.set('state.currentRoute','home');
        this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: 'home' } }));
    }

    paginateHandler(page) {
        this.set(`state.pagination.pageCount.${this.get('state.pagination.currentPage')}`, false);
        this.set('state.pagination.currentPage', page.detail.target);

        this.set(`state.pagination.pageCount.${page.detail.target}`, true);
        this._updatePaginationBack();
        this._updatePaginationNext();
    }

    showPerPageHandler(showperpage) {
        if(this._acceptCookie) {
            this._setCookie("show",showperpage.detail.target);
        }
        this.set('state.pagination.size', showperpage.detail.target)
    }

    cookieDenyHandler() {
        this.set('state.cookie.accept', false);
        this.set('state.cookie.show', false);
    }

    cookieAcceptHandler() {
        this._setCookie("accept","true");
        this.set('state.cookie.accept', true);
        this.set('state.cookie.show', false);
    }

    _updatePaginationBack() {
        this.set('state.pagination.back.active',(this.get('state.pagination.currentPage') <= 0) ? false : true );
        this.set('state.pagination.back.value', this.get('state.pagination.currentPage') - 1)
    }

    _updatePaginationNext() {
        this.set('state.pagination.next.active', (this.get('state.pagination.currentPage') >= this.get('state.pagination.pageCount.length') -1) ? false : true);
        this.set('state.pagination.next.value', this.get('state.pagination.currentPage') + 1)
    }

    _paginatedData() {
        let start = this.state.pagination.currentPage * this.state.pagination.size;
        let end = parseInt(start) + this.state.pagination.size;
        this.set('state.pagination.data', this.state.components.slice(start,end))
    }
    _resetStartpage() {
        this.set('state.pagination.currentPage', 0);
        this._updatePaginationBack();
        this._updatePaginationNext();
    }

    _pageCount() {
        let length = this.state.components.length;
        let show = this.state.pagination.size;
        let pages = new Array(Math.ceil(length/show));
        pages[0] = true;
        this.set('state.pagination.pageCount', pages);
        this._resetStartpage();
    }

    _checkCookies() {
        //console.log("checking cookies");
        if (document.cookie.split(';').filter((item) => item.includes('accept=')).length) {
            //console.log('The cookie "accept" exists');
            this._getShowPerPageCookie();
        } else {
            this.set('state.cookie.show', true);
        }
    }
    _acceptCookie() {
        return (document.cookie.split(';').filter((item) => item.includes('accept=')).length)
    }

    _setCookie(name, value) {
        //console.log("setting cookie");
        document.cookie = name + "=" + value + "; expires=Thu, 1 Dec 2020 12:00:00 UTC; path=/";
    }

    _deleteCookie() {
        document.cookie = "accept=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    _getShowPerPageCookie() {
        if (document.cookie.split(';').filter((item) => item.includes('show=')).length) {
            var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)show\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            this.set('state.pagination.size', cookieValue)
        }
    }



    // ---------------
    // App properties
    // ---------------
    static get properties() {
        return {
            state: {
                type: Object,
                value: {
                    navigation: [{
                        href: '/',
                        name: 'home',
                        active: true
                    }, {
                        href: 'about',
                        name: 'about',
                        active: false
                    }, {
                        href: 'add',
                        name: 'add',
                        active: false
                    }],
                    user: {
                        firstname: 'Joakim',
                        lastname: 'Lundell'
                    },
                    title: 'This is the title',
                    components: [{'id': '57', 'customer_number': '12345678', 'reference': 'theLundells', 'active': 1, 'filename': '12345678/2018/03/12/730ac11b-f2f3-4eef-a78d-9c2ae8b8b138.jpg', 'original_filename': 'background.jpg', 'width': 1920, 'height': 1080, 'created_at': '2018-03-12 15:17:24', 'updated_at': '2018-04-06 08:27:46'}, {'id': 58, 'customer_number': '12345678', 'reference': 'Tomat', 'active': 0, 'filename': '12345678/2018/03/12/875b3613-024d-47fd-847b-6afb96ae736d.jpg', 'original_filename': 'background.jpg', 'width': 1920, 'height': 1080, 'created_at': '2018-03-12 15:18:13', 'updated_at': '2018-03-12 15:18:13'}, {'id': 59, 'customer_number': '12345678', 'reference': 'Tomat', 'active': 0, 'filename': '12345678/2018/03/13/48604dd9-a566-4ec3-b23d-2cfa59733387.jpg', 'original_filename': 'background.jpg', 'width': 1920, 'height': 1080, 'created_at': '2018-03-12 15:18:35', 'updated_at': '2018-03-13 09:55:56'}, {'id': 60, 'customer_number': '12345678', 'reference': 'Tomat', 'active': 0, 'filename': '12345678/2018/03/12/32f5db4e-48e2-46b6-a664-913856db2eb8.jpg', 'original_filename': 'dog.jpg', 'width': 195, 'height': 259, 'created_at': '2018-03-12 15:19:14', 'updated_at': '2018-04-06 08:11:02'}, {'id': 61, 'customer_number': '12345678', 'reference': 'Tomat', 'active': 0, 'filename': '12345678/2018/03/12/8a7a5503-83d0-4682-aa86-bff8fcab6d42.jpg', 'original_filename': '88-smedekul-loes.jpg', 'width': 720, 'height': 480, 'created_at': '2018-03-12 15:19:34', 'updated_at': '2018-03-12 15:19:34'}, {'id': 62, 'customer_number': '85850914', 'reference': 'B\u00e4sta Jocke2', 'active': 0, 'filename': '85850914/2018/03/12/9c08f20a-faa4-4969-8fdf-f72135ba3d32.jpeg', 'original_filename': 'frisyr.jpeg', 'width': 195, 'height': 259, 'created_at': '2018-03-12 15:54:50', 'updated_at': '2018-04-06 08:34:51'}, {'id': 63, 'customer_number': '85850914', 'reference': 'En l\u00e5ng referens, verkligen l\u00e5\u00e5ng', 'active': 1, 'filename': '85850914/e6cc6192-09c5-4399-bb88-0b77fc32edd6.jpeg', 'original_filename': 'frisyr.jpeg', 'width': 195, 'height': 259, 'created_at': '2018-03-12 20:28:40', 'updated_at': '2018-04-19 12:34:54'}, {'id': 74, 'customer_number': '66666666', 'reference': 'Jocke', 'active': 0, 'filename': '66666666/2018/03/29/6462972d-74da-4c32-a4cb-d27a76e06145.jpeg', 'original_filename': 'frisyr.jpeg', 'width': 195, 'height': 259, 'created_at': '2018-03-29 12: 07:10', 'updated_at': '2018-03-29 12:30:50'}, {'id': 75, 'customer_number': '99999999', 'reference': '9', 'active': 0, 'filename': '99999999/2018/03/29/59a736bb-a958-4256-a166-66a2abdd0568.pdf', 'original_filename': 'pdf-sample-2.pdf', 'width': 0, 'height': 0, 'created_at': '2018-03-29 12:08:33', 'updated_at': '2018-03-29 12:30:18'}, {'id': 76, 'customer_number': '12312300', 'reference': '1', 'active': 0, 'filename': '12312300/2018/03/29/29cdfece-7fd7-4dbf-b3fe-898434eb4615.jpeg', 'original_filename': 'frisyr2.jpeg', 'width': 195, 'height': 259, 'created_at': '2018-03-29 12:33:43', 'updated_at': '2018-03-29 12: 34:05'}, {'id': 77, 'customer_number': '10101010', 'reference': '2', 'active': 1, 'filename': '10101010/2018/03/29/3b678597-caa3-4bc5-be69-328234532ea1.pdf', 'original_filename': 'pdf-sample-2.pdf', 'width': 0, 'height': 0, 'created_at': '2018-03-29 12:35:32', 'updated_at': '2018-04-23 13:50:33'}],
                    perpage: [{'value':'10'},{'value':'20'},{'value':'50'}],
                    currentRoute: String,
                    routes: [{
                        href: 'home',
                        name: 'home',
                        protected: false
                    }, {
                        href: 'about',
                        name: 'about',
                        protected: false
                    }, {
                        href: 'open',
                        name: 'open',
                        protected: false
                    }, {
                        href: 'add',
                        name: 'add',
                        protected: false
                    }],
                    pagination: {
                        currentPage: 0,
                        back: {
                            name: 'Previous',
                            value: 0,
                            active: false,
                        },
                        next: {
                            name: 'Next',
                            value: 1,
                            active: true,
                        },
                        showPerPage: [5,10,20],
                        size: 5,
                        pageCount: 0,
                        data: {
                            type: Array,
                            observer: '_paginatedData()'
                        },

                    },
                    activeReference: [],
                    modal: false,
                    cookie: {
                        accept: {
                            type: Boolean,
                        },
                        show: false,
                    },
                }
            }
        }
    }

    static get observers() {
        return [
            '_paginatedData(state.pagination.currentPage)',
            '_paginatedData(state.pagination.pageCount)',
            '_pageCount(state.pagination.size)'
        ]
    }
}

window.customElements.define('sandbox-app', SandboxApp);
window.customElements.define('app-hello', AppHello);
window.customElements.define('app-header', AppHeader);
window.customElements.define('app-menu', AppMenu);
window.customElements.define('app-referencelist', AppReferenceList);
window.customElements.define('app-content', AppContent);
window.customElements.define('app-searchbar', AppSearchBar);
window.customElements.define('app-show-per-page', AppShowPerPage);
window.customElements.define('app-footer', AppFooter);
window.customElements.define('app-autocomplete', AppAutocomplete);

window.customElements.define('app-add', AppAdd);
