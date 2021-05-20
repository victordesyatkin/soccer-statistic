import React, { FC, useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import upperFirst from 'lodash.upperfirst';

import SelectField from '../select-field';
import { WithStatisticServiceProps } from '../../modules/types';
import { extractFormatMessage } from '../../helpers';
import { withStatisticService } from '../hoc-helpers';

const SwitcherServiceWrapper = styled.article`
  width: 100%;
`;

const SwitcherService: FC<WithStatisticServiceProps> = ({
  serviceStatisticName,
  selectServiceStatisticName,
}) => {
  const { formatMessage } = useIntl();
  const clients = useMemo(
    () => [
      {
        id: 'axios',
        value: 'axios',
        content: upperFirst(
          extractFormatMessage({ id: 'axios', formatMessage })
        ),
      },
      {
        id: 'fetch',
        value: 'fetch',
        content: upperFirst(
          extractFormatMessage({ id: 'fetch', formatMessage })
        ),
      },
    ],
    [formatMessage]
  );
  const onChangeSelectField = useCallback(
    (value?: string[]) => {
      if (selectServiceStatisticName && value?.length) {
        const [name] = value;
        selectServiceStatisticName(name);
      }
    },
    [selectServiceStatisticName]
  );
  const memorizedSelectField = useMemo(
    () => ({
      label: undefined,
      placeholder: upperFirst(
        extractFormatMessage({ id: 'please_select_service', formatMessage })
      ),
      options: clients,
      isMultiple: false,
      withControl: false,
      value: serviceStatisticName,
      onChange: onChangeSelectField,
      theme: 'small',
      isManagement: true,
    }),
    [serviceStatisticName, clients, formatMessage, onChangeSelectField]
  );
  return (
    <SwitcherServiceWrapper>
      <SelectField {...memorizedSelectField} />
    </SwitcherServiceWrapper>
  );
};

export default withStatisticService<WithStatisticServiceProps>()(
  SwitcherService
);
