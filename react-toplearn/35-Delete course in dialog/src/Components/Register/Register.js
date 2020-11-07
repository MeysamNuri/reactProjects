import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import context from '../../Context/Context';


const Register = () => {
 
    const register=useContext(context)

    const {
        fullname,
        email,
        password,
        policy,
        setEmail,
        setPassword,
        setPolicy,
        setFullname,
        handleRegister,
        validator
    }=register
   
    return ( 
        <>
        <Helmet>
            <title>عضویت در سایت</title>
        </Helmet>
          <main className="client-page">
            <div className="container-content">

                <header><h2> عضویت در سایت </h2></header>

                <div className="form-layer">

                    <form onSubmit={e =>handleRegister(e)}>

                        <div className="input-group">
                            <span className="input-group-addon" id="username"><i className="zmdi zmdi-account"></i></span>
                            <input type="text" 
                            name="fullname" 
                             value={fullname}
                             onChange={e=>{
                                setFullname(e.target.value)
                                validator.current.showMessageFor("fullname")
                             }} 
                             className="form-control" 
                             placeholder="نام و نام خانوادگی" 
                             aria-describedby="username"/>
                             {validator.current.message("fullname",fullname,"required|min:5")}
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="email-address"><i className="zmdi zmdi-email"></i></span>
                            <input type="text" 
                           
                            value={email}
                             onChange={e=>{
                                setEmail(e.target.value)
                                validator.current.showMessageFor("email")
                             }} 
                             name="email"
                             className="form-control" 
                             placeholder="ایمیل" 
                             aria-describedby="email-address"/>
                               {validator.current.message("email",email,"required|email")}
                        </div>
                        

                        <div className="input-group">
                            <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
                            <input
                             type="password"
                              value={password}
                               onChange={e=>{
                                setPassword(e.target.value)
                                validator.current.showMessageFor("password")
                               }
                               }
                                className="form-control" placeholder="رمز عبور " 
                               aria-describedby="password"
                                />
                           {validator.current.message("password",password,"required|password")}

                        </div>

                        <div className="accept-rules">
                            <label><input type="checkbox" 
                            name="policy" 
                            value={policy} 
                            onChange={e=>{setPolicy(e.currentTarget.checked)
                                validator.current.showMessageFor("policy")

                            }}
                            />  قوانین و مقررات سایت را میپذیرم </label>
                            {validator.current.message("policy",policy,"required")}

                        </div>

                        <div className="link">
                            <a href=""> <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !</a>
                            <a href=""> <i className="zmdi zmdi-account"></i> ورود به سایت </a>
                        </div>
                        
                        <button type="submit" className="btn btn-success"> عضویت در سایت </button>

                    </form>
                </div>

            </div>
        </main>

        </>
     );
}
 
export default Register;