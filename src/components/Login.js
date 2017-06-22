import React from 'react'
import {Link} from 'react-router-dom'
import './login.css'

const Login = () => (
    <div className="login">
        {/*BEGIN LOGO*/}
        <div className="logo">
            <a href="#">
                <img
                    src={process.env.PUBLIC_URL + '/assets/admin/layout/img/logo_iparking.png'}
                    alt="logo"
                    className="logo-default"/>
            </a>
        </div>
        {/*END LOGO*/}
        {/*BEGIN LOGIN*/}
        <div className="content">
            <form className="login-form" action="#" method="post">
                <h3 className="form-title">Login to your account</h3>
                <div className="alert alert-danger display-hide">
                    <button className="close" data-close="alert"></button>
                    <span>
                        Enter any username and password.
                    </span>
                </div>
                <div className="form-group">
                    <label className="control-label visible-ie8 visible-ie9">Username</label>
                    <div className="input-icon">
                        <i className="fa fa-user"></i>
                        <input
                            className="form-control placeholder-no-fix"
                            type="text"
                            autocomplete="off"
                            placeholder="Username"
                            name="username"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label visible-ie8 visible-ie9">Password</label>
                    <div className="input-icon">
                        <i className="fa fa-lock"></i>
                        <input
                            className="form-control placeholder-no-fix"
                            type="password"
                            autocomplete="off"
                            placeholder="Password"
                            name="password"/>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="reset" className="btn green-haze pull-left">
                        Reset
                        <i className="m-icon-swapright m-icon-white"></i>
                    </button>

                    <button type="submit" className="btn green-haze pull-right">
                        Login
                        <i className="m-icon-swapright m-icon-white"></i>
                    </button>

                    <div className="clearfix"></div>
                </div>

            </form>
        </div>

        {/*END LOGIN*/}

    </div>
)

export default Login