# Docker to run Webmavryk integration tests
FROM node:18

COPY tsconfig.base.json /webmavryk/
COPY ./integration-tests /webmavryk/integration-tests/

WORKDIR /webmavryk/integration-tests

RUN npm install

CMD ["npm", "run", "originate-known-contracts-and-run-test"]