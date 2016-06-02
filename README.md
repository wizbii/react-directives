# react-directives

Seamless bridge between React and Angular.

## Installation

* `npm install react-directives --save`

## Usage

```javascript
import angular from 'angular';
import Component from './Component';

angular
  .module('react-app', [])
  .directive({ Component });
```

```html
<component></component>
```