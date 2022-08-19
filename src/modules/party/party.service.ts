import prisma from '../../prisma';
import { commitToDB } from '../../utils';

// async function createParty({
//   hostId,
//   candidates,
//   memberIds,
//   ...party
// }: CreatePartySchema & {
//   memberLimit: number;
//   memberIds: string[];
// }) {
//   return await commitToDB(
//     prisma.party.create({
//       data: {
//         ...party,
//         candidates: {
//           createMany: {
//             data: candidates,
//           },
//         },
//         members: {
//           create: [
//             ...memberIds.map((memberId) => ({
//               memberId,
//               admin: true,
//             })),
//           ],
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         candidates: {
//           where: {
//             admin: true,
//           },
//           select: {
//             name: true,
//           },
//         },
//         members: {
//           select: {
//             member: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//         createdAt: true,
//       },
//     })
//   );
// }
