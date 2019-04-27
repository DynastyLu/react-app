/*
 * @Author: xuwei 
 * @Date: 2019-04-01 16:27:21 
 * @Last Modified by: xuwei
 * @Last Modified time: 2019-04-01 19:01:59
 */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {getSession} from "utils/session"
class RouteMap extends React.Component {
    render() {
        const { routes } = this.props;
        const token=getSession('token');
        	const defaultRoute = <Route key={1} exact path="/" component={() =>
                <Redirect to="/login" />
            } />
        return <Switch>
            {
                routes.length&&routes.map((item, index) => {
					const Comp = item.component;
					const childernRoute=<Route path={item.path} render={(apiRouter) => {
						document.title=item.title||"默认title";
						return <Comp routes={item.children} {...apiRouter}></Comp>
					}} key={index} />
					const redirect=<Redirect from='/home' to="/login" key={'noAccess'}/>
					return  !item.requireAuth?childernRoute:(token?childernRoute:redirect)
				}).concat([defaultRoute])
            }
        </Switch>
    }
}
export default RouteMap;