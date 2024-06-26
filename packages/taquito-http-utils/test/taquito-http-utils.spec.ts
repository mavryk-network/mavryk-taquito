import { HttpBackend } from '../src/taquito-http-utils';

describe('HttpBackend test', () => {
  const httpBackend: HttpBackend = new HttpBackend();

  it('Should be able to instantiate an HttpBackend object', () => {
    expect(httpBackend).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(httpBackend.timeout).toEqual(30000);
  });

  it('Should be able to pass timeout to HttpBackend constructor and override default', async () => {
    const http: HttpBackend = new HttpBackend(15000);

    expect(http).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(http.timeout).toEqual(15000);
  });

  it('Should serialize object while repsecting non-zero values.', async () => {
    const httpRequestQuery = {
      delegate: ['mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL', 'mv1HNQJNNFKhzEsyX88jrRk4W7vCFE2sbucU'],
      max_priority: 1,
    };
    const response = httpBackend['serialize'](httpRequestQuery);
    expect(response).toEqual(
      '?delegate=mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL&delegate=mv1HNQJNNFKhzEsyX88jrRk4W7vCFE2sbucU&max_priority=1'
    );
  });

  it('Should serialize object while repsecting zero values.', async () => {
    const httpRequestQuery = {
      delegate: ['mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL', 'mv1HNQJNNFKhzEsyX88jrRk4W7vCFE2sbucU'],
      max_priority: 0,
    };
    const response = httpBackend['serialize'](httpRequestQuery);
    expect(response).toEqual(
      '?delegate=mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL&delegate=mv1HNQJNNFKhzEsyX88jrRk4W7vCFE2sbucU&max_priority=0'
    );
  });
});
