
const createSuspendedActivityMessage = (
    activityName: string,
    date: string | Date
) => {
    return `<table>
    <tr><td>Holaa, esperamos que te encuentres muy bien. 💚</td></tr>
    <tr><td style="height: 20px;"></td></tr>
    <tr><td>Por motivos ajenos a nuestra voluntad, la actividad <span style="font-weight: bold;">${activityName}</span> pautada para el dia ${new Date(date).toLocaleDateString('es-VE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })} ha sido suspendida. 😟</td></tr>

    <tr><td>Lamentamos las molestias ocacionadas. </td></tr>

    <tr><td style="height: 20px;"></td></tr>

    <tr><td>Les dejaremos saber si se llega a reprogramar en una próxima oportunidad. 🤗</td></tr>
  </table>
  `;
};

export default createSuspendedActivityMessage;