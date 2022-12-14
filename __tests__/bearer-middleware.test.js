'use strict';


const bearerAuth = require('../src/middleware/bearer');

const { db } = require('../src/models');
const { users } = require('../src/models');

let testUser;
beforeAll(async () => {
  await db.sync();
  testUser = await users.create({
    username: 'testUser',
    password: 'pass',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('Basic auth middleware', () => {
  it('fails on signin as expected', async () => {
    let req = {
      headers: {
        authorization: `Bearer banana`,
      },
    };
    let res = {};
    let next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');

  });
  test('passes appropriately', async () => {
    let req = {
      headers: {
        authorization: `Bearer ${testUser.token}`,
      },
    };
    let res = {};
    let next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Welcome!');
  });
});
