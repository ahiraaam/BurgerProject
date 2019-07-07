import React, {Component} from 'react';
import Aux from '../Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component  {
    state={
        showSide: true,
        showSideDrawer:false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSide:false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) =>{
            return {showSide:!prevState.showSideDrawer}
        }) 
    }
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer closed = {this.sideDrawerClosedHandler} open={this.state.showSide} />
                <main className={classes.Content}>
                    {this.props.children}     
                </main>
             </Aux>
        )
    }
}

export default Layout;

