import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [standings, setStandings] = useState([]);
  const [players, setPlayers] = useState([]);
  const leagueId = '26320'; // League ID

  useEffect(() => {
    const fetchStandings = async () => {
      const options = {
        method: 'GET',
        url: `https://fantasy-premier-league-fpl-api.p.rapidapi.com/api/leagues-classic/${leagueId}/standings/`,
        headers: {
          'x-rapidapi-key': '0afa755117mshf85581579eb30c6p15ec1ejsn6368a0b6abc4',
          'x-rapidapi-host': 'fantasy-premier-league-fpl-api.p.rapidapi.com',
        },
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
        url: `https://fantasy-premier-league-fpl-api.p.rapidapi.com/api/leagues-classic/${leagueId}/standings/`,
        headers: {
          'x-rapidapi-key': '0afa755117mshf85581579eb30c6p15ec1ejsn6368a0b6abc4',
          'x-rapidapi-host': 'fantasy-premier-league-fpl-api.p.rapidapi.com',
        },
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
  }, [leagueId]);

  return (
    <div className="App">
      <header className="App-header">
        <img src="/4bb250b1-eb0a-423c-9d0c-2c38519de99b.jpeg" alt="FPL Logo" />
      </header>
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
    </div>
  );
}

export default App;
