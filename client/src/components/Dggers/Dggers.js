import React from "react";
import styled, { keyframes } from "styled-components";
import prayge from "../../images/prayge.png";
import catJam from "../../images/catJam.gif";
import dankThink from "../../images/dankThink.png";

// FIXME create db of emotes so that i can easily reference each emote and it's info (like image url)

// FIXME this is so hardcoded it feels like SHIT

const animationFiveHead = keyframes`
  100% { background-position: -1020px; }
`;
export const FiveHead = styled.div`
  height: 34px;
  width: 30px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5fa1f1d6e4f61.png") 0px
    0px;
  animation: ${animationFiveHead} 1.8s steps(34) infinite;
`;

const animationCatJam = keyframes`
  100% { background-position: -7144px; }
`;
export const CatJam = styled.div`
  height: 30px;
  width: 30px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5f9325d81e730.png") 0px
    0px;
  animation: ${animationCatJam} 7s steps(188) infinite;
`;

const animationSmashIt = keyframes`
  100% { background-position: -2856px; }
`;
export const SmashIt = styled.div`
  height: 29px;
  width: 41px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/604fa4fa5ca3d.png") 0px
    0px;
  animation: ${animationSmashIt} 1.5s steps(68) infinite;
`;

const animationWoof = keyframes`
  100% { background-position: -1020px; }
`;
export const Woof = styled.div`
  height: 31px;
  width: 50px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5f77ea04722e5.png") 0px
    0px;
  animation: ${animationWoof} 1.3s steps(17) infinite;
`;

const animationWooYeah = keyframes`
  100% { background-position: -710px; }
`;
export const WooYeah = styled.div`
  height: 32px;
  width: 28px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/603cdf2fc0c2f.png") 0px
    0px;
  animation: ${animationWooYeah} 1.8s steps(22) infinite;
`;

const animationOooo = keyframes`
  100% { background-position: -588px; }
`;
export const Oooo = styled.div`
  height: 28px;
  width: 29px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5e75f1c3a21a1.png") 0px
    0px;
  animation: ${animationOooo} 1.4s steps(21) infinite;
`;

const animationPeepoRiot = keyframes`
  100% { background-position: -280px; }
`;
export const PeepoRiot = styled.div`
  height: 32px;
  width: 35px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5e9a25016d376.png") 0px
    0px;
  animation: ${animationPeepoRiot} 1s steps(8) infinite;
`;

const animationPepeSteer = keyframes`
  100% { background-position: -792px; }
`;
export const PepeSteer = styled.div`
  height: 30px;
  width: 30px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5fc5c2f5071e9.png") 0px
    0px;
  animation: ${animationPepeSteer} 1.2s steps(24) infinite;
`;

const animationRaveDoge = keyframes`
  100% { background-position: -1350px; }
`;
export const RaveDoge = styled.div`
  height: 34px;
  width: 40px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/603e0f856ad93.png") 0px
    0px;
  animation: ${animationRaveDoge} 2s steps(27) infinite;
`;

const animationMalarkey = keyframes`
  100% { background-position: -1581px; }
`;
export const Malarkey = styled.div`
  height: 30px;
  width: 50px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5fa6b9f31acce.png") 0px
    0px;
  animation: ${animationMalarkey} 2s steps(31) infinite;
`;

const animationShrugstiny = keyframes`
  100% { background-position: -64px; }
`;
export const Shrugstiny = styled.div`
  height: 32px;
  width: 32px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5e8666ff1b079.png") 0px
    0px;
  animation: ${animationShrugstiny} 1.5s steps(2) infinite;
`;

const animationKlappa = keyframes`
  100% { background-position: -76px; }
`;
export const Klappa = styled.div`
  height: 30px;
  width: 38px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5e78eb181cc2b.png") 0px
    0px;
  animation: ${animationKlappa} 1s steps(2) infinite;
`;

const animationMiyanoHype = keyframes`
  100% { background-position: -320px; }
`;
export const MiyanoHype = styled.div`
  height: 32px;
  width: 32px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/61574db3e31e6.png") 0px
    0px;
  animation: ${animationMiyanoHype} 1s steps(10) infinite;
`;

