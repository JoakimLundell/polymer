import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';
import {} from '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

export default class AppShowPerPage extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host select {
                padding: 7px;
            }
        </style>

        <select on-change="_setShowPerPage">
            <dom-repeat items="[[values]]">
                <template is="dom-repeat" items="[[values]]">
                    <option value="[[item]]" selected$="{{ _selected(item) }}">[[item]]</option>
                </template>
            </dom-repeat>
        </select>

        `
    }
    _setShowPerPage( event ) {
        this.dispatchEvent(new CustomEvent('showperpage', { bubbles: true, composed: true, detail: { target: event.target.value } }));
    }

    _selected(item) {
        return (item == parseInt(this.get('active')))
    }

    static get properties() {
        return {
            values: {
                type: Array,
                value: ()=>{
                    return []
                }
            },
            active: {
                type: String,
            }
        }
    }

}
