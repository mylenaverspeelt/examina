declare module 'pdf2json' {
    import { EventEmitter } from 'events';
  
    declare class Pdfparser extends EventEmitter {
      constructor(context: any, value: number);
      parseBuffer(buffer: Buffer): void;
      loadPDF(pdfFilePath: string, verbosity?: number): Promise<void>;
      createParserStream(): ParserStream;
      on<K extends keyof EventMap>(eventName: K, listener: EventMap[K]): this;
    }
  
    export = Pdfparser;
  }
  