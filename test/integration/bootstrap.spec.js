import { connect, clear, drop } from '@lykmapipo/mongoose-test-helpers';

process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';
process.env.PREDEFINE_NAMESPACES = 'Currency,Unit';

/* setup database */
before(done => connect(done));

/* clear database */
before(done => clear(done));

/* drop database */
after(done => drop(done));
