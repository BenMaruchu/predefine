/* dependencies */
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { include } = require('@lykmapipo/include');
const {
  clear: clearHttp,
  expect,
  testRouter,
} = require('@lykmapipo/express-test-helpers');

const { Predefine, predefineRouter } = include(__dirname, '..', '..');

describe('Predefine Rest API', () => {
  const predefine = Predefine.fake();
  const { bucket } = predefine;

  const options = {
    pathSingle: '/predefines/:bucket/:id',
    pathList: '/predefines/:bucket',
    pathSchema: '/predefines/:bucket/schema/',
  };

  before(() => clearHttp());

  before(done => clear(done));

  it('should handle HTTP POST on /predefines', done => {
    const { testPost } = testRouter(options, predefineRouter);
    testPost({ bucket, ...predefine.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Predefine(body);
        expect(created._id).to.exist.and.be.eql(predefine._id);
        expect(created.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines', done => {
    const { testGet } = testRouter(options, predefineRouter);
    testGet({ bucket })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /predefines/:id', done => {
    const { testGet } = testRouter(options, predefineRouter);
    const params = { bucket, id: predefine._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Predefine(body);
        expect(found._id).to.exist.and.be.eql(predefine._id);
        expect(found.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /predefines/id:', done => {
    const { testPatch } = testRouter(options, predefineRouter);
    const { description } = predefine.fakeOnly('description');
    const params = { bucket, id: predefine._id.toString() };
    testPatch(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /predefines/id:', done => {
    const { testPut } = testRouter(options, predefineRouter);
    const { description } = predefine.fakeOnly('description');
    const params = { bucket, id: predefine._id.toString() };
    testPut(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /predefines/id:', done => {
    const { testDelete } = testRouter(options, predefineRouter);
    const params = { bucket, id: predefine._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Predefine(body);
        expect(patched._id).to.exist.and.be.eql(predefine._id);
        expect(patched.name).to.exist.and.be.eql(predefine.name);
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clear(done));
});
