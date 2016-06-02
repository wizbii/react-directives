import React from 'react';
import ReactDOM from 'react-dom';

function reactDirectives (directives) {
  const result = {};

  for (let name in directives) {
    if (!directives.hasOwnProperty(name)) {
      continue;
    }

    const Component = directives[name];

    // lower case the first letter of the component's name
    // as it's not a valid angular directive
    // e.g richInput is valid whereas RichInput is not
    name = name.charAt(0).toLowerCase() + name.substr(1);

    const props = Object.keys(Component.propTypes);
    const bindings = props.reduce(function (result, prop) {
      result[prop] = '=';
      return result;
    }, {});

    function directive () {
      return {
        restrict: 'E',
        replace: true,
        scope: bindings,
        link (scope, element) {
          element = element[0];

          // if the directive requires some props
          // we let the watchers call renderComponent for the first time
          // otherwise we'd render it without its props
          // but if there's no props, hence no watchers, we need
          // to render it once
          if (props.length === 0) {
            renderComponent();
          } else {
            props.forEach(prop => scope.$watchCollection(prop, renderComponent));
          }

          // not unmounting the node would result
          // in a memory leak as the reference remains in React
          // (even if the DOM element is removed)
          scope.$on('$destroy', function () {
            ReactDOM.unmountComponentAtNode(element);
          });

          function renderComponent () {
            const propsValues = _.pick(scope, props);
            ReactDOM.render(<Component {...propsValues} />, element);
          }
        }
      };
    }

    result[name] = directive;
  }

  console.log(result);
  return result;
}

export default reactDirectives;
