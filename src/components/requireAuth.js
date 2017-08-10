import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import {loginUser, saveCreds} from '../actions/auth'

export default function (ComposeComponent) {

    class Authenticate extends Component {

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this
                    .props
                    .history
                    .push('/login');
            } else {
                this
                    .props
                    .setToken(localStorage.getItem('accessToken'))
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this
                    .props
                    .history
                    .push('/login');
            } else {
                this
                    .props
                    .setToken(localStorage.getItem('accessToken'))
            }
        }

        render() {
            if (!this.props.isAuthenticated) {
                return (
                    <div>
                        Redirect to login page....
                    </div>
                );
            }
            return (<ComposeComponent {...this.props}/>);
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired
    }

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => {
        return {isAuthenticated: state.auth.isAuthenticated, accessToken: state.auth.accessToken};
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            setToken: (token) => dispatch(saveCreds(token))
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}