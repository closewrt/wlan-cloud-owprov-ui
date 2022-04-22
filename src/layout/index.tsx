import React, { Suspense } from 'react';
import { Flex, Portal, Spinner, useBoolean, useBreakpoint } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import routes from 'router/routes';
import CreateRootModal from 'components/Modals/Entity/CreateRootModal';
import { Route as RouteProps } from 'models/Routes';
import MainPanel from './MainPanel';
import Navbar from './Navbar';
import PanelContent from './Containers/PanelContent';
import PanelContainer from './Containers/PanelContainer';
import Sidebar from './Sidebar';

const Layout = () => {
  const breakpoint = useBreakpoint('xl');
  const [isSidebarOpen, { toggle: toggleSidebar }] = useBoolean(breakpoint !== 'base' && breakpoint !== 'sm');
  document.documentElement.dir = 'ltr';

  const getRoutes = (r: RouteProps[]) =>
    // @ts-ignore
    r.map((route: RouteProps) => <Route path={route.path} element={<route.component />} key={uuid()} />);

  return (
    <>
      <Sidebar routes={routes} isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <Portal>
        <Navbar secondary={false} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </Portal>
      <MainPanel
        w={{
          base: '100%',
          sm: isSidebarOpen ? 'calc(100% - 220px)' : '100%',
          md: isSidebarOpen ? 'calc(100% - 220px)' : '100%',
        }}
      >
        <CreateRootModal />
        <PanelContent>
          <PanelContainer>
            <Suspense
              fallback={
                <Flex flexDirection="column" pt="75px">
                  <Spinner />
                </Flex>
              }
            >
              <Routes>{getRoutes(routes as RouteProps[])}</Routes>
            </Suspense>
          </PanelContainer>
        </PanelContent>
      </MainPanel>
    </>
  );
};

export default Layout;
