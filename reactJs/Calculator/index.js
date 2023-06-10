class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      answer: 0,
    };
  }

  display = (symbol) => {
    this.setState((prevState) => ({ formula: prevState.formula + symbol }));
    const { formula, answer } = this.state;
    if (formula[formula.length - 1] === "=") {
      if (/[0-9.]/.test(symbol)) {
        this.setState({ formula: symbol });
      } else {
        this.setState((prevState) => ({ formula: prevState.answer + symbol }));
      }
    }
  };

  calculate = () => {
    const { formula } = this.state;
    this.setState({ answer: eval(formula), formula: formula + "=" });
  };

  allClear = () => {
    this.setState({ formula: "", answer: 0 });
  };

  clear = () => {
    this.setState((prevState) => ({
      formula: prevState.formula.slice(0, prevState.formula.length - 1),
      answer: 0,
    }));
  };

  render() {
    const { formula, answer } = this.state;

    return (
      <div className="container">
        <div className="grid">
          <div className="display">
            <input type="text" value={formula} placeholder="0" disabled />
            <div className="total">{answer}</div>
          </div>
          <div onClick={this.allClear} className="button AC">
            AC
          </div>
          <div onClick={this.clear} className="button clear">
            C
          </div>
          <div onClick={() => this.display("/")} className="button divide">
            /
          </div>
          <div onClick={() => this.display("*")} className="button multiply">
            x
          </div>
          <div onClick={() => this.display("7")} className="button seven">
            7
          </div>
          <div onClick={() => this.display("8")} className="button eight">
            8
          </div>
          <div onClick={() => this.display("9")} className="button nine">
            9
          </div>
          <div onClick={() => this.display("-")} className="button minus">
            -
          </div>
          <div onClick={() => this.display("4")} className="button four">
            4
          </div>
          <div onClick={() => this.display("5")} className="button five">
            5
          </div>
          <div onClick={() => this.display("6")} className="button six">
            6
          </div>
          <div onClick={() => this.display("+")} className="button plus">
            +
          </div>
          <div onClick={() => this.display("1")} className="button one">
            1
          </div>
          <div onClick={() => this.display("2")} className="button two">
            2
          </div>
          <div onClick={() => this.display("3")} className="button three">
            3
          </div>
          <div onClick={this.calculate} className="button equals">
            =
          </div>
          <div onClick={() => this.display("0")} className="button zero">
            0
          </div>
          <div onClick={() => this.display(".")} className="button decimal">
            .
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
