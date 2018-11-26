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
    instance = new Tvapi.Release();
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

  describe('Release', function() {
    it('should create an instance of Release', function() {
      // uncomment below and update the code to test Release
      //var instane = new Tvapi.Release();
      //expect(instance).to.be.a(Tvapi.Release);
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

    it('should have the property versionCode (base name: "versionCode")', function() {
      // uncomment below and update the code to test the property versionCode
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

    it('should have the property versionName (base name: "versionName")', function() {
      // uncomment below and update the code to test the property versionName
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

    it('should have the property changeLog (base name: "changeLog")', function() {
      // uncomment below and update the code to test the property changeLog
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

    it('should have the property force (base name: "force")', function() {
      // uncomment below and update the code to test the property force
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

    it('should have the property url (base name: "url")', function() {
      // uncomment below and update the code to test the property url
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

    it('should have the property md5 (base name: "md5")', function() {
      // uncomment below and update the code to test the property md5
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

    it('should have the property channel (base name: "channel")', function() {
      // uncomment below and update the code to test the property channel
      //var instane = new Tvapi.Release();
      //expect(instance).to.be();
    });

  });

}));