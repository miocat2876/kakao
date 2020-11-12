import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignUp, Login } from './routers';


const App = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signUp" component={SignUp} />
                {/* <Route path="/login" component={Login} /> */}
            </Switch>
        </BrowserRouter>
    );
}


export default App;
