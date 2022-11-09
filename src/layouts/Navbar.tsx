import { Navbar, Text, Avatar, Dropdown, Input } from '@nextui-org/react';
import { Logo } from 'components/Logo';
import Link from 'next/link';

import DarkModeSwitch from 'components/DarkModeSwitch';

const MainNavbar: React.FC = () => {
  const collapseItems = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'About',
      href: '/about'
    }
  ];
  return (
    <Navbar variant="sticky">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          '@xs': {
            w: '12%'
          }
        }}
      >
        <Logo />
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end'
          }
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <DarkModeSwitch />
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
              <Text b color="inherit" css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: 'flex' }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item.title}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? '$error' : ''
            }}
            isActive={index === 2}
          >
            <Link color="inherit" href={item.href}>
              {item.title}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;