const animationAskers = keyframes`
  100% { background-position: -5544px; }
`;
export const Askers = styled.div`
  height: 34px;
  width: 55px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/604fa56f679e0.png") 0px
    0px;
  animation: ${animationAskers} 3s steps(99) infinite;
`;

const animationBern = keyframes`
  100% { background-position: -1860px; }
`;
export const Bern = styled.div`
  height: 30px;
  width: 50px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5e75ea9259721.png") 0px
    0px;
  animation: ${animationBern} 2s steps(31) infinite;
`;

const animationBingqilin = keyframes`
  100% { background-position: -3510px; }
`;
export const Bingqilin = styled.div`
  height: 32px;
  width: 39px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/621c174883d29.png") 0px
    0px;
  animation: ${animationBingqilin} 3s steps(90) infinite;
`;

const animationClap = keyframes`
  100% { background-position: -44px; }
`;
export const Clap = styled.div`
  height: 32px;
  width: 22px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5fcdbf43b5737.png") 0px
    0px;
  animation: ${animationClap} 1s steps(2) infinite;
`;

const animationCuckCrab = keyframes`
  100% { background-position: -2944px; }
`;
export const CuckCrab = styled.div`
  height: 30px;
  width: 32px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5fc5b4b8d0924.png") 0px
    0px;
  animation: ${animationCuckCrab} 3s steps(92) infinite;
`;

const animationGODSTINY = keyframes`
  100% { background-position: -1664px; }
`;
export const GODSTINY = styled.div`
  height: 35px;
  width: 37px;
  background: url("https://cdn.destiny.gg/2.51.0/emotes/61579e27c1220.png") 0px
    0px;
  animation: ${animationGODSTINY} 3s steps(32) infinite;
`;

const animationOverRustle = keyframes`
  100% { background-position: -2448px; }
`;
export const OverRustle = styled.div`
  height: 32px;
  width: 36px;
  background: url("https://cdn.destiny.gg/2.51.0/emotes/5f7ca2392c7e4.png") 0px
    0px;
  animation: ${animationOverRustle} 1.75s steps(68) infinite;
`;

const animationLeRuse = keyframes`
  100% { background-position: -3888px; }
`;
export const LeRuse = styled.div`
  height: 32px;
  width: 45px;
  background: url("https://cdn.destiny.gg/2.51.0/emotes/615e049aa260d.png") 0px
    0px;
  animation: ${animationLeRuse} 3s steps(81) infinite;
`;

const animationGameOfThrows = keyframes`
  100% { background-position: -2528px; }
`;
export const GameOfThrows = styled.div`
  height: 30px;
  width: 70px;
  background: url("https://cdn.destiny.gg/2.51.0/emotes/5f77e837dbf66.png") 0px
    0px;
  animation: ${animationGameOfThrows} 3s steps(32) infinite;
`;

const animationBlade = keyframes`
  100% { background-position: -6000px; }
`;
export const Blade = styled.div`
  height: 30px;
  width: 30px;
  background: url("https://cdn.destiny.gg/2.51.0/emotes/61646d1070335.png") 0px
    0px;
  animation: ${animationBlade} 6.5s steps(200) infinite;
`;

const animationAMAZIN = keyframes`
  100% { background-position: -2385px; }
`;
export const AMAZIN = styled.div`
  height: 32px;
  width: 50px;
  background: url("https://cdn.destiny.gg/2.51.0/emotes/633b30edbb5bf.png") 0px
    0px;
  animation: ${animationAMAZIN} 3s steps(45) infinite;
`;

const animationTRUMPED = keyframes`
  100% { background-position: -106px; }
`;
export const TRUMPED = styled.div`
  height: 28px;
  width: 50px;
  background: url("https://cdn.destiny.gg/2.51.0/emotes/5f76770cccb6f.png") 0px
    0px;
  animation: ${animationTRUMPED} 1.5s steps(2) infinite;
`;

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
  "TRUMPED"
];

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
