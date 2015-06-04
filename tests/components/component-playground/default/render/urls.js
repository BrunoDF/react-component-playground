var FIXTURE = 'default';

describe(`ComponentPlayground (${FIXTURE}) Render URLs`, function() {
  var _ = require('lodash'),
      $ = require('jquery'),
      render = require('tests/lib/render-component.js'),
      getUrlProps = require('tests/lib/get-url-props.js'),
      stubLoadChild = require('tests/setup/stub-load-child.js'),
      originalFixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      $component,
      container,
      fixture;

  // Child components are outside the scope
  stubLoadChild();

  beforeEach(function() {
    ({fixture, container, component, $component} = render(originalFixture));
  });

  it('should generate urls with component and fixture names', function() {
    for (var componentName in fixture.components) {
      var fixtures = fixture.components[componentName].fixtures;

      for (var fixtureName in fixtures) {
        var fixtureButton =
            component.refs[componentName + fixtureName + 'Button'];
        var urlProps = getUrlProps(fixtureButton);

        expect(urlProps).to.deep.equal({
          component: componentName,
          fixture: fixtureName
        });
      }
    }
  });
});
