import twilio from 'twilio';
import client from '@libs/client/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import * as emailjs from 'emailjs-com';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
            // ...(phone && { phone: +phone }), // if else랑 같음 es6
            // ...(phone ? { phone: +phone} : {} ) // 불편하면 이거 쓰래
          },
          create: {
            name: 'anonymous',
            ...user,
          },
        },
      },
    },
  });

  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.MSG_SERVICE_SID,
  //     to: process.env.MYPHONE_NUM!,
  //     body: `Your login token is ${payload} 부야!`,
  //   });
  //   console.log(message);
  // }
  // if (email) {
  //   const templateParams = {
  //     from_name: 'john',
  //     from_email: 'jejedong@naver.com',
  //     to_name: 'john',
  //     message: '개빡친다',
  //   };
  //   var service_id = 'Carrot-market';
  //   var template_id = 'template_o3inpw9';

  //   await emailjs
  //     .send(service_id, template_id, templateParams, 'GPNOtbQ0fP5NV-LHxQoIn')
  //     .then(
  //       ({ status }) => {
  //         // Show success message
  //         console.log('success!!');
  //       },
  //       () => {
  //         // Show error message
  //         console.log('errors!!');
  //       }
  //     );
  // }

  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
