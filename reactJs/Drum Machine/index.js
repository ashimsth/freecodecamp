const sounds = [
  {
    key: "Q",
    title: "Heater-1",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "W",
    title: "Heater-2",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "E",
    title: "Heater-3",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "A",
    title: "Heater-4_1",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "S",
    title: "Heater-6",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "D",
    title: "Dsc_Oh",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    title: "Kick_n_Ha",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    title: "RP4_KICK_1",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    title: "Cev_H2",
    mp3: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
  }

  playSound(key) {
    const sound = sounds.find((sound) => sound.key === key);
    const audioElement = document.getElementById(key);
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementById("display").innerText = sound.key;
  }

  render() {
    return (
      <div className="container" id="drum-machine">
        <div id="display"></div>
        <div className="row" id="drum-pads">
          {sounds.map((sound) => (
            <div
              className="col-4 align-middle text-center drum-pad"
              id={sound.title}
              key={sound.key}
              onClick={() => this.playSound(sound.key)}
            >
              {sound.key}
              <audio src={sound.mp3} className="clip" id={sound.key}></audio>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DrumMachine />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
