import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

import AppHello from './shared/hello/hello.js';

export default class SandboxApp extends PolymerElement {

}

window.customElements.define('sandbox-app', SandboxApp);
window.customElements.define('app-hello', AppHello);