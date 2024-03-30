import { join } from 'path';

export const routeImage = (fileNameUuid: string) => {
    const directoryPath = join(__dirname, '..', '..', '..', 'uploads');
    const filePath = join(directoryPath, fileNameUuid);
    return filePath;
};
