import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppPagination extends PolymerElement {

    static get template() {
        return html`

        <style>
            :host {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: var(--padding) 0;
            }

            :host [disabled]{
                pointer-events: none;
                cursor: default;
                text-decoration: none;
                color: silver;
            }
            :host [active]{
                border-color: #4a4a4a;
            }

            a {
                text-decoration: none;
                display: inline-block;
                border: 1px solid silver;
                padding: 0px 10px;
                font-size: 13px;
                line-height: 25px;
            }
            a:hover {
                border-color: #4a4a4a;
            }

        </style>

        <a href="#"
           on-click="_changePage"
           data="[[links.back.value]]"
           disabled$="[[!links.back.active]]">
           [[links.back.name]]</a>

        <div>
        <dom-repeat items="[[links.pageCount]]">
            <template>
                <a on-click="_changePage" data="[[index]]" active$="[[item]]"> [[ _getPageFromIndex(index) ]] </a>
            </template>
        </dom-repeat>
        </div>

        <a href="#"
           on-click="_changePage"
           data="[[links.next.value]]"
           disabled$="[[!links.next.active]]">
           [[links.next.name]]</a>

        `
    }

    _getPageFromIndex(index) {
        return index + 1;
    }

    /*_getIsActive(index) {
        console.log(this.links.currentPage);
        console.log(index);
        let b = (this.links.currentPage === index);
        return b;
    }*/

    _changePage(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('paginate', { bubbles: true, composed: true, detail: { target: event.target.data } }));
    }

    static get properties() {
        return {
            links: {
                type: Array,
                value: ()=>{
                    return []
                }
            },
            disabled: {
                type: Boolean,
                reflectToAttribute: true
            },
            active: {
                type: Boolean,
                reflectToAttribute: true
            }
        }
    }

}

window.customElements.define('app-pagination', AppPagination);
