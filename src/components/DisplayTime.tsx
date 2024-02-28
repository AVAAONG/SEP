'use client'
import { useEffect, useState } from "react";

interface DisplayTimeProps {
    time: string
}

const DisplayTime: React.FC<DisplayTimeProps> = ({ time }) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    else {
        return (
            <>
                {new Date(time)
                    .toLocaleTimeString('es-VE', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                        hourCycle: 'h12'

                    })}
            </>
        )
    }

}

export default DisplayTime