import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/sheets';

export async function GET() {
  try {
    const data = await getSheetData('1rMSpNAI37lb5mGfLvz1B5pIlDTplpphWeRiDvKpKUuQ');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}