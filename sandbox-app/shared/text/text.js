import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppText extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                justify-content: space-between;
                margin-bottom: var(--padding);
            }
            :host([paragraph]) {
                font-size: 1.0rem;
            }
            :host([title]) {
                font-size: 2.6rem;
                font-weight: bold;
                text-transform: uppercase;
                color: var(--accent-color);
            }
            :host([header]) {
                font-size: 2.6rem;
                font-weight: bold;
                color: #c1c1c1;
            }
            :host([subtitle]) {
                font-size: 2.4rem;
                font-weight: bold;
                height: var(--baseline);
            }
            :host([title]) app-icon {
                fill: var(--accent-color);
                height: calc(2 * var(--baseline));
                width: calc(2 * var(--baseline));
            }
        </style>
        <slot></slot>
        <dom-if if="[[icon]]">
            <template>
                <app-icon name="[[icon]]"></app-icon>
            </template>
        </dom-if>
        `
    }

    static get properties() {
        return {
            icon: {
                type: String
            }
        }
    }
}

window.customElements.define('app-text', AppText)
