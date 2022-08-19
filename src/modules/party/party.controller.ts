import { RouteHandlerTypebox } from '../../types';
import { CreatePartySchema } from './party.schema';

export const CreatePartyHandler: RouteHandlerTypebox<
  CreatePartySchema
> = async (request, reply) => {
  const { memberLimit, candidates, ...others } = request.body;

  if (others.pollEndsAt)
    console.log(new Date(others.pollEndsAt).toLocaleString());

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
