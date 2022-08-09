import React from "react";


export const Dggers = (props) => (
    <table className="table">
      <thead>
        <tr>
          <th className="table-head-item">Emotes</th>

          <th className="table-head-item">Count</th>
        </tr>
      </thead>

      <tbody className="table-body" style={{ textAlign: "center" }}>
        {props.users?.length > 0 ? (
          Object.keys(props.users).map((key, i) => (
			<tr className="table-row">
    		    <td className="table-item">
    		        {props.users[key].emote}
    		    </td>

    		    <td className="table-item">
    		        {props.users[key].uses}
    		    </td>
    		</tr>
          ))
        ) : (
          <tr className="table-row">
            <td
              className="table-item"
              style={{ textAlign: "center" }}
              colSpan={6}
            >
				Please search for a user, or wait for the profile searched to load...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
