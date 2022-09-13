import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/client/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    // 유저 데이터가 모두 필요한건 아니니까.
    // select 사용해서 id , name, avatar만 선택적으로 가져오기
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  console.log(product);
  res.json({ ok: true, product });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
