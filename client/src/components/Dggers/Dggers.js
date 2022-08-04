import React from "react";

import { Dgger } from "./Dgger/Dgger";

export const Dggers = (props) => {
  if (props.loading)
    return (
      <p>
        Please search for a user, or wait for the profile searched to load...
      </p>
    );

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-head-item">Username</th>

          <th className="table-head-item">Emotes</th>

          <th className="table-head-item">Count</th>
        </tr>
      </thead>

      <tbody className="table-body" style={{ textAlign: "center" }}>
        {props.users?.length > 0 ? (
          Object.keys(props.users).map((key, i) => (
            <Dgger
              emote={props.users[key].emote}
              uses={props.users[key].uses}
            />
          ))
        ) : (
          <tr className="table-row">
            <td
              className="table-item"
              style={{ textAlign: "center" }}
              colSpan={6}
            >
              Search for a user
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
