import { ExtendedErrorProps, ExtendedErrorOptions } from '../modules/types';
import { uniq } from '.';

class ExtendedError extends Error {
  id: string;

  statusText?: string;

  status?: string;

  auto?: boolean;

  time?: number;

  constructor(props: ExtendedErrorOptions) {
    const { message } = props;
    super(message);
    this.id = uniq();
    this.init(props);
  }

  public convert(): ExtendedErrorProps {
    return {
      id: this.id,
      statusText: this.statusText,
      message: this.message,
      status: this.status,
      auto: this.auto,
      time: this.time,
    };
  }

  private init(props: ExtendedErrorOptions) {
    const { statusText, status } = props;
    this.status = status;
    this.statusText = statusText;
  }
}

export default ExtendedError;
