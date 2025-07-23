export type ApiResponse = {
  status: 'success' | 'error';

  message: string;
  data?: { [key: string]: any }; 
};
