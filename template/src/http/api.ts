import { http1 } from "@/http/http"

export interface FileModel {
  content?: string;
  file?: File;
  message?: string;
  status?: string;

  url?: string;
  isImage?: boolean;
  pictureId?: string;
}

