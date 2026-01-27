
export interface ShortenerResponse {
  shortUrl: string;
}

export interface ShortenerError {
  message: string;
}

export interface ApiResponse {
  success: boolean;
  data: string;
  message: string;
}

export interface MessageProps {
  message: string;
  type: 'success' | 'error';
}
