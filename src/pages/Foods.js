import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Foods extends React.Component {
  render() {
    return (
      <div>
        <Header title="Foods" showIcon="true" />
        <Footer />
      </div>
    );
  }
}
