import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/client/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  //findUnique는 unique 필드만 쿼리 할 수 있다.
  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: Number(id),
      userId: user?.id,
    },
  });

  //delete도 unique 필드를 대상으로만 삭제 가능하다.
  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  })
);
