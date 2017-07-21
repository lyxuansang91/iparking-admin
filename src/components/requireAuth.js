import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

export default function (ComposeComponent) {

    class Authenticate extends Component {

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this
                    .context
                    .router
                    .push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this
                    .context
                    .router
                    .push('/login');
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
            return (<ComposedComponent {...this.props}/>);
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired
    }

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {isAuthenticated: state.auth.isAuthenticated};
    }

    return connect(mapStateToProps, {})(Authenticate);
}