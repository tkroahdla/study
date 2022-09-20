import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;

  const stream = await client.stream.findUnique({
    where: {
      id: +id!.toString(),
    },
  });

  res.status(200).json({ ok: true, stream });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);
