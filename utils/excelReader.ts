import * as xlsx from 'xlsx';
import path from 'path';

// Definimos una interfaz para tener autocompletado de TypeScript según tu Excel
export interface PokemonData {
    id: number;
    name: string;
    abilities: string;
}

export function getPokemonData(): PokemonData[] {
    // Apuntamos a la carpeta 'Data' donde tienes el Excel
    const filePath = path.resolve(__dirname, '../Data/Challenge automation - Datos-pruebas.xlsx');

    // Leemos el archivo
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Toma la primera hoja
    const sheet = workbook.Sheets[sheetName];

    // Convierte el Excel a un array de objetos
    return xlsx.utils.sheet_to_json<PokemonData>(sheet);
}