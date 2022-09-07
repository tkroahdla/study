import client from '@libs/client/client';
import withHandler from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
      // ...(phone && { phone: +phone }), // if else랑 같음 es6
      // ...(phone ? { phone: +phone} : {} ) // 불편하면 이거 쓰래
    },
    create: {
      name: 'anonymous',
      ...payload,
    },
    update: {},
  });
  const token = await client.token.create({
    data: {
      payload: '1234',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  // if (email) {
  //   console.log('found it!!!');
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (!user) {
  //     console.log('Did not find. will create.');
  //     user = await client.user.create({
  //       data: {
  //         name: 'Anonymous',
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (user) console.log('found it');
  //   if (!user) {
  //     console.log('Did not find. will create.');
  //     user = await client.user.create({
  //       data: {
  //         name: 'Anonymous',
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  res.status(200).end();
}

export default withHandler('POST', handler);
