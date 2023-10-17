const formatDni = (dni: string): string => {
    const formattedDni = dni
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '$1.$2')
        .replace(/(\d{3})(?=\d)/g, '$1.');
    return formattedDni;
}

export default formatDni;