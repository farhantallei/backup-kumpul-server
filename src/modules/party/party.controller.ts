import { RouteHandlerTypebox } from '../../types';
import { getDate } from '../../utils/date';
import { CreatePartyTSchema } from './party.schema';
import { createParty, getAdminAccounts, getHostId } from './party.service';

export const CreatePartyHandler: RouteHandlerTypebox<
  CreatePartyTSchema
> = async (request, reply) => {
  const { hostId, candidates, ...others } = request.body;

  if (others.pollEndsAt) {
    if (new Date(others.pollEndsAt).getTime() <= new Date().getTime())
      return reply.badRequest(`body/pollEndsAt must be > ${new Date()}`);
  }

  for (const date in others.pollChoice) {
    if (
      new Date(getDate(others.pollChoice[date])).getTime() <=
      new Date(getDate()).getTime()
    )
      return reply.badRequest(
        `body/pollChoice/${date} must be > ${new Date().toLocaleDateString()}`
      );
  }

  const currHostId = await getHostId(reply, { hostId });

  const admins = [...candidates.filter((candidate) => candidate.admin)];
  const nonAdmins = [...candidates.filter((candidate) => !candidate.admin)];

  const adminPhoneNumbers = admins.map((admin) => admin.phoneNumber);

  const adminAccounts = await getAdminAccounts(reply, { adminPhoneNumbers });

  const adminAccountPhoneNumbers = adminAccounts.map(
    (admin) => admin.phoneNumber
  );

  const adminAnonymouses = [
    ...admins.filter(
      (admin) => !adminAccountPhoneNumbers.includes(admin.phoneNumber)
    ),
  ];

  const memberIds = [...adminAccounts.map((admin) => admin.id)];

  const candidatesFiltered = [...nonAdmins, ...adminAnonymouses];

  const newParty = await createParty(reply, {
    hostId: currHostId,
    candidates: candidatesFiltered,
    memberIds,
    ...others,
  });

  return reply.code(201).send(newParty);
};
