import React from "react";
import styled, {keyframes} from 'styled-components';

// FIXME create db of emotes so that i can easily reference each emote and it's info (like image url)

// FIXME this is so hardcoded it feels like SHIT

const animationFiveHead = keyframes`
  100% { background-position: -1020px; }
`;
export const FiveHead = styled.div`
  height: 34px;
  width: 30px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5fa1f1d6e4f61.png") 0px 0px;
  animation: ${animationFiveHead} 1.8s steps(34) infinite; 
`;

const animationCatJam = keyframes`
  100% { background-position: -7144px; }
`;
export const CatJam = styled.div`
  height: 30px;
  width: 30px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5f9325d81e730.png") 0px 0px;
  animation: ${animationCatJam} 7s steps(188) infinite; 
`;

const animationSmashIt = keyframes`
  100% { background-position: -2856px; }
`;
export const SmashIt = styled.div`
  height: 29px;
  width: 41px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/604fa4fa5ca3d.png") 0px 0px;
  animation: ${animationSmashIt} 1.5s steps(68) infinite; 
`;

const animationWoof = keyframes`
  100% { background-position: -1020px; }
`;
export const Woof = styled.div`
  height: 31px;
  width: 50px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5f77ea04722e5.png") 0px 0px;
  animation: ${animationWoof} 1.3s steps(17) infinite; 
`;

const animationWooYeah = keyframes`
  100% { background-position: -710px; }
`;
export const WooYeah = styled.div`
  height: 32px;
  width: 28px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/603cdf2fc0c2f.png") 0px 0px;
  animation: ${animationWooYeah} 1.8s steps(22) infinite; 
`;

const animationOooo = keyframes`
  100% { background-position: -588px; }
`;
export const Oooo = styled.div`
  height: 28px;
  width: 29px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5e75f1c3a21a1.png") 0px 0px;
  animation: ${animationWooYeah} 1.8s steps(21) infinite; 
`;


const animationPeepoRiot = keyframes`
  100% { background-position: -280px; }
`;
export const PeepoRiot = styled.div`
  height: 32px;
  width: 35px;
  background: url("https://cdn.destiny.gg/2.45.2/emotes/5e9a25016d376.png") 0px 0px;
  animation: ${animationPeepoRiot} 1s steps(8) infinite; 
`;

const sprites = ["catJAM", "FiveHead", "SMASHit", "OOOO", "peepoRiot", "WOOF", "WooYeah"];

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
        <th></th>
        <th>Emote</th>
        <th>Count</th>
      </tr>
    </thead>

    <tbody style={{ textAlign: "center" }}>
      {props.users?.length > 0 ? (
        Object.keys(props.users).map((key, i) => (
          <tr>
            {(String(props.users[key].emote).trim() === "FiveHead") && (<td style={{display: "flex", justifyContent: "center", alignItems: "center"}}><FiveHead/></td>)}
            {(String(props.users[key].emote).trim() === "catJAM") && (<td style={{display: "flex", justifyContent: "center", alignItems: "center"}}><CatJam/></td>)}
            {(String(props.users[key].emote).trim() === "SMASHit") && (<td style={{display: "flex", justifyContent: "center", alignItems: "center"}}><SmashIt/></td>)}
            {(String(props.users[key].emote).trim() === "WOOF") && (<td style={{display: "flex", justifyContent: "center", alignItems: "center"}}><Woof/></td>)}
            {(String(props.users[key].emote).trim() === "WooYeah") && (<td style={{display: "flex", justifyContent: "center", alignItems: "center"}}><WooYeah/></td>)}
            {(String(props.users[key].emote).trim() === "OOOO") && (<td style={{display: "flex", justifyContent: "center", alignItems: "center"}}><Oooo/></td>)}
            {(String(props.users[key].emote).trim() === "peepoRiot") && (<td style={{display: "flex", justifyContent: "center", alignItems: "center"}}><PeepoRiot/></td>)}
            {!sprites.includes(String(props.users[key].emote).trim()) && (<td><img src={props.users[key].emote_image}></img></td>)}

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
