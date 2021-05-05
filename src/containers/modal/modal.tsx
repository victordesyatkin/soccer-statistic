import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../../components/modal';
import ModalItem from '../../components/modal-item';
import { removeError } from '../../modules/actions';
import { ReducerProps, ItemsErrorProps } from '../../modules/types';

const ModalContainer: FC = () => {
  const errors = useSelector<ReducerProps, ItemsErrorProps>(
    (state) => state.common.errors
  );
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
      readyError.errorAuto = true;
      readyError.errorTime = 3000;
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
        contentBody={errorMessage}
        onClose={onClose}
        status={errorStatus}
      />
    </Modal>
  ) : null;
};

export default ModalContainer;
