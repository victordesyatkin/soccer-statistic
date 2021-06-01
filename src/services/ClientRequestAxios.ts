import axios from 'axios';

import ExtendedError from '../helpers/ExtendedError';
import { IClientHttpRequest } from '../modules/types';

class ClientRequestAxios implements IClientHttpRequest {
  private source;

  constructor() {
    this.source = axios.CancelToken.source();
  }

  public abort(message?: string): void {
    this.source.cancel(message);
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
      const response = await axios.get<T, { data: T }>(
        `${apiBase}${url}${params}`,
        {
          headers: { 'X-Auth-Token': apiKey },
          cancelToken: this.source.token,
        }
      );
      return response.data;
    } catch (error) {
      const clientError = {
        message: '',
        statusText: error.message,
      };
      if (error.response) {
        clientError.message = error.response.status;
      } else if (error.request) {
        clientError.message = error.request.status;
      } else {
        clientError.message = '403';
      }
      if (error.message === 'Network Error') {
        clientError.message = '403';
      }
      if (axios.isCancel(error)) {
        clientError.message = '410';
      }
      throw new ExtendedError(clientError);
    }
  }
}

export default ClientRequestAxios;
