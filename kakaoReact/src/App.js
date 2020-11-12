import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignUp, Login, Chats } from './routers';


const App = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signUp" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/chats" component={Chats} />
            </Switch>
        </BrowserRouter>
    );
}


export default App;
