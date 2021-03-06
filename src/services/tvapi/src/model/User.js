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


import ApiClient from '../ApiClient';





/**
* The User model module.
* @module model/User
* @version 3.0
*/
export default class User {
    /**
    * Constructs a new <code>User</code>.
    * a registered account
    * @alias module:model/User
    * @class
    * @param name {String} 4-20 alphanumeric characters
    * @param password {String} 4-20 alphanumeric characters
    */

    constructor(name, password) {
        

        
        

        this['name'] = name;this['password'] = password;

        
    }

    /**
    * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/User} obj Optional instance to populate.
    * @return {module:model/User} The populated <code>User</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new User();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('enable')) {
                obj['enable'] = ApiClient.convertToType(data['enable'], 'Boolean');
            }
            if (data.hasOwnProperty('permission')) {
                obj['permission'] = ApiClient.convertToType(data['permission'], Object);
            }
        }
        return obj;
    }

    /**
    * id of the account
    * @member {Number} id
    */
    id = undefined;
    /**
    * 4-20 alphanumeric characters
    * @member {String} name
    */
    name = undefined;
    /**
    * 4-20 alphanumeric characters
    * @member {String} password
    */
    password = undefined;
    /**
    * is the account enable or not
    * @member {Boolean} enable
    */
    enable = undefined;
    /**
    * @member {Object} permission
    */
    permission = undefined;








}


