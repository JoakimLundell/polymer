import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';
import {} from '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

import { } from './../shared-style.js';

export default class AppMenu extends PolymerElement {

    static get template() {
        return html`
        <style include="shared-style">
            :host {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                background: transparent;
                box-sizing: border-box;
            }
            a {
                margin-left: 12px;
            }
            :host [selected] {
                border-bottom: 2px solid var(--darkblue);
            }
            :host [selected]:hover {
                border-bottom: 2px solid var(--blue);
            }

        </style>

        <dom-repeat items="{{navigation}}">
            <template>
                <a href="{{item.href}}"
                    on-click="click"
                    selected$="{{item.active}}"
                    name="{{item.name}}">{{item.name}}</a>
            </template>
        </dom-repeat>
        `
    }

    static get properties() {
        return {
            selected: {
                type: Boolean,
                reflectToAttribute: true
            }
        }
    }

    click(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: event.target.name } }));
    }

}
