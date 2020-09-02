import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import seedColors from './assets/seedColors';
import { generatePalette } from './helpers/colorHelpers';

import Palette from './components/DefaultPalette/Palette';
import SingleColorPalette from './components/DefaultPalette/SingleColorPalette';
import PaletteList from './components/PaletteList/PaletteList';
import NewPaletteForm from './components/CustomPalette/NewPaletteForm';
import Page from './components/Page';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './styles/Page.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes')) || seedColors;

    this.state = {
      palettes: savedPalettes
    }
  }

  findPalette(paletteId) {
    return this.state.palettes.find(palette => palette.id === paletteId);
  }

  savePalette = newPalette => {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }

  deletePalette = paletteId => {
    this.setState(prevState => ({ palettes: prevState.palettes.filter(palette => palette.id !== paletteId) }), this.syncLocalStorage);

  }

  syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }

  render() {

    const { palettes } = this.state;

    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500} classNames="page">
            <Switch location={location}>
              <Route exact path="/" render={(routeProps) =>
                <Page >
                  <PaletteList palettes={palettes} deletePalette={this.deletePalette} {...routeProps} />
                </Page>
              } />
              <Route exact path="/palette/new" render={
                (routeProps) =>
                  <Page >
                    <NewPaletteForm
                      {...routeProps}
                      savePalette={this.savePalette}
                      palettes={palettes}
                    />
                  </Page>
              } />
              <Route exact path="/palette/:id"
                render={routeProps => (
                  <Page >
                    <Palette palette={
                      generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )} />
                  </Page>
                )} />
              <Route exact path="/palette/:paletteId/:colorId" render={routeProps => (
                <Page transition="page">
                  <SingleColorPalette
                    colorId={routeProps.match.params.colorId}
                    palette={
                      generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )} />
                </Page>
              )} />
              <Route render={(routeProps) =>
                <Page >
                  <PaletteList palettes={palettes} deletePalette={this.deletePalette} {...routeProps} />
                </Page>
              } />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    )
  }
}
