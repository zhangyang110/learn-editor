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
    instance = new Tvapi.ImagesApi();
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

  describe('ImagesApi', function() {
    describe('imagesGet', function() {
      it('should call imagesGet successfully', function(done) {
        //uncomment below and update the code to test imagesGet
        //instance.imagesGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('imagesIdContentPut', function() {
      it('should call imagesIdContentPut successfully', function(done) {
        //uncomment below and update the code to test imagesIdContentPut
        //instance.imagesIdContentPut(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('imagesIdTagPut', function() {
      it('should call imagesIdTagPut successfully', function(done) {
        //uncomment below and update the code to test imagesIdTagPut
        //instance.imagesIdTagPut(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('imagesPost', function() {
      it('should call imagesPost successfully', function(done) {
        //uncomment below and update the code to test imagesPost
        //instance.imagesPost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
