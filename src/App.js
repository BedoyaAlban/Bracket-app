import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tournament, setTournament] = useState({
    tournamentName: "",
    startingDate: "",
    endingDate: "",
    numberOfTeams: 0
  });

  const HandleChangeTName = event => {
    setTournament({
      ...tournament,
      tournamentName: event.target.value
    });
  };

  const HandleChangeTSDate = event => {
    setTournament({
      ...tournament,
      startingDate: event.target.value
    });
  };

  const HandleChangeTEDate = event => {
    setTournament({
      ...tournament,
      endingDate: event.target.value
    });
  };

  const HandleChangeNumbTeams = event => {
    setTournament({
      ...tournament,
      numberOfTeams: event.target.value
    });
  };
  console.log(tournament);
  return (
    <div className="App">
      <div className="container">
        <h1>Create Bracket Tournament</h1>
        <form>
          <div className="form-group">
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Tournament-Name
                </span>
              </div>
              <input
                type="text"
                name="tournamentName"
                className="form-control"
                placeholder="Tournament-Name"
                aria-label="Tournament-Name"
                aria-describedby="basic-addon1"
                value={tournament.tournamentName}
                onChange={HandleChangeTName}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Starting-Date / Ending-Date
                </span>
              </div>
              <input
                type="date"
                name="startingDate"
                value={tournament.startingDate}
                onChange={HandleChangeTSDate}
                className="form-control"
                aria-label="startingDate"
                aria-describedby="basic-addon1"
              />
              <input
                type="date"
                className="form-control"
                name="endingDate"
                value={tournament.endingDate}
                onChange={HandleChangeTEDate}
                aria-label="endingDate"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Number of Teams
                </span>
              </div>
              <input
                type="number"
                name="numberOfTeams"
                value={tournament.numberOfTeams}
                onChange={HandleChangeNumbTeams}
                className="form-control"
                placeholder="Number-of-Teams"
                aria-label="Number-of-Teams"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
