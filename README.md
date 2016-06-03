# react-directives

Seamless bridge between React and Angular.

## Installation

* `npm install react-directives --save`

## Usage

```javascript
import React, { PropTypes } from 'react';
import reactDirectives from 'react-directives';
import angular from 'angular';

function ButtonComponent ({ onClick, text }) {
  return (
    <button type="button" onClick={() => onClick()}>
      {text}
    </button>
  );
}

ButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

angular
  .module('react-app', [])
  .directive(reactDirectives({ ButtonComponent }));
```

```html
<div ng-controller="DemoController as demo">
  <button-component on-click="demo.doSomething"
                    text="demo.text"></button-component>
</div>
```
