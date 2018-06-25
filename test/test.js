import chai from 'chai';
import app from '../app';

chai.use(require('chai-http'));

// app status
let apiToken;
describe('API /status', () => {
  it('should check api status', () => chai.request(app)
    .get('/status')
    .then((res) => {
      chai.expect(res).to.have.status(200);
    }));
});

// auth api to generate access token
describe('API /auth', () => {
  it('should return accessToken', () => chai.request(app)
    .post('/auth')
    .send({
      username: 'jatin',
      password: 'password'
    })
    .then((res) => {
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.be.an('object');
      chai.expect(res.body.accessToken);
      apiToken = res.body.accessToken;
    }));

  it('should return error, missing body data :username', () => chai.request(app)
    .post('/auth')
    .send({
      password: 'jatin'
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Missing ' +
        'body data: username or password');
    }));

  it('should return error, missing body data :password', () => chai.request(app)
    .post('/auth')
    .send({
      username: 'jatin'
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Missing ' +
        'body data: username or password');
    }));

  // it('should return error, handle try catch edge case', () => chai.request(app)
  //   .post('/auth')
  //   .send({
  //     username: 'jatin',
  //     password: 'pass'
  //   })
  //   .then((res) => {
  //     chai.expect(res).to.have.status(404);
  //     chai.expect(res.body.error).to.be.an('string').that.includes('Missing ' +
  //       'body data: username or password');
  //   }));
});

// jsonpatch api to apply json-patch
describe('API /jsonpatch', () => {
  it('should apply jsonPatch', () => chai.request(app)
    .post('/jsonpatch')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      json: {
        baz: 'qux',
        foo: 'bar'
      },
      patch: [
        { op: 'replace', path: '/baz', value: 'boo' },
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' }
      ]
    })
    .then((res) => {
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.be.an('object');
      chai.expect(res.body.result);
    }));

  it('should return error, invalid accessToken', () => chai.request(app)
    .post('/jsonpatch')
    .set({ Authorization: 'accessToken abc' })
    .send({
      json: {
        baz: 'qux',
        foo: 'bar'
      },
      patch: [
        { op: 'replace', path: '/baz', value: 'boo' },
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' }
      ]
    })
    .then((res) => {
      chai.expect(res).to.have.status(403);
      chai.expect(res.body.error).to.be.an('string').that.includes('Failed ' +
        'to authenticate accessToken with err');
    }));

  it('should return error, missing accessToken', () => chai.request(app)
    .post('/jsonpatch')
    .send({
      json: {
        baz: 'qux',
        foo: 'bar'
      },
      patch: [
        { op: 'replace', path: '/baz', value: 'boo' },
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' }
      ]
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Failed ' +
        'to find accessToken in Header');
    }));


  it('should return error, missing body data :json', () => chai.request(app)
    .post('/jsonpatch')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      patch: [
        { op: 'replace', path: '/baz', value: 'boo' },
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' }
      ]
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Missing ' +
        'body data: json or patch');
    }));

  it('should return error, missing body data :patch', () => chai.request(app)
    .post('/jsonpatch')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      json: {
        baz: 'qux',
        foo: 'bar'
      }
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Missing ' +
        'body data: json or patch');
    }));

  it('should return error, json should be an object', () => chai.request(app)
    .post('/jsonpatch')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      json: 'test',
      patch: [
        { op: 'replace', path: '/baz', value: 'boo' },
        { op: 'add', path: '/hello', value: ['world'] },
        { op: 'remove', path: '/foo' }
      ]
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Invalid ' +
        'body data: json should be an object');
    }));

  it('should return error, patch should be an array', () => chai.request(app)
    .post('/jsonpatch')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      json: {
        baz: 'qux',
        foo: 'bar'
      },
      patch: 'test'
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Invalid ' +
        'body data: patch should be an array');
    }));
});

// images api to resize the image
describe('API /resize', () => {
  it('should resize image', () => chai.request(app)
    .post('/resize')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      imageUrl: 'https://i.ytimg.com/vi/YjqDhCGaR4g/maxresdefault.jpg'
    })
    .then((res) => {
      chai.expect(res).to.have.status(201);
      chai.expect(res.body).to.be.instanceof(Buffer);
    }));

  it('should return, invalid accessToken', () => chai.request(app)
    .post('/resize')
    .set({ Authorization: 'accessToken abc' })
    .send({
      imageUrl: 'https://i.ytimg.com/vi/YjqDhCGaR4g/maxresdefault.jpg'
    })
    .then((res) => {
      chai.expect(res).to.have.status(403);
      chai.expect(res.body.error).to.be.an('string').that.includes('Failed ' +
        'to authenticate accessToken with err');
    }));


  it('should return error, missing body data imageUrl', () => chai.request(app)
    .post('/resize')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      imgUrl: 'https://i.ytimg.com/vi/YjqDhCGaR4g/maxresdefault.jpg'
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Missing ' +
        'body data: imageUrl');
    }));

  it('should return error, imageUrl should be string', () => chai.request(app)
    .post('/resize')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      imageUrl: 1
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Invalid ' +
        'body data: imageUrl should be a string');
    }));

  it('should return error, failed to read image', () => chai.request(app)
    .post('/resize')
    .set({ Authorization: `accessToken ${apiToken}` })
    .send({
      imageUrl: 'abc'
    })
    .then((res) => {
      chai.expect(res).to.have.status(404);
      chai.expect(res.body.error).to.be.an('string').that.includes('Failed ' +
        'to read image');
    }));
});

// swagger docs
describe('/swagger.yml', () => {
  it('should have swagger docs running', () => chai.request(app)
    .get('/swagger.yml')
    .then((res) => {
      chai.expect(res).to.have.status(200);
    }));
});
