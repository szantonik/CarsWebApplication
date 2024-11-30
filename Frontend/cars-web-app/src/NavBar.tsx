import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

function NavBar() {
  return (
    <Menu>
      <Container className="flex-no-wrap relative top-0 flex w-full bg-background-100 py-1">
        {/* Home */}
        <Menu.Item as={NavLink} to="/" header className="mx-auto">
        <Button
            content="Home"
            size="large"
            className="btn btn-navbar font-bold"
          />
        </Menu.Item>

        {/* All Cars */}
        <Menu.Item as={NavLink} to="/cars" className="mx-auto">
          <Button
            content="All cars"
            size="large"
            className="btn btn-navbar font-bold"
          />
        </Menu.Item>

        {/* Add Car */}
        <Menu.Item as={NavLink} to="/edit/new" className="mx-auto">
          <Button
            content="Add car"
            size="large"
            className="btn btn-navbar font-bold"
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar