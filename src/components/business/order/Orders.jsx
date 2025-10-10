import React from "react";
import {useSSEContext} from "../../../context/SSEProvider";

export default function Orders() {
    const { events, connected } = useSSEContext();

    return (
        <div>
            <h2>Notifications {connected ? '🟢' : '🔴'}</h2>
            <ul>
                {events.map((event, i) => (
                    <li key={i}>{typeof event === 'string' ? event : JSON.stringify(event)}</li>
                ))}
            </ul>
        </div>
    );
}
