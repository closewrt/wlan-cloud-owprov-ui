import React from 'react';
import { Box, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { WebSocketNotification } from '../../../../models/WebSocket';

interface Props {
  notification: WebSocketNotification;
}

const DeviceUpgradeNotificationContent: React.FC<Props> = ({ notification }) => {
  const { t } = useTranslation();

  return (
    <>
      <Heading size="sm">
        {t('inventory.successful_upgrades', {
          count: notification?.content?.success?.length ?? 0,
        })}
      </Heading>
      {notification?.content?.success && (
        <Box maxH="200px" overflowY="auto">
          <UnorderedList>
            {notification?.content?.success.map((serialNumber) => (
              <ListItem key={uuid()}>{serialNumber}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
      <Heading size="sm" mt={4}>
        {t('inventory.warning_upgrades', { count: notification?.content?.warning?.length ?? 0 })}
      </Heading>
      {notification?.content?.warning && (
        <Box maxH="200px" overflowY="auto">
          <UnorderedList maxH="200px" overflowY="auto">
            {notification?.content?.warning.map((serialNumber) => (
              <ListItem key={uuid()}>{serialNumber}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
      <Heading size="sm" mt={4}>
        {t('inventory.error_upgrades', { count: notification?.content?.error?.length ?? 0 })}
      </Heading>
      {notification?.content?.error && (
        <Box maxH="200px" overflowY="auto">
          <UnorderedList maxH="200px" overflowY="auto">
            {notification?.content?.error.map((serialNumber) => (
              <ListItem key={uuid()}>{serialNumber}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
    </>
  );
};

export default DeviceUpgradeNotificationContent;
