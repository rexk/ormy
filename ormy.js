/**
 * Different database types instantiate different Database sub-classes.
 */
var databaseTypeClasses = {
  mysql: 'MysqlDatabase',
  sqlite3: 'Sqlite3Database'
};

/**
 * The main API function accepts a config and returns a database.
 */
var ormy = module.exports = function (config) {

  // Validate the logger to ensure the desired methods exist.
  var log = config.logger = config.logger || console;
  if (
    typeof log.error != 'function' ||
    typeof log.warn != 'function' ||
    typeof log.info != 'function' ||
    typeof log.log != 'function') {
    throw new Error('[Ormy] Logger must have error, warn, info and log methods.');
  }

  // Validate the database type to ensure we have a class for it.
  var type = config.type || 'mysql';
  var className = databaseTypeClasses[type.toLowerCase()];
  if (!className) {
    throw new Error('[Ormy] Unsupported database type: "' + type + '"');
  }

  // Instantiate a database of the desired type.
  var Database = require('./lib/' + className);
  return new Database(config);

};

/**
 * Expose the version to module users.
 */
ormy.version = require('./package.json').version;

/**
 * Limit the maximum number of results that can be requested.
 */
ormy._MAX_RESULTS = 1e5;
