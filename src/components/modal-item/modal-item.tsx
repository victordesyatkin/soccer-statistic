import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';

import { colors, sizes, Scrollbars } from '../../assets/theme';
import { extractFormatMessage, useOutsideClick } from '../../helpers';
import logo from './images/logo.png';

const ModalRoot = styled.div`
  background-color: ${rgba(colors.black, 0.5)};
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled(Scrollbars)<{ status?: string }>`
  display: flex;
  border-radius: 3px;
  background-color: ${colors.white};
  min-width: ${sizes.xxs};
  max-width: ${sizes.xxs};
  flex-direction: column;
  overflow: hidden;
  background-color: ${colors.white};

  @media (min-width: ${sizes.xs}) {
    max-width: ${sizes.xs};
  }
`;
const ModalHeader = styled.div<{ status?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${colors.lightgrey};
  padding: 0.5rem 1rem;
  min-width: 0;
  background-color: ${({ status }) => {
    switch (status) {
      case 'danger': {
        return colors.lightRed;
      }
      case 'info':
      default: {
        return 'initial';
      }
    }
  }};
`;
const ModalHeaderContent = styled.div<{ status?: string }>`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ status }) => {
    switch (status) {
      case 'danger':
      case 'info':
      default: {
        return undefined;
      }
    }
  }};
  &::first-letter {
    text-transform: uppercase;
  }
`;
const ModalHeaderButtonClose = styled.button`
  background: none;
  outline: none;
  box-shadow: none;
  border: none;
  padding: 0 0 0 0.5rem;
  cursor: pointer;
  color: inherit;
`;
const ModalBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 9rem;
  padding: 1rem;
  position: relative;
`;
const ModalImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  object-position: center center;
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0.1;
  transform: translate(-50%, -50%);
`;
const ModalContent = styled.span`
  &::first-letter {
    text-transform: uppercase;
  }
`;

const ModalItem: FC<{
  contentBody?: string | FC;
  contentHeader?: string | FC;
  status?: string;
  onClose?: () => void;
}> = ({ contentBody = '', contentHeader = '', status = 'info', onClose }) => {
  const { formatMessage } = useIntl();
  const modalRef = useRef(null);
  let readyContentHeader = contentHeader;
  if (!readyContentHeader || typeof readyContentHeader === 'string') {
    readyContentHeader = readyContentHeader?.trim();
    switch (status) {
      case 'danger': {
        readyContentHeader = extractFormatMessage({
          id: 'error',
          formatMessage,
        });
        break;
      }
      case 'info':
      default: {
        readyContentHeader = extractFormatMessage({
          id: 'info',
          formatMessage,
        });
      }
    }
  }
  useOutsideClick({ refs: [modalRef], isOpened: true, callback: onClose });
  return (
    <ModalRoot>
      <Modal ref={modalRef} status={status}>
        <ModalHeader status={status}>
          <ModalHeaderContent status={status}>
            {readyContentHeader}
          </ModalHeaderContent>
          <ModalHeaderButtonClose type="button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </ModalHeaderButtonClose>
        </ModalHeader>
        <ModalBody>
          <ModalImage src={logo} />
          <ModalContent>{contentBody}</ModalContent>
        </ModalBody>
      </Modal>
    </ModalRoot>
  );
};

export default ModalItem;
