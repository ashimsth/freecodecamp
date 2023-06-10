class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTime: 25 * 60,
      breakTime: 5 * 60,
      sessionTime: 25 * 60,
      timerOn: false,
      onBreak: false,
    };
  }

  playSound = () => {
    const breakSound = document.getElementById("beep");
    breakSound.currentTime = 0;
    breakSound.play();
  };

  formatTime = (time) => {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    return (
      (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs)
    );
  };

  changeTime = (amount, type) => {
    if (type === "break") {
      if (this.state.breakTime <= 60 && amount < 0) {
        return;
      }
      this.setState((prevState) => ({
        breakTime: prevState.breakTime + amount,
      }));
    } else {
      if (this.state.sessionTime <= 60 && amount < 0) {
        return;
      }
      this.setState((prevState) => ({
        sessionTime: prevState.sessionTime + amount,
        displayTime: prevState.sessionTime + amount,
      }));
    }
  };

  controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = this.state.onBreak;

    if (!this.state.timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          this.setState((prevState) => {
            if (prevState.displayTime <= 0 && !onBreakVariable) {
              this.playSound();
              onBreakVariable = true;
              return {
                displayTime: this.state.breakTime,
                onBreak: true,
              };
            } else if (prevState.displayTime <= 0 && onBreakVariable) {
              this.playSound();
              onBreakVariable = false;
              return {
                displayTime: this.state.sessionTime,
                onBreak: false,
              };
            } else {
              return {
                displayTime: prevState.displayTime - 1,
              };
            }
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

    if (this.state.timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    this.setState((prevState) => ({
      timerOn: !prevState.timerOn,
    }));
  };

  resetTime = () => {
    this.setState({
      displayTime: 25 * 60,
      breakTime: 5 * 60,
      sessionTime: 25 * 60,
    });
  };

  render() {
    const { displayTime, breakTime, sessionTime, timerOn, onBreak } =
      this.state;

    return (
      <div className="text-center">
        <h1>25 + 5 Clock</h1>
        <div className="dual-container">
          <Length
            title={"Break Length"}
            changeTime={this.changeTime}
            type={"break"}
            time={breakTime}
            formatTime={this.formatTime}
          />
          <Length
            title={"Session Length"}
            changeTime={this.changeTime}
            type={"session"}
            time={sessionTime}
            formatTime={this.formatTime}
          />
        </div>
        <h3 id="timer-label">{onBreak ? "Break" : "Session"}</h3>
        <h1 id="time-left">{this.formatTime(displayTime)}</h1>
        <audio src="sound.mp3" id="beep"></audio>
        <button
          className="btn btn-lg"
          onClick={this.controlTime}
          id="start_stop"
        >
          {timerOn ? (
            <i className="fa-solid fa-circle-pause"></i>
          ) : (
            <i className="fa-sharp fa-regular fa-circle-play"></i>
          )}
        </button>
        <button className="btn btn-lg" onClick={this.resetTime} id="reset">
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    );
  }
}

class Length extends React.Component {
  render() {
    const { title, changeTime, type, time, formatTime } = this.props;

    return (
      <div>
        <h3 id={type === "break" ? "break-label" : "session-label"}>{title}</h3>
        <div className="time-sets">
          <button
            type="button"
            className="btn btn-sm"
            id={type === "break" ? "break-decrement" : "session-decrement"}
            onClick={() => changeTime(-60, type)}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
          <h3 id={type === "break" ? "break-length" : "session-length"}>
            {formatTime(time)}
          </h3>
          <button
            type="button"
            className="btn btn-sm"
            id={type === "break" ? "break-increment" : "session-increment"}
            onClick={() => changeTime(60, type)}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
