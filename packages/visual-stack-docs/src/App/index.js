import React, { Component } from 'react';
import './styles.css';
import { Button } from '@cjdev/visual-stack/lib/components/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Visual Stack Docs</Button>
      </div>
    );
  }
}

export default App;
