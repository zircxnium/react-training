import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Home
            </NavLink>
            <NavLink exact to="/about" activeClassName="nav-active">
                About
            </NavLink>
        </div>
    );
};

export default Nav;