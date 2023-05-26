export type ToastType = 'neutral' | 'warning' | 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
  icon?: string;
}
