import _ from 'lodash';
import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '../../src/index';

describe('Predefine getById', () => {
  before(done => clear(done));

  let predefine = Predefine.fake();

  before(done => {
    predefine.post((error, created) => {
      predefine = created;
      done(error, created);
    });
  });

  it('should be able to get an instance', done => {
    Predefine.getById(predefine._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      done(error, found);
    });
  });

  it('should be able to get with options', done => {
    const options = {
      _id: predefine._id,
      select: 'name',
    };

    Predefine.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(predefine._id);
      expect(found.name).to.exist;

      // ...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(2);
      _.map(['namespace', 'description', 'createdAt', 'updatedAt'], field => {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });
  });

  it('should throw if not exists', done => {
    const fake = Predefine.fake();
    Predefine.getById(fake._id, (error, found) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});
