import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

function NavBar() {
  return (
    <Menu>
      <Container className="flex-no-wrap fixed relative top-0 flex w-full bg-[#FBFBFB] py-1 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-2">
        {/* Home */}
        <Menu.Item as={NavLink} to="/" header className="mx-1">
        <Button
            content="Home"
            size="large"
            className="rounded-[10px] h-[50px] bg-gray-900 rounded-lg text-white w-[100px]"
          />
        </Menu.Item>

        {/* All Cars */}
        <Menu.Item as={NavLink} to="/cars" className="mx-1">
          <Button
            content="All cars"
            size="large"
            className="rounded-[10px] h-[50px] bg-gray-900 rounded-lg text-white w-[100px]"
          />
        </Menu.Item>

        {/* Add Car */}
        <Menu.Item as={NavLink} to="/edit/new" className="mx-1">
          <Button
            content="Add car"
            size="large"
            className="rounded-[10px] h-[50px] bg-gray-900 rounded-lg text-white w-[100px]"
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar