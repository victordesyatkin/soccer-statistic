import ExtendedError from '../helpers/ExtendedError';
import { IClientHttpRequest } from '../modules/types';

class ClientRequestFetch implements IClientHttpRequest {
  private source;

  constructor() {
    this.source = new AbortController();
  }

  public abort(): void {
    return this.source.abort();
  }

  public async getResourceFetch<T>({
    url,
    params,
    apiBase,
    apiKey,
  }: {
    url: string;
    params: string;
    apiKey: string;
    apiBase: string;
  }): Promise<T> {
    try {
      const response = await fetch(`${apiBase}${url}${params}`, {
        headers: { 'X-Auth-Token': apiKey },
        signal: this.source.signal,
      });
      if (!response.ok) {
        throw new ExtendedError({
          message: `${response.status}`,
          statusText: response.statusText,
        });
      }
      const results = await response.json();
      return results;
    } catch (error) {
      const clientError = {
        message: `${error.status || 403}`,
        statusText: error.message,
      };
      if (error.name === 'AbortError') {
        clientError.message = '410';
      }
      throw new ExtendedError(clientError);
    }
  }
}

export default ClientRequestFetch;
