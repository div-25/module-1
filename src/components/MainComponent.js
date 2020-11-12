import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Module1 from './Module1';
import Module2 from './Module2';
import Module3 from './Module3';

const Main = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const module_1_name = "Credit Points Policy",
        module_2_name = "Set Department",
        module_3_name = "Credit Points Master";
    return (
        <div>
            <div>
                <Navbar dark color="primary">
                    <NavbarBrand href="/">Course Offering</NavbarBrand>
                    <NavbarToggler onClick={toggle} expand="md"/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">{module_1_name}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/module2">{module_2_name}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/module3">{module_3_name}</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <div>
            <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Module1}/>
                            <Route path="/module2" component={Module2}/>
                           <Route path="/module3" component={Module3}/>
                        </Switch>
                    </BrowserRouter>   
            </div>
        </div>
    );
}

export default Main;