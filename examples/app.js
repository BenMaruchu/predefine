'use strict';


/* dependencies */
const _ = require('lodash');
const { connect } = require('@lykmapipo/mongoose-common');
const { include } = require('@lykmapipo/include');
const { app, mount, start } = require('@lykmapipo/express-common');
const {
  info,
  predefineRouter,
  Predefine,
  apiVersion
} = include(__dirname, '..');


// establish mongodb connection
connect(error => {
  // re-throw if error
  if (error) { throw error; }

  // expose module info
  app.get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  // mount router
  mount(predefineRouter);

  // fire the app
  start((error, env) => {
    // re-throw if error
    if (error) { throw error; }

    // start http server
    _.forEach(Predefine.BUCKETS, bucket => {
      const path = `predefines/${bucket}`;
      console.log(`visit http://0.0.0.0:${env.PORT}/${apiVersion}/${path}`);
    });
  });

});
