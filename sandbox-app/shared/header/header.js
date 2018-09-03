import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppHeader extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                grid-area: header;
                background: var(--grey);
                padding: var(--padding);
                box-sizing: border-box;
                z-index: 2;
                box-shadow: 0 2px 2px 0 #A8A8A8;
                margin-bottom: 4px;
            }

            .container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                max-width: var(--largest-width);
            }
        </style>
        <section class="container">
            <slot></slot>
        </section>

        `
    }
}
