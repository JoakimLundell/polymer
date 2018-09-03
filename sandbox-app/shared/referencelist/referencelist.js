import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppReferenceList extends PolymerElement {

    static get template() {
        return html`

        <style>

        span.icon:hover {
            color: var(--blue);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            letter-spacing: 0.1px;
            padding: 5px;
        }

        thead, tbody, tfoot {
            font-size: 13px;
            line-height: 25px;
            text-align: left;
        }
        thead {
            border-bottom: 1px solid grey;
        }

        tbody tr {
            border-bottom: 1px solid silver;
        }

        tbody tr:last-of-type {
            border-bottom: 1px solid grey;
        }

        tbody tr:hover {
            background-color: #f2f2f2;
        }

        tbody tr:hover a {
            color: var(--black);
        }

        tbody tr:hover a:hover {
            color: var(--blue);
        }

        a {
            text-decoration: none;
            margin-left: 12px;
            color: var(--darkgrey);
            text-transform: capitalize;
        }
        a:hover {
            color: var(--accent-color);
            border-bottom: 0px solid var(--accent-color);
        }
        </style>

        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Customer number</th>
                    <th>Reference</td>
                    <th>Active</th>
                    <th>Filename</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <template is="dom-repeat" items="[[references]]">
                    <tr>
                        <td>[[index]] | [[item.id]]</td>
                        <td>[[item.customer_number]]</td>
                        <td>[[item.reference]]</td>
                        <td>
                            <input id="checkbox"
                                   type="checkbox"
                                   checked="{{item.active}}"
                                   disabled />
                        </td>
                        <td>{{ item.original_filename }}</td>
                        <td>{{ item.width }}</td>
                        <td>{{ item.height }}</td>
                        <td style="text-align:right;">
                            <a href="#" on-click="open" data="[[item]]">Edit</a>
                            <a href="#" on-click="confirm" data="[[item.id]]">Delete</a>
                        </td>

                    </tr>
                </template>
            <tbody>
        </table>

        `
    }

    open(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('open', {
            bubbles: true, composed: true, detail: { target: event.target.data } }));
    }

    confirm(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('confirm', {
            bubbles: true, composed: true, detail: { target: event.target.data } }));
    }

    static get properties() {
        return {
            references: {
                type: Array,
                value: ()=>{
                    return []
                }
            }
        }
    }

}
