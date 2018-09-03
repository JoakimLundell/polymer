import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppCookiesButtons extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {

            }
            a {
                color: white;
                text-decoration: none;
                padding-left: 10px;
            }
            a:hover {
                color: var(--accent-color);
            }
        </style>
        <a href="#" on-click="accept">Yes, please</a>
        <a href="#" on-click="deny">No</a>
        `
    }

    static get properties() {
        return {}
    }

    deny(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('cookie-deny', { bubbles: true, composed: true}));
    }

    accept(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('cookie-accept', { bubbles: true, composed: true}));
    }
}

window.customElements.define('app-cookies-buttons', AppCookiesButtons);
