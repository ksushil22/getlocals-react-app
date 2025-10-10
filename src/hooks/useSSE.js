import { useEffect, useState } from 'react';

const useSSE = (url) => {
    const [events, setEvents] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSource.onopen = () => {
            console.log('SSE connection established');
            setConnected(true);
        };

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setEvents((prev) => [...prev, data]);
            } catch (e) {
                console.warn('Non-JSON SSE message:', event.data);
                setEvents((prev) => [...prev, event.data]);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE connection error:', err);
            setConnected(false);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [url]);

    return { events, connected };
};

export default useSSE;
