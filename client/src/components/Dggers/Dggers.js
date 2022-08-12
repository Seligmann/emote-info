import React from "react";

export const Dggers = (props) => (
  <table style={{width: "300px"}}>

    <style>{`
    table {
      border-collapse: collapse;
      margin-left: auto;
      margin-right: auto;
    }
    thead {
      background-color: #333;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 2%;
    }
    tbody tr:nth-child(odd) {
      background-color: #505050;
    }
    
    tbody tr:nth-child(even) {
      background-color: #5c5c5c;
    }
    `}</style> 

    <thead>
      <tr>
        <th>Emotes</th>
        <th>Count</th>
      </tr>
    </thead>

    <tbody style={{ textAlign: "center" }}>
      {props.users?.length > 0 ? (
        Object.keys(props.users).map((key, i) => (
          <tr>
            <td>
              <img src={props.users[key].emote_image}></img>
            </td>
            <td>{props.users[key].emote}</td>
            <td>{props.users[key].uses}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td style={{ textAlign: "center" }} colSpan={6}>
            Please search for a user, or wait for the profile searched to
            load...
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
