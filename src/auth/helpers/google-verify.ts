import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

export const googleVerify = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) return null;

    return {
      name: payload.name,
      email: payload.email,
      img: payload.picture,
    };
  } catch (error) {
    return null;
  }
};
