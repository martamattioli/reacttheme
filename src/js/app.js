//Require SASS
import '../scss/main.scss';

//Require CSS
import '../../style.css';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return(
      <div>
        <main>
          <h1>Hello world</h1>
        </main>
      </div>
    );
  }
}

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
