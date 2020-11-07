import React, { Component } from 'react';
import SignUp from './SignUp';


class App extends Component {
    
    handleCreate = (data) => {
        console.log(data);
    }

    render(){
        return(
            <div>
                <SignUp onCreate={this.handleCreate} />
            </div>
        );
    }
}


export default App;