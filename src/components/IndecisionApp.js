import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    this.setState(() => ({
      selectedOption: this.state.options[randomNum]
    }));
  };
  handlePickDelete = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  };
  handleAddOption = option => {
    if (!option) {
      return 'Enter Valid Value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This Option already exists';
    }
    this.setState(prevState => ({
      options: prevState.options.concat([option])
    }));
  };
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      console.log('Bad JSON Data');
    }
  }
  componentDidUpdate(preProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  render() {
    const title = 'indecision';
    const subtitle = 'by Nitin';
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handlePickDelete={this.handlePickDelete}
        />
      </div>
    );
  }
}
IndecisionApp.defaultProps = {
  options: []
};

export default IndecisionApp;
