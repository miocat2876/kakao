import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { SignUp, Login, Chats, Chat, Modal } from './routers';


const App = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signUp" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/chats" component={Chats} />
                <Route path="/chat/:id" component={Chat} />
                <Route path="/modal" component={Modal} />
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
