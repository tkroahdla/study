import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

declare module "iron-session" {
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
  const {
    body: { email, phone, name, avatarId },
    session: { user },
  } = req;

  if (req.method === "POST") {
    const profileUpdate = await client.user.update({
      where: {
        id: 2,
      },
      data: {
        email,
        phone,
        name,
        avatar,
      },
    });

    res.json({
      ok: true,
    });
  }

  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    res.json({
      ok: true,
      profile,
    });
    res.status(200).end();
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
