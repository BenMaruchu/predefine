import _ from 'lodash';
import { getObject, getString, getStringSet } from '@lykmapipo/env';
import {
  abbreviate,
  compact,
  isNotValue,
  mergeObjects,
  singularize,
  sortedUniq,
} from '@lykmapipo/common';
import {
  collectionNameOf,
  copyInstance,
  createSubSchema,
  ObjectId,
} from '@lykmapipo/mongoose-common';

export const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');

export const LOCALES = getStringSet('LOCALES', DEFAULT_LOCALE);

export const MODEL_NAME = getString('PREDEFINE_MODEL_NAME', 'Predefine');

export const COLLECTION_NAME = getString(
  'PREDEFINE_COLLECTION_NAME',
  'predefines'
);

export const SCHEMA_OPTIONS = { collection: COLLECTION_NAME };

export const DEFAULT_NAMESPACE = getString(
  'PREDEFINE_DEFAULT_NAMESPACE',
  'Setting'
);

export const NAMESPACES = getStringSet(
  'PREDEFINE_NAMESPACES',
  DEFAULT_NAMESPACE
);

export const NAMESPACE_MAP = _.map(NAMESPACES, namespace => {
  return { namespace, bucket: collectionNameOf(namespace) };
});

export const NAMESPACE_DICTIONARY = _.zipObject(
  NAMESPACES,
  _.map(NAMESPACES, namespace => collectionNameOf(namespace))
);

export const DEFAULT_BUCKET = collectionNameOf(DEFAULT_NAMESPACE);

export const BUCKETS = sortedUniq(_.map(NAMESPACE_MAP, 'bucket'));

export const OPTION_AUTOPOPULATE = {
  select: { name: 1, code: 1, abbreviation: 1, symbol: 1, weight: 1, color: 1 },
  maxDepth: 1,
};

/**
 * @function localizedNamesFor
 * @name localizedNamesFor
 * @description Generate locale fields name of a given path
 * @param {String} path valid schema path
 * @return {Array} sorted set of localized fields
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * localizedNamesFor('name');
 * // => ['name.en', 'name.sw']
 *
 */
export const localizedNamesFor = path => {
  const fields = _.map(LOCALES, locale => `${path}.${locale}`);
  return sortedUniq(fields);
};

/**
 * @function localizedValuesFor
 * @name localizedValuesFor
 * @description Normalize given value to ensure all locales has value
 * @param {Object|Schema} value valid localized values
 * @return {Object} normalize localized values
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * localizedValuesFor({ en: 'Tomato' });
 * // => {en: 'Tomato', sw: 'Tomato'}
 *
 * localizedValuesFor({ en: 'Tomato', sw: 'Nyanya' });
 * // => {en: 'Tomato', sw: 'Nyanya'}
 *
 */
export const localizedValuesFor = (val = {}) => {
  const value = {};
  const defaultValue =
    val[DEFAULT_LOCALE] || _.first(_.values(copyInstance(val)));
  _.forEach(LOCALES, locale => {
    value[locale] = isNotValue(val[locale]) ? defaultValue : val[locale];
  });
  return value;
};

/**
 * @function localizedAbbreviationsFor
 * @name localizedAbbreviationsFor
 * @description Generate localized abbreviation of a given value
 * @param {Object|Schema} value valid localized values
 * @return {Object} normalize localized abbreviation
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * localizedAbbreviationsFor({ en: 'Tomato' });
 * // => {en: 'T', sw: 'T'}
 *
 * localizedAbbreviationsFor({ en: 'Tomato', sw: 'Nyanya' });
 * // => {en: 'T', sw: 'N'}
 *
 */
export const localizedAbbreviationsFor = (val = {}) => {
  const value = {};
  const defaultValue =
    val[DEFAULT_LOCALE] || _.first(_.values(copyInstance(val)));
  _.forEach(LOCALES, locale => {
    const abbreviation = abbreviate(
      isNotValue(val[locale]) ? defaultValue : val[locale]
    );
    value[locale] = abbreviation;
  });
  return compact(value);
};

/**
 * @function uniqueIndexes
 * @name uniqueIndexes
 * @description Generate unique index definition of predefine
 * @return {Object} unique index definition
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * uniqueIndexes();
 * // => { 'name.en': 1, code: 1, bucket:1 }
 *
 */
export const uniqueIndexes = () => {
  const indexes = mergeObjects({ namespace: 1, bucket: 1, code: 1 });
  _.forEach(LOCALES, locale => {
    indexes[`name.${locale}`] = 1;
  });
  return indexes;
};

/**
 * @function parseNamespaceRelations
 * @name parseNamespaceRelations
 * @description Convert all specified namespace to relations
 * @return {Object} valid normalized relations
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * parseNamespaceRelations();
 * // => { setting: { type: ObjectId, ref: 'Predefine' } }
 *
 */
export const parseNamespaceRelations = () => {
  const paths = _.map(NAMESPACES, path => _.toLower(singularize(path)));
  let relations = _.zipObject(paths, paths);
  relations = _.mapValues(relations, () => {
    return mergeObjects({
      type: ObjectId,
      ref: MODEL_NAME,
      index: true,
      aggregatable: true,
      taggable: true,
      autopopulate: { maxDepth: 1 },
    });
  });
  return relations;
};

/**
 * @function parseGivenRelations
 * @name parseGivenRelations
 * @description Safely parse and normalize predefine relation config
 * @param {Mixed} relations relation to parse
 * @return {Object} valid normalized relations
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * process.env.PREDEFINE_RELATIONS='{"owner":{"ref":"Party"}}'
 * parseGivenRelations();
 * // => { owner: { ref: 'Party', autopopulate:true } }
 *
 */
export const parseGivenRelations = () => {
  let relations = getObject('PREDEFINE_RELATIONS', {});
  relations = _.mapValues(relations, relation => {
    return mergeObjects(relation, {
      type: ObjectId,
      ref: relation.ref || MODEL_NAME,
      index: true,
      aggregatable: true,
      taggable: true,
      autopopulate: { maxDepth: 1 },
    });
  });
  return relations;
};

/**
 * @function createRelationsSchema
 * @name createRelationsSchema
 * @description Create predefine relations schema
 * @return {Schema} valid mongoose schema
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * createRelationsSchema();
 *
 */
export const createRelationsSchema = () => {
  const relations = mergeObjects(
    parseGivenRelations(),
    parseNamespaceRelations()
  );
  return createSubSchema(relations);
};
