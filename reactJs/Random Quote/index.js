class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
    this.fetchQuote = this.fetchQuote.bind(this);
    this.handleNewQuote = this.handleNewQuote.bind(this);
    this.handleTweetQuote = this.handleTweetQuote.bind(this);
  }

  async fetchQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    this.setState({
      quote: data.content,
      author: data.author,
    });
  }

  componentDidMount() {
    this.fetchQuote();
  }

  handleNewQuote() {
    this.fetchQuote();
  }

  handleTweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${this.state.quote} - ${this.state.author}`
    )}`;
    window.open(tweetUrl, "_blank");
  }

  render() {
    return (
      <div id="quote-box">
        <p id="text">{this.state.quote}</p>
        <p id="author">~ {this.state.author}</p>
        <button id="new-quote" onClick={this.handleNewQuote}>
          New Quote
        </button>
        <a id="tweet-quote" href="#" onClick={this.handleTweetQuote}>
          Tweet Quote
        </a>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <QuoteMachine />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
