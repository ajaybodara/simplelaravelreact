import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from './reducers'
import PostsIndex from './components/post_index'
import PostsNew from './components/post_new'
import PostsShow from './components/post_show'


import registerServiceWorker from './registerServiceWorker';


//import './css/bootstrap.min.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/posts/new" component={PostsNew}/>
                <Route path="/posts/:id" component={PostsShow} />
                <Route path="/" component={PostsIndex}/>                
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();
