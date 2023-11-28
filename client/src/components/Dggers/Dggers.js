import React from "react";
import styled, { keyframes } from "styled-components";
import prayge from "../../images/prayge.png";
import catJam from "../../images/catJam.gif";
import dankThink from "../../images/dankThink.png";

export const Dggers = (props) => {
  if (!props.searched) {
    return (
      <div style={{ paddingTop: 10 }}>
        <div>
          <img
            src={prayge}
            height="40"
            width="40"
            style={{
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>Search a user</div>
      </div>
    );
  } else if (props.loading) {
    return (
      <div style={{ paddingTop: 10 }}>
        <div>
          <img
            src={catJam}
            height="40"
            width="40"
            style={{
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>Searching...</div>
      </div>
    );
  } else if (props.userFound) {
    return (
      <table style={{ width: "300px", paddingTop: 10 }}>
        <thead>
          <tr>
            <th></th>
            <th>Emote</th>
            <th>Count</th>
          </tr>
        </thead>

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

        <tbody style={{ textAlign: "center" }}>
          {props.users?.length > 0 &&
            Object.keys(props.users).map((key, i) => (
              <tr>
              {props.users[key].emote.toLowerCase().trim() !== "cuckcrab" && 
                  (
                  <>
                    <td><img src={props.users[key].emote_image} alt="emote" /></td>
                    <td>{props.users[key].emote}</td>
                    <td>{props.users[key].uses}</td>
                  </>
                  )
              }
              </tr>
            ))}
        </tbody>
      </table>
    );
  } else if (!props.userFound) {

    return (
      <div style={{ paddingTop: 10 }}>
        <div>
          <img
            src={dankThink}
            height="40"
            width="40"
            style={{
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>User not found</div>
      </div>
    );
  }

};
