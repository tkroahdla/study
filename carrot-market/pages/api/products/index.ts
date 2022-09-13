import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/client/client';
import { withApiSession } from '@libs/server/withSession';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method == 'GET') {
    const products = await client.product.findMany({});
    res.json({
      ok: true,
      products,
    });
  }
  if (req.method == 'POST') {
    const {
      body: { name, price, desription },
      session: { user },
    } = req;
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
