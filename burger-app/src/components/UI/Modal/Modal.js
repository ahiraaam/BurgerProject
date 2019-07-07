import React , {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'
class Modal extends Component {
    //Podria ser un functional component
    //Nos aseguramos que solo haga re-render si hay un cambio en el estado
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show; 
    }
    componentWillUpdate(){
        console.log("Modal will update");
        
    }
    render(){
        return(
            <React.Fragment>
                <Backdrop show={this.props.show}
                clicked={this.props.modalClose}></Backdrop>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' :'0',
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}
export default Modal;