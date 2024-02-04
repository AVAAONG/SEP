interface DisplayTimeProps {
    time: string
}

const DisplayTime: React.FC<DisplayTimeProps> = ({ time }) => {
    return (
        <>
            {new Date(time)
                .toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,

                })
                .toUpperCase()}
        </>
    )
}

export default DisplayTime