import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppSearchBar extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: var(--padding) 0;
            }
        </style>

        <slot></slot>

        `
    }
}
