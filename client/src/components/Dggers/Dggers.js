import React from "react";
import prayge from "../../images/prayge.png";
import catJam from "../../images/catJam.gif";
import dankThink from "../../images/dankThink.png";
import {
    AMAZIN, Askers,
    ATAB, Bern, Bingqilin, Blade,
    CatJam, Clap, CuckCrab,
    FiveHead,
    GameOfThrows,
    GODSTINY, Klappa,
    LeRuse, Malarkey, MiyanoHype, Oooo,
    OverRustle, PeepoRiot, PepeSteer, RaveDoge, Shrugstiny,
    SmashIt,
    TRUMPED, Woof, WooYeah
} from "./animations.js";

// FIXME hardcoded as shit & disgusting, also put emote urls in db

const sprites = [
  "MiyanoHype",
  "CuckCrab",
  "Clap",
  "BINGQILIN",
  "BERN",
  "Askers",
  "Klappa",
  "MALARKEY",
  "Shrugstiny",
  "RaveDoge",
  "catJAM",
  "pepeSteer",
  "FiveHead",
  "SMASHit",
  "OOOO",
  "peepoRiot",
  "WOOF",
  "WooYeah",
  "GODSTINY",
  "LeRuse",
  "OverRustle",
  "GameOfThrows",
  "Blade",
  "AMAZIN",
  "TRUMPED",
  "ATAB"
];

export const Dggers = (props) => {
  if (!props.searched) {
    return (
      <div style={{ paddingTop: 10 }}>
        <div>
          <img
              alt={"prayge"}
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
              alt={"catJam"}
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
            Object.keys(props.users).map((key, _) => (
              <tr>
                {String(props.users[key].emote).trim() === "ATAB" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ATAB/>
                  </td>
                )}
                {String(props.users[key].emote).trim() === "GODSTINY" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <GODSTINY />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "TRUMPED" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TRUMPED/>
                  </td>
                )}
                {String(props.users[key].emote).trim() === "AMAZIN" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AMAZIN />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "Blade" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Blade />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "GameOfThrows" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <GameOfThrows />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "LeRuse" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <LeRuse />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "OverRustle" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <OverRustle />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "FiveHead" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FiveHead />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "catJAM" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CatJam />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "SMASHit" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SmashIt />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "WOOF" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Woof />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "WooYeah" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <WooYeah />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "OOOO" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Oooo />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "peepoRiot" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PeepoRiot />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "pepeSteer" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PepeSteer />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "RaveDoge" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RaveDoge />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "Shrugstiny" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Shrugstiny />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "MALARKEY" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Malarkey />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "Klappa" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Klappa />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "MiyanoHype" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MiyanoHype />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "Askers" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Askers />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "BERN" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Bern />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "BINGQILIN" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Bingqilin />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "Clap" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Clap />
                  </td>
                )}
                {String(props.users[key].emote).trim() === "CuckCrab" && (
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CuckCrab />
                  </td>
                )}
                {!sprites.includes(String(props.users[key].emote).trim()) && (
                  <td>
                    <img src={props.users[key].emote_image} alt="" />
                  </td>
                )}

                <td>{props.users[key].emote}</td>
                <td>{props.users[key].uses}</td>
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
              alt={"dankThink"}
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
