import React, { FC, useCallback, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import Modal from '../../components/modal';
import ModalItem from '../../components/modal-item';
import { removeError } from '../../modules/actions';
import { ReducerProps, ItemsErrorProps } from '../../modules/types';
import { extractFormatMessage } from '../../helpers';

const ModalContainer: FC = () => {
  const errors = useSelector<ReducerProps, ItemsErrorProps>(
    (state) => state.common.errors
  );
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const {
    errorId,
    errorMessage,
    errorStatus,
    errorAuto,
    errorTime,
  } = useMemo(() => {
    const [firstError] = Object.values(errors);
    const readyError: Partial<{
      errorId: string;
      errorMessage: string;
      errorStatus: string;
      errorAuto: boolean;
      errorTime: number;
    }> = {};
    if (firstError) {
      const { message, id, status, auto, time } = firstError;
      readyError.errorId = id;
      readyError.errorMessage = message;
      readyError.errorStatus = status;
      readyError.errorAuto = auto;
      readyError.errorTime = time;
    }
    return readyError;
  }, [errors]);
  const onClose = useCallback(() => {
    if (errorId) {
      dispatch(removeError(errorId));
    }
  }, [errorId, dispatch]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (errorAuto && errorTime) {
      timer = setTimeout(onClose, errorTime);
    }
    return () => clearTimeout(timer);
  }, [errorId, errorAuto, errorTime, onClose]);
  return errorId ? (
    <Modal>
      <ModalItem
        contentBody={extractFormatMessage({ id: errorMessage, formatMessage })}
        onClose={onClose}
        status={errorStatus}
      />
    </Modal>
  ) : null;
};

export default ModalContainer;
