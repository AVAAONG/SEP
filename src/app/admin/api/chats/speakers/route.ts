import { createChatSpeaker } from '@/lib/db/utils/chats';
import { setTokens } from '@/lib/googleAPI/auth';
import { getSpreadsheetValues } from '@/lib/googleAPI/sheets';
import { ChatSpeaker } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const token = await getToken({ req });
  setTokens(token.accessToken, token.refreshToken);
  const chatSpeaker = await createChatSpeakerFromSpreadsheet();
  console.log(chatSpeaker);
  return NextResponse.json(chatSpeaker);
};
const WORKSHOP_SPEAKERS_SPREADSHEET = '1uGrF-GNSILOXVOy3SLZUvx47HXzcJMv4TaJHJ26aBLc';
const WORKSHOP_SPEAKER_SHEET = 'Facilitadores de chats';
const WORKSHOP_SPEAKERS_RANGE = `'${WORKSHOP_SPEAKER_SHEET}'!C3:J39`;

const createChatSpeakerFromSpreadsheet = async () => {
  const values = (await getSpreadsheetValues(
    WORKSHOP_SPEAKERS_SPREADSHEET,
    WORKSHOP_SPEAKERS_RANGE
  )) as string[][];

  const chatSpeaker = values.map(async (value) => {
    const [first_names, last_names1, last_names2, id, email, phone_number, speakerGender] = value;
    const gender = speakerGender.toLowerCase() === 'hombre' ? 'M' : 'F';
    const ChatSpeaker: ChatSpeaker = {
      id,
      first_names,
      last_names: `${last_names1} ${last_names2}`,
      email: email ? email.toLowerCase() : null,
      birthdate: null,
      gender,
      description: null,
      facebook_user: null,
      image: null,
      instagram_user: null,
      linkedin_user: null,
      phone_number: phone_number ? phone_number.replace(/\s/g, '') : null,
      twitter_user: null,
      is_scholar: true,
      scholar_id: null,
    };
    await createChatSpeaker(ChatSpeaker);
    return ChatSpeaker;
  });

  return chatSpeaker;
};
