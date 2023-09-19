import { getWorkshopsByScholar } from '@/lib/db/utils/Workshops';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const workshops = await getWorkshopsByScholar();
  return NextResponse.json(workshops);
}
