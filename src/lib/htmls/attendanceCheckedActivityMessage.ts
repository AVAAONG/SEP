
const createAttendanceCheckedActivityMessage = (
    activityName: string,
    date: string,
    link: string
) => {
    return `<table>
    <tr><td>Hola, esperamos que te encuentres muy bien 💚</td></tr>
  
    <tr><td style="height: 20px;"></td></tr>
  
    <tr><td>Tu participación se ha registrado de forma existosa en la actividad: ${activityName} realizada el dia ${new Date(date).toLocaleDateString('es-VE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })} a las ${new Date(date).toLocaleTimeString('es-VE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })}</td></tr>

    <tr><td style="height: 20px;">Para completar el registro te invitamos a que nos des tu opinión de la actividad llenando la encuesta de satisfacción</td></tr>
    <tr><td style="height: 20px;"></td></tr>

    <tr><td style="height: 20px;">Puedes acceder a ella a travez del siguiente enlace ${link}</td></tr>

    <tr><td>¡Esperamos contar con tu opinión!</td></tr>
  </table>
  `;
};

export default createAttendanceCheckedActivityMessage;