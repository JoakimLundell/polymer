import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppHello extends PolymerElement {
    static get template() {
        return html`
        <style>
            b {
                color: var(--accent-color);
            }
        </style>
        <h1>I am a <b>Polymer</b> component</h1>`
    }
}