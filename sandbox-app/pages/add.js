import { html, PolymerElement } from '../../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AppAdd extends PolymerElement {

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

                td {
                    padding: 5px;
                    width: 200px;
                }
                td:first-child {
                    width: 120px;
                }
            </style>
            <section class="container">
                <slot></slot>

                <form id="test" method='POST' action='' enctype="multipart/form-data">
                    <table>
                        <tr>
                            <td>Reference</td>
                            <td>
                                <input class="input" type="text"
                                    name="reference" autocomplete="off"
                                    value="{{form.reference::input}}" />
                            </td>
                        </tr>
                        <tr>
                            <td>Attached file</td>
                            <td>
                                <input class="file-input"
                                       type="file"
                                       name="file" />
                            </td>
                        </tr>
                        <tr>
                            <td>Active</td>
                            <td>
                                <input type="checkbox"
                                       name="active"
                                       checked="{{form.active::change}}" />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="submit" on-click="_submit_form" value="Lägg till" />
                            </td>
                        </tr>
                    </table>
                </form>

                <hr />
                <div>FOR TEST ONLY <br />
                    reference = [[form.reference]] |
                    filename = [[form.filename]] |
                    active = [[form.active]]
                </div>

            </section>
        `
    }

    _submit_form( event ) {
        event.preventDefault();
        //console.log("Submit Form" + event.target.form.name);
        //console.dir(event.target.form);
        //alert(this.form.reference);
        //alert(this.form.reference);
        this.dispatchEvent(new CustomEvent('add', { bubbles: true, composed: true, detail: this.form }));
    }

    static get properties() {
        return {
            form: {
                type: Object,
                value: {
                    reference: '',
                    filename: 'filename',
                    active: true
                }
            }
        }
    }


}
