import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignUp, Login, Chats, Chat } from './routers';


const App = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signUp" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/chats" component={Chats} />
                <Route path="/chat/:id" component={Chat} />
            </Switch>
        </BrowserRouter>
    );
}


export default App;
