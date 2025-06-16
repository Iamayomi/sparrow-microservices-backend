export type ErrorData = Record<string, any>;

export interface Avatar {
  filename?: string;
  fieldName?: string;
  originalFilename?: string;
  path: string;
  headers?: {
    "content-disposition": string;
    "content-type": "image/jpeg" | "image/jpg" | "image/gif" | "image/png";
  };
  size?: number;
  name?: string;
  type: "image/jpeg" | "image/jpg" | "image/gif" | "image/png";
  bytes?: number;

  [key: string]: any;
}

export interface MailOptions {
  to: string;
  html: string;
  subject: string;
  from?: string;
  text?: string;
  fromName?: string;
  attachments?: any;
  template?: string;
  context?: MailContext;
}

export type MailContext = {
  username?: string;
  email?: string;
  pasword?: string;
  code?: string;
  expiresIn?: number | string;
  extLink?: string;
  otherLinks?: string;
  date?: string;
  baseUrl?: string;

  [key: string]: any;
};
