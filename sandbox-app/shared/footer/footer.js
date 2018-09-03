import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppFooter extends PolymerElement {

    constructor() {
        super()
    }

    static get template() {
        return html`
        <style>
            :host {
                grid-area: footer;
                background: var(--grey);
                padding: 5px var(--padding);
                box-shadow: 0 -1px 2px 0 #A8A8A8;
                font-size: 0.8em;
            }
            .container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                max-width: var(--largest-width);
                margin: 0 auto;
            }
        </style>
        <section class="container">
            <slot></slot>
        </section>
        `
    }

    static get properties() {
        return {}
    }
}
