import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;
  console.log(id, user);

  const message = await client.message.create({
    data: {
      message: body.message,
      stream: {
        connect: {
          id: Number(id),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.status(200).json({ ok: true, message });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
