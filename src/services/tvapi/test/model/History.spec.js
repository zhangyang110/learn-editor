/**
 * tvapi
 * The TV Backend api v3.0
 *
 * OpenAPI spec version: 3.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Tvapi);
  }
}(this, function(expect, Tvapi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Tvapi.History();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('History', function() {
    it('should create an instance of History', function() {
      // uncomment below and update the code to test History
      //var instane = new Tvapi.History();
      //expect(instance).to.be.a(Tvapi.History);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new Tvapi.History();
      //expect(instance).to.be();
    });

    it('should have the property seriesId (base name: "series_id")', function() {
      // uncomment below and update the code to test the property seriesId
      //var instane = new Tvapi.History();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new Tvapi.History();
      //expect(instance).to.be();
    });

    it('should have the property episode (base name: "episode")', function() {
      // uncomment below and update the code to test the property episode
      //var instane = new Tvapi.History();
      //expect(instance).to.be();
    });

    it('should have the property coverUrl (base name: "cover_url")', function() {
      // uncomment below and update the code to test the property coverUrl
      //var instane = new Tvapi.History();
      //expect(instance).to.be();
    });

    it('should have the property seriesName (base name: "series_name")', function() {
      // uncomment below and update the code to test the property seriesName
      //var instane = new Tvapi.History();
      //expect(instance).to.be();
    });

    it('should have the property app (base name: "app")', function() {
      // uncomment below and update the code to test the property app
      //var instane = new Tvapi.History();
      //expect(instance).to.be();
    });

  });

}));
