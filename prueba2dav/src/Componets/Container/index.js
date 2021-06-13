import { Nav } from "@fluentui/react";
import {Cliente} from '../../Containers/Clientes';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './container.css'
export const ContainerMain = () => {
    return (
        <div className="container">
            <Nav 
                selectedKey = "key3"
                ariaLabel="Nav basic example"
                styles={{
                    root:{
                        width: 210,
                        height: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid #eee',
                        overflow: 'auto'
                    }
                }}
                groups={[{
                    links: [{
                        name: 'Clientes',
                        url: '/client',
                        icon: 'UserFollowed',
                        key: 'clienteNav'
                    }]
                }]}
            />
            <Router>
                <Switch>
                    <Route exact path="/client" component={Cliente} />
                </Switch>
            </Router>
        </div>
    );
}