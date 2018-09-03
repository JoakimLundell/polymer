import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';
import {DomIf} from '../../../node_modules/@polymer/polymer/lib/elements/dom-if.js';

export default class AppModal extends PolymerElement {

    static get template() {
        return html`
        <style>
            .modal {
                display: flex;
                align-items: center;
                justify-content: center;

                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0); /* Fallback color */
                background-color: rgba(0,0,0,0.6); /* Black w/ opacity */


            }

            .modal-content {
                z-index: 2; /* Sit on top */
                position: relative;
                background-color: #fefefe;
                padding: 20px;
                border: 1px solid #888;
                width: 300px; /* Could be more or less, depending on screen size */
                border-radius: 10px;
                margin-bottom:100px;
            }

            .close {
                position: absolute;
                right: 14px;
                top: 0px;
                color: #aaaaaa;
                font-size: 32px;
                font-weight: bold;
            }

            .close:hover,
            .close:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }
        </style>
        <dom-if if="[[open]]">
            <template>
                <div class="modal">
                    <div class="modal-content">
                        <span class="close" on-click="close">&times;</span>
                        <slot></slot>
                    </div>
                </div>
            </template>
        </dom-if>
        `
    }

    static get properties() {
        return {
            selected: {
                type: Boolean,
                reflectToAttribute: true
            },
        }
    }

    close() {
        this.dispatchEvent(new CustomEvent('close-modal', { bubbles: true, composed: true }));
    }

}

window.customElements.define('app-modal', AppModal);
