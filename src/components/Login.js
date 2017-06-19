import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => (
    <div className="create-account">
        <p>
            <Link to="/" id="register-btn" className="uppercase btn btn-success">Login</Link>
        </p>
    </div>
)

export default Login