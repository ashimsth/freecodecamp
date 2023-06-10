class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      userInput: event.target.value,
    });
  }

  render() {
    return (
      <div id="body">
        <textArea
          rows="6"
          cols="4"
          id="editor"
          onChange={this.handleChange}
          value={this.state.userInput}
        />
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(this.state.userInput),
          }}
        ></div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MarkdownPreviewer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
