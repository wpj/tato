import React, { FC } from 'react';
import MainLayout from '../components/layouts/main';
import { Box, Button, Heading, Stack, Text } from '../ds';

async function clearCacheStorage() {
  if (!('caches' in window)) {
    return;
  }

  let caches = await window.caches.keys();

  return Promise.all(
    caches.map((cacheName) => {
      return window.caches.delete(cacheName);
    }),
  );
}

async function removeServiceWorker() {
  if (!('serviceWorker' in window.navigator)) {
    return;
  }

  let registrations = await window.navigator.serviceWorker.getRegistrations();

  return Promise.all(
    registrations.map((registration) => {
      console.log('Removing service worker registration:', registration);
      return registration.unregister();
    }),
  );
}

async function forceRefresh() {
  await Promise.all([removeServiceWorker(), clearCacheStorage()]);

  window.location.reload();
}

const Card: FC<{ title: string }> = ({ title, children }) => {
  return (
    <Box
      px={['medium', 'large']}
      py={['medium', 'large']}
      backgroundColor="lightgray"
      borderRadius="large"
    >
      <Box mb="medium">
        <Heading level="3">{title}</Heading>
      </Box>

      {children}
    </Box>
  );
};

function ForceRefresh() {
  function onClick() {
    forceRefresh();
  }

  return (
    <Card title="Force Refresh">
      <Box
        display={['block', 'flex']}
        justifyContent="spaceBetween"
        alignItems="center"
      >
        <Box>
          <Text as="p">
            Clears out offline storage and reloads a fresh copy of the site.
          </Text>
        </Box>

        <Box>
          <Button onClick={onClick}>Force refresh</Button>
        </Box>
      </Box>
    </Card>
  );
}

function SiteInfo({
  commit,
  themeVersion,
}: {
  commit: string;
  themeVersion: string;
}) {
  return (
    <Card title="Site Info">
      <Text as="p">Commit: {commit}</Text>

      <Text as="p">Theme version: {themeVersion}</Text>
    </Card>
  );
}

const SettingsPage: FC<{
  commit: string;
  siteTitle: string;
  themeVersion: string;
}> = ({ commit, siteTitle, themeVersion }) => {
  const pageTitle = `${siteTitle} | Settings`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Box my={['medium', 'large']}>
        <Heading level="1">Settings</Heading>
      </Box>
      <Stack space="medium">
        <SiteInfo commit={commit} themeVersion={themeVersion} />
        <ForceRefresh />
      </Stack>
    </MainLayout>
  );
};

export default SettingsPage;
