import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Foods extends React.Component {
  render() {
    return (
      <div>
        <Header title="Foods" showIcon="true" { ...this.props } />
        <Footer />
      </div>
    );
  }
}

export default connect()(Foods);
