// import shortUUID from "short-uuid"

// import { Workshop } from "@/types/Workshop"
// import { Volunteer } from "@/types/Volunteer"
// import { Chat } from "@/types/Chat"
// import { KindOfActivity } from "@/types/General"

// export const deleteEntry = (inputId: shortUUID.SUUID, KindOfActivity: KindOfActivity, setData: React.Dispatch<React.SetStateAction<any>>) => {
//     switch (KindOfActivity) {
//         case "chat":
//             setData((oldValues: Chat[]) => {
//                 return oldValues.filter((chat: Chat) => chat.id !== inputId)
//             })
//             break;
//         case "volunteer":
//             setData((oldValues: Volunteer[]) => {
//                 return oldValues.filter((volunteer: Volunteer) => volunteer.id !== inputId)
//             })
//             break;
//         case "workshop":
//             setData((oldValues: Workshop[]) => {
//                 return oldValues.filter((workshop: Workshop) => workshop.id !== inputId)
//             })
//             break;
//         default:
//             return []
//             break;
//     }
// }

// export const editEntry = (inputId: shortUUID.SUUID, KindOfActivity: KindOfActivity, setData: React.Dispatch<React.SetStateAction<any>>) => {
//     //FIRST,GET THE VALUES FROM THE STATE BASED ON ITS ID
//     const data = workshopData.filter((workshop: Workshop) => workshop.id === inputId)
//     const { name, pensum, date, startHour, endHour, speaker, numberOfParticipants, kindOfWorkshop, platform, avaaYear, description } = data[0];

//     //SECOND, PUT THE DATA IN THE FORM
//     reset({
//         name,
//         pensum,
//         date,
//         startHour,
//         endHour,
//         speaker,
//         numberOfParticipants,
//         kindOfWorkshop,
//         platform,
//         avaaYear,
//         description
//     })
//     //THEN, DELETE THE old entry
//     deleteEntry(inputId, KindOfActivity);
// }

// export const createWorkshop = (data: Workshop, event: React.ChangeEvent<HTMLInputElement>) => {
//     event.preventDefault();
//     data.id = shortUUID.generate();
//     // delete data.subject;
//     // delete data.group;

//     setWorkshopData([...workshopData, data])
//     reset({
//         name: "",
//         pensum: "",
//         date: "",
//         startHour: "",
//         endHour: "",
//         speaker: "",
//         numberOfParticipants: "",
//         kindOfWorkshop: "",
//         platform: "",
//         avaaYear: "",
//         description: ""
//     });
//     console.log(data)
//     // setSubmit(true)
// }
