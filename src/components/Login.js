import React, { Component } from 'react'
import '../assets/css/login.css'
import { connect } from 'react-redux';
import { loginUser, saveCreds } from '../actions/auth'
import { browserHistory } from 'react-router';
class Login extends Component {
    constructor(props) {
        super(props)
        this.onSubmitForm = this
            .onSubmitForm
            .bind(this)
    }

    onSubmitForm(e) {
        e.preventDefault()
        const creds = {
            'username': this.refs.username.value,
            'password': this.refs.password.value
        }
        this
            .props
            .handleLogin(creds)
    }

    render() {
        if (this.props.isAuthenticated) {
            this
                .props
                .setToken(localStorage.getItem('accessToken'))
            window.location.replace('/')
            // this.props.history.push('/');
        }
        return (
            <div className="login">
                <div className="logo">
                    <a href="#">
                        <img
                            src={process.env.PUBLIC_URL + '/assets/admin/layout/img/logo_iparking.png'}
                            alt="logo"
                            className="logo-default" />
                    </a>
                </div>
                <div className="content">
                    <form
                        className="login-form"
                        action="#"
                        method="post"
                        style={{
                            textAlign: 'center'
                        }}
                        onSubmit={this.onSubmitForm}>
                        <h3 className="form-title">Trung tâm dữ liệu iParking</h3>
                        <div className="alert alert-danger display-hide">
                            <button className="close" data-close="alert"></button>
                            <span>
                                Nhập tài khoản và mật khẩu
                            </span>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Tài khoản</label>
                            <div className="input-icon">
                                <i className="fa fa-user"></i>
                                <input
                                    className="form-control placeholder-no-fix"
                                    type="text"
                                    ref="username"
                                    autocomplete="off"
                                    placeholder="Username"
                                    name="username" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Mật khẩu</label>
                            <div className="input-icon">
                                <i className="fa fa-lock"></i>
                                <input
                                    className="form-control placeholder-no-fix"
                                    type="password"
                                    ref="password"
                                    autocomplete="off"
                                    placeholder="Password"
                                    name="password" />
                            </div>
                        </div>

                        <div className="form-actions">

                            <div className="clearfix">
                                <button type="submit" className="btn green-haze">
                                    Đăng nhập
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

                {/*END LOGIN*/}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isAuthenticated: state.auth.isAuthenticated, accessToken: state.auth.accessToken }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (creds) => dispatch((loginUser(creds))),
        setToken: (token) => dispatch(saveCreds(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
