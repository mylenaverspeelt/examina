declare module 'pdf2json' {
  import { EventEmitter } from 'events';

  type PDFData = {
    Pages: Array; 
  };

  type PDFError = {
    message: string;
    stack?: string;
  };

  type PDFError = {
    parserError: Error;
  };

  type EventMap = {
    pdfParser_dataReady: (pdfData: PDFData) => void;
    pdfParser_dataError: (error: PDFError) => void;
  };

  declare class PdfParser extends EventEmitter {
    constructor(context?: object, verbosity?: number);
    parseBuffer(buffer: Buffer): void;
    loadPDF(pdfFilePath: string): void;
    createParserStream(): NodeJS.ReadableStream;
    on<K extends keyof EventMap>(eventName: K, listener: EventMap[K]): this;
  }

  export = PdfParser;
}
