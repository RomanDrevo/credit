import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useStrict } from 'mobx';
import 'basscss/css/basscss-cp.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-rtl/dist/css/bootstrap-rtl.css';
import 'react-id-swiper/src/styles/scss/swiper.scss'
import 'muicss/dist/css/mui-noglobals-rtl.css';
import 'react-datepicker/dist/datepicker.css';
import './styles/index.scss';



import App from './components/App';
import bootstrapper from './bootstrapper';

registerServiceWorker();

useStrict(true);

const injectables = bootstrapper();

const render = AppComponent => {
    ReactDOM.render(
        <Router>
            <Provider {...injectables}>
                <AppComponent/>
            </Provider>
        </Router>,
        document.getElementById('root')
    );
};

render(App);

// This is a workaround to HMR support because babel-plugin-dva-hmr is not available with create-react-app
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}
