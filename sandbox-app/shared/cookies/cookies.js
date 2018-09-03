import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';
import {DomIf} from '../../../node_modules/@polymer/polymer/lib/elements/dom-if.js';

export default class AppCookies extends PolymerElement {

    static get template() {
        return html`
        <style>
            .cookie {
                display: block;
                background: var(--accent-color);
                padding: var(--padding);
                box-sizing: border-box;
                box-shadow: 0 2px 2px 0 #A8A8A8;
                color: white;
                position: absolute;
                left: 0;
                right: 0;
                top: 75px;
                z-index: 1;

                animation-name: slideDown;
            	-webkit-animation-name: slideDown;
            	animation-duration: 1s;
            	-webkit-animation-duration: 1s;
            	animation-timing-function: ease;
            	-webkit-animation-timing-function: ease;

            }

            .container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                max-width: var(--largest-width);
            }

            @keyframes slideDown {
            	0% {
            		transform: translateY(-100%);
            	}
            	50%{
            		transform: translateY(8%);
            	}
            	65%{
            		transform: translateY(-4%);
            	}
            	80%{
            		transform: translateY(4%);
            	}
            	95%{
            		transform: translateY(-2%);
            	}
            	100% {
            		transform: translateY(0%);

            	}
            }
            @keyframes slideUp{
              from {
                transform: translateY(0);
              }
              to {
                transform: translateY(-100%);
              }
            }

        </style>
        <dom-if if="[[open]]">
            <template>
                <div class="cookie">
                <section class="container">
                    <slot></slot>
                </section>
                <div>
            </template>
        </dom-if>

        `
    }

    static get properties() {
        return {}
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('app-cookies', AppCookies);
