import { } from '../../../node_modules/@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-style">
  <template>
    <style>
      * {
        box-sizing: border-box;
      }
      ::selection{
          background-color: var(--accent-color-light);
      }
      body, p, h1, h2, h3, h4, h5, h6{
        margin: 0;
      }
      a {
          text-decoration: none;
          color: var(--darkblue);
          text-transform: capitalize;
      }
      a:hover {
          color: var(--blue);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
