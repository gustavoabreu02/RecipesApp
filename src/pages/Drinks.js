import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Drinks extends React.Component {
  render() {
    return (
      <div>
        <Header title="Drinks" showIcon="true" />
        <Footer />
      </div>
    );
  }
}
