import { AttributeValue } from './AttributeValue';

export interface LogRecord {
  setAttribute(key: string, value?: AttributeValue): this;
}

export interface Event {
  setAttribute(key: string, value?: AttributeValue): this;
}
