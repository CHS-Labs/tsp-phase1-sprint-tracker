const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
}

class GoogleDriveService {
  async listFilesInFolder(folderId: string): Promise<DriveFile[]> {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,createdTime,modifiedTime,webViewLink)&orderBy=createdTime desc`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Drive files: ${response.statusText}`);
    }

    const data = await response.json();
    return data.files || [];
  }
}

export const googleDriveService = new GoogleDriveService();
export type { DriveFile };
