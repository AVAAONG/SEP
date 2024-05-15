import { Modality } from "@prisma/client";
import { parseModalityFromDatabase } from "../utils2";

const createTransferSpotMessage = (
    scholarName: string,
    scholarWhoCeaseName: string,
    activityName: string,
    date: string,
    startDate: string | Date,
    endDate: string | Date,
    modality: string,
    platform: string,
    link: string
) => {
    return `<table>
    <tr><td>Hola, ${scholarName}</td></tr>
  
    <tr><td style="height: 20px;"></td></tr>
  
    <tr><td>${scholarWhoCeaseName} te cedió el cupo a la actividad de ${activityName}</td></tr>
      
    <tr><td style="height: 20px;"></td></tr>
  
    <tr><td style="font-weight: bold;">Detalles de la actividad:</td></tr>
  
    <tr><td>Fecha: ${new Date(date).toLocaleDateString('es-VE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })}</td></tr>
  
    <tr><td>Hora: De ${new Date(startDate).toLocaleTimeString('es-VE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })} a ${new Date(endDate).toLocaleTimeString('es-VE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })}</td></tr>
  
    <tr><td>Modalidad: ${parseModalityFromDatabase(modality as Modality)}</td></tr>
  
    <tr><td>Plataforma: ${platform}</td></tr>
    
    <tr><td style="height: 20px;"></td></tr>
  
    <tr><td>Para confirmar tu asistencia haz clic en el siguiente enlace: ${link}</td></tr>
      
    <tr><td style="height: 20px;"></td></tr>
  
    <tr><td>👀 Recuerda, inscribirse es un compromiso que adquieres con AVAA y contigo mismo.</td></tr>
  
    <tr><td>Al inscribirte, te comprometes a asistir a la actividad y cumplir con las responsabilidades y obligaciones que se te asignen.</td></tr>
      
    <tr><td style="height: 20px;"></td></tr>
  
    <tr><td>Importante:</td></tr>
  
    <tr><td>Si no has recibido información previa sobre esta actividad por parte de ${scholarWhoCeaseName}, NO hagas clic en el enlace.</td></tr>
  
    <tr><td style="height: 20px;"></td></tr>
  
    <tr><td>¡Esperamos tu participación!</td></tr>
  </table>
  `;
};

export default createTransferSpotMessage;