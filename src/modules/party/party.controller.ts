import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { CreatePartyHandler } from './party.options';
import { CreatePartySchema } from './party.schema';

export const createPartyHandler: CreatePartyHandler = async (
  request,
  reply
) => {
  const { memberLimit, candidates, ...others } = request.body;

  console.log(typeof others.pollEndsAt);

  // const admins = [...candidates.filter((candidate) => candidate.admin)];
  // const nonAdmins = [...candidates.filter((candidate) => !candidate.admin)];

  // const adminsPhoneNumber = admins.map((admin) => admin.phoneNumber);

  // const adminsHaveAccount = await commitToDB(
  //   prisma.user.findMany({
  //     where: { phoneNumber: { in: adminsPhoneNumber } },
  //   })
  // );

  // const adminsDontHaveAccount = admins.filter((admin) =>
  //   adminsPhoneNumber.includes(admin.phoneNumber)
  // );

  // const memberIds = [...adminsHaveAccount.map((admin) => admin.id)];

  // const candidatesFiltered = [...nonAdmins, ...adminsDontHaveAccount];

  // const {
  //   candidates: adminCandidates,
  //   members: adminMembers,
  //   ...newParty
  // } = await createParty({
  //   memberLimit: memberLimit || candidates.length - adminsHaveAccount.length,
  //   candidates: candidatesFiltered,
  //   memberIds,
  //   ...others,
  // });

  // const newAdmins = [
  //   ...adminCandidates.map((admin) => admin.name),
  //   ...adminMembers.map((admin) => admin.member.name),
  // ];

  // return reply.code(201).send({ ...newParty, admins: newAdmins });
};

async function createParty({
  hostId,
  candidates,
  memberIds,
  ...party
}: CreatePartySchema & {
  memberLimit: number;
  memberIds: string[];
}) {
  return await commitToDB(
    prisma.party.create({
      data: {
        ...party,
        candidates: {
          createMany: {
            data: candidates,
          },
        },
        members: {
          create: [
            ...memberIds.map((memberId) => ({
              memberId,
              admin: true,
            })),
          ],
        },
      },
      select: {
        id: true,
        name: true,
        candidates: {
          where: {
            admin: true,
          },
          select: {
            name: true,
          },
        },
        members: {
          select: {
            member: {
              select: {
                name: true,
              },
            },
          },
        },
        createdAt: true,
      },
    })
  );
}
