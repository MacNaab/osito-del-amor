// lib/sheets.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { SheetRow } from '@/utils/AppConfig'; 

export async function getSheetData(sheetId: string): Promise<SheetRow[]> {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    
    // Récupérer toutes les données, y compris les en-têtes
    const rows = await sheet.getRows();
    
    // Récupérer les en-têtes
    const headers = sheet.headerValues;
    
    // Transformer les données comme dans l'Apps Script
    const jsonData: SheetRow[] = rows.map((row, index) => {
      const jsonRow: SheetRow = {
        id: index, // Ajout de l'id basé sur l'index
      };
      
      headers.forEach(header => {
        const value = row.get(header);
        
        if (header === 'Difficile') {
          jsonRow[header] = Number(value) || 1;
        } else if (header === 'Type') {
          jsonRow[header] = value ? value.split(',') : [];
        } else {
          jsonRow[header] = value;
        }
      });
      
      return jsonRow;
    });

    return jsonData;
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw new Error('Failed to fetch spreadsheet data');
  }
}