import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { openModal } from '../../store/entities/modals/modalsSlice';
import { switchChannel } from '../../store/entities/channels/channelsSlice';

const Channel = ({ channel, currentChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <li className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            onClick={() => dispatch(switchChannel(channel.id))}
            variant={channel.id === currentChannel ? 'secondary' : 'light'}
            className="w-100 rounded-0 text-start text-truncate"
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            split
            className="flex-grow-0"
            variant={channel.id === currentChannel ? 'secondary' : 'light'}
          >
            <span className="visually-hidden">{t('modals.channelControl')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => dispatch(openModal({ type: 'remove', target: channel.id }))}
            >
              {t('modals.remove')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(openModal({ type: 'rename', target: channel.id }))}
            >
              {t('modals.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          onClick={() => dispatch(switchChannel(channel.id))}
          variant={channel.id === currentChannel ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
