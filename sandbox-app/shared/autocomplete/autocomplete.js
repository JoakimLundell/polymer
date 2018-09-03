import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';
//import {} from '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import {DomIf} from '../../../node_modules/@polymer/polymer/lib/elements/dom-if.js';

export default class AppAutocomplete extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host select {
                padding: 5px;
            }

            input {
                font-size: 15px;
                line-height: 25px;
                padding: 3px 10px;
                border: 1px solid grey;
            }

            .autocomplete {
                position: relative;
                width: 250px;
            }

            .autocomplete-results {
                position: absolute;
                padding: 0;
                margin: 0;
                border: 1px solid #eeeeee;
                max-height: 150px;
                overflow: auto;
                width: 267px;
                background-color: white;
                box-shadow: 3px 3px 2px gray;
            }

            .autocomplete-result {
                list-style: none;
                text-align: left;
                padding: 4px 12px;
                cursor: pointer;
                background-color: white;
            }

            .autocomplete-result:hover, :host [active] {
                background-color: #209cee;
                color: white;
            }

            a {
                text-decoration: none;
                display: block
            }
        </style>

        <input class="autocomplete"
               placeholder="Search.."
               on-input="__takeAction"
               autocomplete="off"
               value="{{search::input}}"
               on-blur="__close"
               on-keydown="_checkKey"/>

        <dom-if if="[[open]]">
            <template>
                <ul class="autocomplete-results">
                    <template is="dom-repeat" items="[[local.results]]">
                        <li class="autocomplete-result" active$="[[item.active]]">
                            <a href="#" on-click="_open">[[item.name]]</a>
                        </li>
                    </template>
                </ul>
            </template>
        </dom-if>

        `
    }

    _close() {
        this.open = false;
    }

    _open(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, detail: { target: event.target.data } }));
    }
    _openData(data) {
        this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, detail: { target: data } }));
    }

    _checkKey(event) {
        let key = event.keyCode;
        switch (key.toString()) {
            case "40":
                this._onArrowDown();
                break;
            case "38":
                this._onArrowUp();
                break;
            case "13":
                this._onEnter();
                break;
            case "27":
                this._onEsc();
        }
    }

    _onArrowDown() {
        if (this.local.results !== undefined && this.local.arrowCounter < this.local.results.length) {
            this.local.arrowCounter = this.local.arrowCounter + 1;
        }
        this._redrawArrowCounter();
    }

    _onArrowUp() {
        if (this.local.arrowCounter > 0) {
            this.local.arrowCounter = this.local.arrowCounter - 1;
        }
        this._redrawArrowCounter();
    }

    _redrawArrowCounter() {
        this.local.results.map((nav, index) => {
            this.set(`local.results.${index}.active`, false)
            if (this.get('local.arrowCounter') === (index + 1) ) {
                this.set(`local.results.${index}.active`, true)
            }
        });
    }

    _onEnter() {
        if(this.get('local.arrowCounter') > 0){
            let svar  = this.get(['local.results', this.get('local.arrowCounter') - 1])
            this._emptyAll();
            this._openData(svar.data);
        }
    }

    _onEsc() {
        this._emptyAll();
    }

    _input() {
        this._emptyResults();

        if(this._charsRequired()) {
            this._search();
        }
    }

    _charsRequired() {
        return (this.search.length >= this.local.charsRequired)
    }

    _search() {
        let s = this.get('search')
        let hits = this.data.filter(item => item.reference.toLowerCase().indexOf(s.toLowerCase()) > -1);

        if( hits.length > 0 ) {
            for(var hit of hits) {

                this.push('local.results', {
                    'name': hit.reference,
                    'data': hit,
                    'active': false
                })
            }
            this.set('open', true);
        }
    }

    _emptyResults() {
        this.set('local.results', []);
        this.set('open', false);
        this.set('local.arrowCounter', 0);
    }

    _emptySearch() {
        this.set('search', '')
    }

    _emptyAll() {
        this._emptyResults();
        this._emptySearch();
    }



    static get properties() {
        return {
            local: {
                Object,
                value: {
                    results: [
                        /*{'name': 'Jocke', 'active': true},
                        {'name': 'Linda', 'active': true},
                        {'name': 'Fredrik','active':false}*/
                    ],
                    charsRequired: '3',
                    arrowCounter: 0,
                },
            },
            search: {
                type: String
            },
            loading: {
                type: Boolean,
                value: false
            },
            open: {
                type: Boolean,
                value: false
            },
            results: {
                type: Array [{
                    value: [],
                    active: false,
                }]
            },
            searchResults: [{
                    type: Array,
                active: false,
                }
            ],
            selected: {
                type: Boolean,
                reflectToAttribute: true
            },
            active: {
                type: Boolean,
                reflectToAttribute: true
            }
        }
    }

    static get observers() {
        return [
            '_input(search)',
        ]
    }

}
