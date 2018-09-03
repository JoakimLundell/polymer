import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppContent extends PolymerElement {

    static get template() {
        return html`
            <style>
                :host {
                    grid-area: content;
                    background: white;
                }

                .container {
                    max-width: var(--largest-width);
                    margin: 0 auto;
                    padding: 25px;
                }
            </style>
            <section class="container">
                <slot></slot>
            </section>
        `
    }

    static get observers() {
        return [
            'select(currentRoute)'
        ]
    }

    select(currentRoute){
        Array.from(this.querySelectorAll('[route]')).map((selected)=>{
            selected.style.display = 'none'
        })
        Array.from(this.querySelectorAll(`[route~=${currentRoute}]`)).map((selected)=>{
            selected.style.display = 'grid'
        })
    }
}
