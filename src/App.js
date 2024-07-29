import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Toast from './Toast'; // Import the Toast component
import axios from 'axios';

const leagueId = '26320'; // Replace with your actual league ID

const Home = () => {
  const [standings, setStandings] = React.useState([]);
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    const fetchStandings = async () => {
      const options = {
        method: 'GET',
        url: `https://corsproxy.io/?https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`,
        headers: {},
      };

      try {
        const response = await axios.request(options);
        setStandings(response.data.standings.results);
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    const fetchRegisteredPlayers = async () => {
      const options = {
        method: 'GET',
        url: `https://corsproxy.io/?https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`,
        headers: {},
      };

      try {
        const response = await axios.request(options);
        setPlayers(response.data.new_entries.results); // Set the registered players
      } catch (error) {
        console.error('Error fetching registered players:', error);
      }
    };

    fetchStandings();
    fetchRegisteredPlayers();
  }, []);

  return (
    <main>
      <section>
        <h2>League Standings</h2>
        {standings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => (
                <tr key={standing.entry}>
                  <td>{index + 1}</td>
                  <td>{standing.entry_name}</td>
                  <td>{standing.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No standings available.</p>
        )}
      </section>

      <section>
        <h2>Registered Players</h2>
        {players.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Entry ID</th>
                <th>Player Name</th>
                <th>Joined Time</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.entry}>
                  <td>{player.entry}</td>
                  <td>{`${player.player_first_name} ${player.player_last_name}`}</td>
                  <td>{new Date(player.joined_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No players registered yet.</p>
        )}
      </section>
    </main>
  );
};

const teamMapping = {
  1: 'Arsenal',
  2: 'Aston Villa',
  3: 'Bournemouth',
  4: 'Brentford',
  5: 'Brighton',
  6: 'Chelsea',
  7: 'Crystal Palace',
  8: 'Everton',
  9: 'Fulham',
  10: 'Ipswich Town',
  11: 'Leicester City',
  12: 'Liverpool',
  13: 'Manchester Utd',
  14: 'Man. City',
  15: 'Newcastle',
  16: 'Nottingham',
  17: 'Southampton',
  18: 'Tottenham',
  19: 'West Ham',
  20: 'Wolves',
};

const Tools = () => {
  const [fixtures, setFixtures] = React.useState([]);
  const [topPlayers, setTopPlayers] = React.useState([]);
  const [sortConfig, setSortConfig] = React.useState({ key: 'web_name', direction: 'ascending' });

  React.useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const fixturesResponse = await axios.get('https://corsproxy.io/?https://fantasy.premierleague.com/api/fixtures/', {
          headers: {},
        });
        setFixtures(fixturesResponse.data);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    };

    const fetchTopPlayers = async () => {
      try {
        const playersResponse = await axios.get('https://corsproxy.io/?https://fantasy.premierleague.com/api/bootstrap-static/', {
          headers: {},
        });
        const players = playersResponse.data.elements;
        const topPlayers = players
          .sort((a, b) => b.selected_by_percent - a.selected_by_percent)
          .slice(0, 15);
        setTopPlayers(topPlayers);
      } catch (error) {
        console.error('Error fetching top players:', error);
      }
    };

    fetchFixtures();
    fetchTopPlayers();
  }, []);

  const sortedPlayers = [...topPlayers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const sortedFixtures = [...fixtures].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h2>Top 15 Owned Players</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('web_name')}>Name</th>
            <th onClick={() => handleSort('team')}>Team</th>
            <th onClick={() => handleSort('selected_by_percent')}>Selected By %</th>
            <th onClick={() => handleSort('total_points')}>Points</th>
            <th onClick={() => handleSort('now_cost')}>Cost</th>
            <th onClick={() => handleSort('pointsPerCost')}>Points per Cost</th> {/* New header */}
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map(player => (
            <tr key={player.id}>
              <td>{player.web_name}</td>
              <td>{teamMapping[player.team]}</td>
              <td>{player.selected_by_percent}</td>
              <td>{player.total_points}</td>
              <td>{player.now_cost / 10}</td>
              <td>{(player.total_points / (player.now_cost / 10))}</td> {/* New column */}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin: '40px 0' }} /> {/* Gap between sections */}

      <h2>Fixture Tracker</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('event')}>Gameweek</th>
            <th onClick={() => handleSort('team_h')}>Home Team</th>
            <th onClick={() => handleSort('team_a')}>Away Team</th>
            <th onClick={() => handleSort('team_h_difficulty')}>Home Team FDR</th>
            <th onClick={() => handleSort('team_a_difficulty')}>Away Team FDR</th>
          </tr>
        </thead>
        <tbody>
          {sortedFixtures.map(fixture => (
            <tr key={fixture.id}>
              <td>{fixture.event}</td>
              <td>{teamMapping[fixture.team_h]}</td>
              <td>{teamMapping[fixture.team_a]}</td>
              <td>{fixture.team_h_difficulty}</td>
              <td>{fixture.team_a_difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  return (
    <Router basename="/fantasypremierleaguedashboard">
      <div className="App">
        <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="FPL Champions Logo" className="App-logo" />
          <h1>FPL Champions</h1>
        </header>
        <nav className="Navbar">
          <Link to="/">Home</Link>
          <Link to="/tools">Tools</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
          </Routes>
        </main>
        <footer className="Footer">
          Developed by Ammar Iskandar using React
        </footer>
        <Toast />
      </div>
    </Router>
  );
}

export default App;
