'use strict';


/**
 * @apiDefine Predefine Predefine
 *
 * @apiDescription A representation of stored and retrieved information
 * that does not qualify to belongs to their own domain model.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine Predefine
 * @apiSuccess {String} _id Unique predefine identifier
 * @apiSuccess {String} namespace Human readable namespace of a predefined.
 * @apiSuccess {String} key Human readable unique identifier of a predefine.
 * @apiSuccess {String} value Human readable value of a predefine.
 * @apiSuccess {String} [abbreviation] Human readable short form of a
 * predefine value.
 * @apiSuccess {String} [description] A brief summary about a predefine if
 * available i.e additional details that clarify what a predefine is for.
 * @apiSuccess {Number} [weight=0] Weight of the predefine to help in ordering
 * predefines of a given namespace.
 * @apiSuccess {String} [color] A color in hexadecimal format used to
 * differentiate predefined value visually from one other.
 * @apiSuccess {String} [icon] An icon in url or base64 format used to
 * differentiate predefines visually.
 * @apiSuccess {Geometry} [geometry] A geo-geometry representation of a
 * predefined.
 * @apiSuccess {Map} [properties] A map of key value pairs to allow to associate
 * other meaningful information to a predefined.
 * @apiSuccess {Date} [createdAt] Date when predefine was created
 * @apiSuccess {Date} [updatedAt] Date when predefine was last updated
 *
 */


/**
 * @apiDefine Predefines
 * @apiSuccess {Object[]} data List of predefines
 * @apiSuccess {String} data._id Unique predefine identifier
 * @apiSuccess {String} data.namespace Human readable namespace of a predefined.
 * @apiSuccess {String} data.key Human readable unique identifier of a predefine.
 * @apiSuccess {String} data.value Human readable value of a predefine.
 * @apiSuccess {String} [data.abbreviation] Human readable short form of a
 * predefine value.
 * @apiSuccess {String} [data.description] A brief summary about a predefine if
 * available i.e additional details that clarify what a predefine is for.
 * @apiSuccess {Number} [data.weight=0] Weight of the predefine to help in
 * ordering predefines of a given namespace.
 * @apiSuccess {String} [data.color] A color in hexadecimal format used to
 * differentiate predefined value visually from one other.
 * @apiSuccess {String} [data.icon] An icon in url or base64 format used to
 * differentiate predefines visually.
 * @apiSuccess {Geometry} [data.geometry] A geo-geometry representation of a
 * predefined.
 * @apiSuccess {Map} [data.properties] A map of key value pairs to allow to
 * associate other meaningful information to a predefined.
 * @apiSuccess {Date} [data.createdAt] Date when predefine was created
 * @apiSuccess {Date} [data.updatedAt] Date when predefine was last updated
 * @apiSuccess {Number} total Total number of predefine
 * @apiSuccess {Number} size Number of predefines returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest predefine
 * was last modified
 *
 */


/**
 * @apiDefine PredefineSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5b622350480e576243f10d8b",
 *   "namespace": "Contact",
 *   "key": "group",
 *   "value": "family",
 *   "updatedAt": "2019-03-14T21:17:04.729Z",
 *   "createdAt": "2019-03-14T21:17:04.729Z"
 * }
 *
 */


/**
 * @apiDefine PredefinesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [{
 *     "_id": "5b622350480e576243f10d8b",
 *     "namespace": "Contact",
 *     "key": "group",
 *     "value": "family",
 *     "updatedAt": "2019-03-14T21:17:04.729Z",
 *     "createdAt": "2019-03-14T21:17:04.729Z"
 *   }],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 *
 */


/* dependencies */
const { include } = require('@lykmapipo/include');
const { getString } = require('@lykmapipo/env');
const {
  getFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router
} = require('@lykmapipo/express-rest-actions');


/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/predefines/:id';
const PATH_LIST = '/predefines';
const PATH_SCHEMA = '/predefines/schema/';


/* declarations */
const Predefine = include(__dirname, 'predefine.model');
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /predefines List Predefines
 * @apiVersion 1.0.0
 * @apiName GetPredefines
 * @apiGroup Predefine
 * @apiDescription Returns a list of predefines
 * @apiUse RequestHeaders
 * @apiUse Predefines
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefinesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, getFor({
  get: (options, done) => Predefine.get(options, done)
}));


/**
 * @api {get} /predefines/schema Get Predefine Schema
 * @apiVersion 1.0.0
 * @apiName GetPredefineSchema
 * @apiGroup Predefine
 * @apiDescription Returns predefine json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Predefine.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /predefines Create New Predefine
 * @apiVersion 1.0.0
 * @apiName PostPredefine
 * @apiGroup Predefine
 * @apiDescription Create new predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, postFor({
  post: (body, done) => Predefine.post(body, done)
}));


/**
 * @api {get} /predefines/:id Get Existing Predefine
 * @apiVersion 1.0.0
 * @apiName GetPredefine
 * @apiGroup Predefine
 * @apiDescription Get existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, getByIdFor({
  getById: (options, done) => Predefine.getById(options, done)
}));


/**
 * @api {patch} /predefines/:id Patch Existing Predefine
 * @apiVersion 1.0.0
 * @apiName PatchPredefine
 * @apiGroup Predefine
 * @apiDescription Patch existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, patchFor({
  patch: (options, done) => Predefine.patch(options, done)
}));



/**
 * @api {put} /predefines/:id Put Existing Predefine
 * @apiVersion 1.0.0
 * @apiName PutPredefine
 * @apiGroup Predefine
 * @apiDescription Put existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, putFor({
  put: (options, done) => Predefine.put(options, done)
}));


/**
 * @api {delete} /predefines/:id Delete Existing Predefine
 * @apiVersion 1.0.0
 * @apiName DeletePredefine
 * @apiGroup Predefine
 * @apiDescription Delete existing predefine
 * @apiUse RequestHeaders
 * @apiUse Predefine
 *
 * @apiUse RequestHeadersExample
 * @apiUse PredefineSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, deleteFor({
  del: (options, done) => Predefine.del(options, done),
  soft: true
}));


/* expose predefine router */
module.exports = exports = router;