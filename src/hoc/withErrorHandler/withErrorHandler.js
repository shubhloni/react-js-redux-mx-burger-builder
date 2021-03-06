import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxz from '../Auxz/Auxz';

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component {

        state = {
            error: null
        };

        constructor(){
            super();
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                console.log('Test', error);
                this.setState({error: error});
            })
        }

        componentWillUnmount(){
            // console.log("Will Unmount", this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }
            
        render(){
            return (
                <Auxz>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxz>
            );
        }
    }
}

export default withErrorHandler;