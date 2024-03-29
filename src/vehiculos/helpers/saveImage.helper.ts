import * as fs from 'node:fs';
import { join } from 'path';
import { MemoryStoredFile } from 'nestjs-form-data';

export const saveImage = async (file: MemoryStoredFile, fileNameUuid: string) => {
    const directoryPath = join(__dirname, '..', '..', '..', 'uploads');
    const filePath = join(directoryPath, fileNameUuid);

    try {
        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
            } else {
                console.log('El buffer ha sido guardado exitosamente.');
            }
        });
    } catch (error) {
        console.error('Error al intentar guardar el archivo:', error);
    }
};

