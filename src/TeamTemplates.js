import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamTemplates = () => {
  const [playerDetails, setPlayerDetails] = useState({ template1: [], template2: [] });
  const [sortConfig, setSortConfig] = useState({ key: 'web_name', direction: 'ascending' });

  // Player names for each template
  const template1Names = [
    'Haaland', 'Isak', 'Muniz', 'Salah', 'Eze', 'Gordon',
    'Gibbs-White', 'Winks', 'Mykolenko', 'Muñoz', 'Gvardiol',
    'Harwood-Bellis', 'Konsa', 'Henderson', 'Turner'
  ];

  const template2Names = [
    'Alexander-Arnold', 'Mykolenko', 'Sels', 'Fabianski', 'Gvardiol',
    'Andersen', 'Armstrong', 'Hardwood-Bellis', 'Isak', 'Havertz',
    'Brennan', 'Foden', 'Gordon', 'Eze', 'Salah'
  ];

  const template3Names = [
    'Alexander-Arnold', 'Mykolenko', 'Sanchez', 'Bentley', 'Gabriel',
    'Andersen', 'João Pedro', 'Hardwood-Bellis', 'Isak', 'Haaland',
    'Brennan', 'Hudson-Odoi', 'Gordon', 'Eze', 'Saka'
  ];

  const template4Names = [
    'Shaw', 'Gvardiol', 'Muñoz', 'Turner', 'Verbruggen',
    'Konsa', 'Palmer', 'Hardwood-Bellis', 'Isak', 'Watkins',
    'Gibbs-White', 'Fernandes', 'Salah', 'Eze', 'Fraser'
  ];

  // Fetch player details from the API
  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get('https://corsproxy.io/?https://fantasy.premierleague.com/api/bootstrap-static/');
        const allPlayers = response.data.elements;

        const getPlayerDetails = (playerNames) => playerNames.map(name => {
          const player = name.toLowerCase() === 'gordon'
          ? allPlayers.find(p => p.id === 412) // Hardcode ID for Gordon
          : allPlayers.find(p => 
            p.first_name.toLowerCase() === name.toLowerCase() || 
            p.second_name.toLowerCase() === name.toLowerCase() || 
            p.web_name.toLowerCase() === name.toLowerCase()
        );

          if (player) {
            return {
              web_name: player.web_name,
              total_points: player.total_points,
              now_cost: player.now_cost / 10,
              pointsPerCost: (player.total_points / (player.now_cost / 10)).toFixed(2),
              goals_scored: player.goals_scored,
              assists: player.assists,
              clean_sheets: player.clean_sheets,
              goals_conceded: player.goals_conceded,
              bonus: player.bonus,
              selected_by_percent: player.selected_by_percent,
            };
          } else {
            console.log(`Player not found: ${name}`);
            return { 
              web_name: name, 
              total_points: 'N/A', 
              now_cost: 'N/A', 
              pointsPerCost: 'N/A', 
              goals_scored: 'N/A', 
              assists: 'N/A', 
              clean_sheets: 'N/A', 
              goals_conceded: 'N/A', 
              bonus: 'N/A', 
              selected_by_percent: 'N/A' 
            };
          }
        });

        setPlayerDetails({
          template1: getPlayerDetails(template1Names),
          template2: getPlayerDetails(template2Names),
          template3: getPlayerDetails(template3Names),
          template4: getPlayerDetails(template4Names),
        });
      } catch (error) {
        console.error("Error fetching player details:", error);
        setPlayerDetails({
          template1: template1Names.map(name => ({
            web_name: name, 
            total_points: 'N/A', 
            now_cost: 'N/A', 
            pointsPerCost: 'N/A', 
            goals_scored: 'N/A', 
            assists: 'N/A', 
            clean_sheets: 'N/A', 
            goals_conceded: 'N/A', 
            bonus: 'N/A', 
            selected_by_percent: 'N/A' 
          })),
          template2: template2Names.map(name => ({
            web_name: name, 
            total_points: 'N/A', 
            now_cost: 'N/A', 
            pointsPerCost: 'N/A', 
            goals_scored: 'N/A', 
            assists: 'N/A', 
            clean_sheets: 'N/A', 
            goals_conceded: 'N/A', 
            bonus: 'N/A', 
            selected_by_percent: 'N/A' 
          })),
          template3: template3Names.map(name => ({
            web_name: name, 
            total_points: 'N/A', 
            now_cost: 'N/A', 
            pointsPerCost: 'N/A', 
            goals_scored: 'N/A', 
            assists: 'N/A', 
            clean_sheets: 'N/A', 
            goals_conceded: 'N/A', 
            bonus: 'N/A', 
            selected_by_percent: 'N/A' 
          })),
          template4: template4Names.map(name => ({
            web_name: name, 
            total_points: 'N/A', 
            now_cost: 'N/A', 
            pointsPerCost: 'N/A', 
            goals_scored: 'N/A', 
            assists: 'N/A', 
            clean_sheets: 'N/A', 
            goals_conceded: 'N/A', 
            bonus: 'N/A', 
            selected_by_percent: 'N/A' 
          }))
        });
      }
    };

    fetchPlayerDetails();
  }, []);

  const sortedPlayers = (template) => {
    if (!playerDetails[template]) return [];

    return [...playerDetails[template]].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'ascending' ? 'asc' : 'desc';
    }
    return '';
  };

  return (
    <div className="teamtemplates-table">
      {/* Table 1: Template Name: Haaland + Salah */}
      <h2>Template Name: Haaland + Salah</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('web_name')} className={getClassNamesFor('web_name')}>Players</th>
            <th onClick={() => requestSort('total_points')} className={getClassNamesFor('total_points')}>Points</th>
            <th onClick={() => requestSort('now_cost')} className={getClassNamesFor('now_cost')}>Cost</th>
            <th onClick={() => requestSort('pointsPerCost')} className={getClassNamesFor('pointsPerCost')}>Points per Cost</th>
            <th onClick={() => requestSort('goals_scored')} className={getClassNamesFor('goals_scored')}>Goals Scored</th>
            <th onClick={() => requestSort('assists')} className={getClassNamesFor('assists')}>Assists</th>
            <th onClick={() => requestSort('clean_sheets')} className={getClassNamesFor('clean_sheets')}>Clean Sheets</th>
            <th onClick={() => requestSort('goals_conceded')} className={getClassNamesFor('goals_conceded')}>Goals Conceded</th>
            <th onClick={() => requestSort('bonus')} className={getClassNamesFor('bonus')}>Bonus</th>
            <th onClick={() => requestSort('selected_by_percent')} className={getClassNamesFor('selected_by_percent')}>Selected %</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers('template1').map(player => (
            <tr key={player.web_name}>
              <td>{player.web_name}</td>
              <td>{player.total_points}</td>
              <td>{player.now_cost}</td>
              <td>{player.pointsPerCost}</td>
              <td>{player.goals_scored}</td>
              <td>{player.assists}</td>
              <td>{player.clean_sheets}</td>
              <td>{player.goals_conceded}</td>
              <td>{player.bonus}</td>
              <td>{player.selected_by_percent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin: '40px 0' }} />

      {/* Table 2: Template Name: Big at The Back */}
      <h2>Template Name: Big at The Back</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('web_name')} className={getClassNamesFor('web_name')}>Players</th>
            <th onClick={() => requestSort('total_points')} className={getClassNamesFor('total_points')}>Points</th>
            <th onClick={() => requestSort('now_cost')} className={getClassNamesFor('now_cost')}>Cost</th>
            <th onClick={() => requestSort('pointsPerCost')} className={getClassNamesFor('pointsPerCost')}>Points per Cost</th>
            <th onClick={() => requestSort('goals_scored')} className={getClassNamesFor('goals_scored')}>Goals Scored</th>
            <th onClick={() => requestSort('assists')} className={getClassNamesFor('assists')}>Assists</th>
            <th onClick={() => requestSort('clean_sheets')} className={getClassNamesFor('clean_sheets')}>Clean Sheets</th>
            <th onClick={() => requestSort('goals_conceded')} className={getClassNamesFor('goals_conceded')}>Goals Conceded</th>
            <th onClick={() => requestSort('bonus')} className={getClassNamesFor('bonus')}>Bonus</th>
            <th onClick={() => requestSort('selected_by_percent')} className={getClassNamesFor('selected_by_percent')}>Selected %</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers('template2').map(player => (
            <tr key={player.web_name}>
              <td>{player.web_name}</td>
              <td>{player.total_points}</td>
              <td>{player.now_cost}</td>
              <td>{player.pointsPerCost}</td>
              <td>{player.goals_scored}</td>
              <td>{player.assists}</td>
              <td>{player.clean_sheets}</td>
              <td>{player.goals_conceded}</td>
              <td>{player.bonus}</td>
              <td>{player.selected_by_percent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin: '40px 0' }} />

      {/* Table 3: Template Name: No Salah */}
      <h2>Template Name: No Salah</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('web_name')} className={getClassNamesFor('web_name')}>Players</th>
            <th onClick={() => requestSort('total_points')} className={getClassNamesFor('total_points')}>Points</th>
            <th onClick={() => requestSort('now_cost')} className={getClassNamesFor('now_cost')}>Cost</th>
            <th onClick={() => requestSort('pointsPerCost')} className={getClassNamesFor('pointsPerCost')}>Points per Cost</th>
            <th onClick={() => requestSort('goals_scored')} className={getClassNamesFor('goals_scored')}>Goals Scored</th>
            <th onClick={() => requestSort('assists')} className={getClassNamesFor('assists')}>Assists</th>
            <th onClick={() => requestSort('clean_sheets')} className={getClassNamesFor('clean_sheets')}>Clean Sheets</th>
            <th onClick={() => requestSort('goals_conceded')} className={getClassNamesFor('goals_conceded')}>Goals Conceded</th>
            <th onClick={() => requestSort('bonus')} className={getClassNamesFor('bonus')}>Bonus</th>
            <th onClick={() => requestSort('selected_by_percent')} className={getClassNamesFor('selected_by_percent')}>Selected %</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers('template3').map(player => (
            <tr key={player.web_name}>
              <td>{player.web_name}</td>
              <td>{player.total_points}</td>
              <td>{player.now_cost}</td>
              <td>{player.pointsPerCost}</td>
              <td>{player.goals_scored}</td>
              <td>{player.assists}</td>
              <td>{player.clean_sheets}</td>
              <td>{player.goals_conceded}</td>
              <td>{player.bonus}</td>
              <td>{player.selected_by_percent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin: '40px 0' }} />

      {/* Table 4: Template Name: Palmer + Salah */}
      <h2>Template Name: Palmer + Salah</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('web_name')} className={getClassNamesFor('web_name')}>Players</th>
            <th onClick={() => requestSort('total_points')} className={getClassNamesFor('total_points')}>Points</th>
            <th onClick={() => requestSort('now_cost')} className={getClassNamesFor('now_cost')}>Cost</th>
            <th onClick={() => requestSort('pointsPerCost')} className={getClassNamesFor('pointsPerCost')}>Points per Cost</th>
            <th onClick={() => requestSort('goals_scored')} className={getClassNamesFor('goals_scored')}>Goals Scored</th>
            <th onClick={() => requestSort('assists')} className={getClassNamesFor('assists')}>Assists</th>
            <th onClick={() => requestSort('clean_sheets')} className={getClassNamesFor('clean_sheets')}>Clean Sheets</th>
            <th onClick={() => requestSort('goals_conceded')} className={getClassNamesFor('goals_conceded')}>Goals Conceded</th>
            <th onClick={() => requestSort('bonus')} className={getClassNamesFor('bonus')}>Bonus</th>
            <th onClick={() => requestSort('selected_by_percent')} className={getClassNamesFor('selected_by_percent')}>Selected %</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers('template4').map(player => (
            <tr key={player.web_name}>
              <td>{player.web_name}</td>
              <td>{player.total_points}</td>
              <td>{player.now_cost}</td>
              <td>{player.pointsPerCost}</td>
              <td>{player.goals_scored}</td>
              <td>{player.assists}</td>
              <td>{player.clean_sheets}</td>
              <td>{player.goals_conceded}</td>
              <td>{player.bonus}</td>
              <td>{player.selected_by_percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTemplates;
