import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
  // 인증을 선택값으로 지정, 다만 디폴트값은 false
}

export default function withHandler({
  methods,
  isPrivate = true,
  // 인증 디폴트값 설정
  // 사적이냐 사적이지 않나 디폴트
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    // 정상적인 메소드가 아님
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    //사적인 페이지 && 유저정보 없음
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'Plz log in.' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
