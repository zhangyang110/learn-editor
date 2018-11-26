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


import ApiClient from "../ApiClient";
import CommonResponse from '../model/CommonResponse';
import Error from '../model/Error';

/**
* Images service.
* @module api/ImagesApi
* @version 3.0
*/
export default class ImagesApi {

    /**
    * Constructs a new ImagesApi. 
    * @alias module:api/ImagesApi
    * @class
    * @param {module:ApiClient} apiClient Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Returns all the images
     * Get all the images   
     * @param {String} tag tag1,tag2 ...
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Limit the size of result set. Must be an integer
     * @param {Number} opts.offset Start position of result set. Must be an integer
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    imagesGetWithHttpInfo(tag, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'tag' is set
      if (tag === undefined || tag === null) {
        throw new Error("Missing the required parameter 'tag' when calling imagesGet");
      }


      let pathParams = {
      };
      let queryParams = {
        'tag': tag,
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/images', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Returns all the images
     * Get all the images   
     * @param {String} tag tag1,tag2 ...
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Limit the size of result set. Must be an integer
     * @param {Number} opts.offset Start position of result set. Must be an integer
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    imagesGet(tag, opts) {
      return this.imagesGetWithHttpInfo(tag, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * put image
     * put image
     * @param {Number} id 
     * @param {File} file The uploaded file data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    imagesIdContentPutWithHttpInfo(id, file) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling imagesIdContentPut");
      }

      // verify the required parameter 'file' is set
      if (file === undefined || file === null) {
        throw new Error("Missing the required parameter 'file' when calling imagesIdContentPut");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'file': file
      };

      let authNames = ['Bearer'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/images/{id}/content', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * put image
     * put image
     * @param {Number} id 
     * @param {File} file The uploaded file data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    imagesIdContentPut(id, file) {
      return this.imagesIdContentPutWithHttpInfo(id, file)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * put image
     * put image
     * @param {Number} id 
     * @param {String} tag tag
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    imagesIdTagPutWithHttpInfo(id, tag) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling imagesIdTagPut");
      }

      // verify the required parameter 'tag' is set
      if (tag === undefined || tag === null) {
        throw new Error("Missing the required parameter 'tag' when calling imagesIdTagPut");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
        'tag': tag
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/images/{id}/tag', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * put image
     * put image
     * @param {Number} id 
     * @param {String} tag tag
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    imagesIdTagPut(id, tag) {
      return this.imagesIdTagPutWithHttpInfo(id, tag)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * upload image
     * upload image
     * @param {File} file The uploaded file data
     * @param {String} tag The tag
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    imagesPostWithHttpInfo(file, tag) {
      let postBody = null;

      // verify the required parameter 'file' is set
      if (file === undefined || file === null) {
        throw new Error("Missing the required parameter 'file' when calling imagesPost");
      }

      // verify the required parameter 'tag' is set
      if (tag === undefined || tag === null) {
        throw new Error("Missing the required parameter 'tag' when calling imagesPost");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'file': file,
        'tag': tag
      };

      let authNames = ['Bearer'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/images', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * upload image
     * upload image
     * @param {File} file The uploaded file data
     * @param {String} tag The tag
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    imagesPost(file, tag) {
      return this.imagesPostWithHttpInfo(file, tag)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
