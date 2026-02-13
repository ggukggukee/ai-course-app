export type InitPaymentResponse = {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Success: boolean;
  Status: string;
  PaymentId: string;
  ErrorCode: string;
  PaymentURL?: string;
  Message?: string;
  Details?: string;
};

export type GetQrResponse = {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  Data: string;
  PaymentId: number;
  ErrorCode: string;
  Message?: string;
  Details?: string;
  RequestKey: string;
};
