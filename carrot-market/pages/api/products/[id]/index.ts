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
  const cleanId = Number(id);
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
  // 이름 쪼개기
  const terms = product?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  //   console.log('relatedProducts', relatedProducts);
  //console.log(terms);
  //console.log(product);

  //user.id 가져오기 위해 위쪽에서 세션 끌어온거 기억하기.
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      //경제적으로 사용하기, id만 가져오는 걸루.
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, product, isLiked, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
