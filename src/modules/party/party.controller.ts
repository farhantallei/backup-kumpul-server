import { RouteHandlerTypebox } from '../../types';
import { getDate } from '../../utils/date';
import { CreatePartyTSchema, JoinPartyTSchema } from './party.schema';
import {
  countMember,
  createParty,
  deleteCandidate,
  getAdminAccounts,
  getCandidate,
  getHost,
  getMember,
  getParty,
  getUser,
  joinParty,
} from './party.service';

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

  const host = await getHost(reply, { hostId });
  if (host == null) return reply.notFound('Host id is not found');

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
    hostId: host.id,
    candidates: candidatesFiltered,
    memberIds,
    ...others,
  });

  return reply.code(201).send(newParty);
};

export const JoinPartyHandler: RouteHandlerTypebox<JoinPartyTSchema> = async (
  request,
  reply
) => {
  const { userId, partyId } = request.body;

  const user = await getUser(reply, { userId });
  if (user == null) return reply.notFound('User id is not found');

  const party = await getParty(reply, { partyId });
  if (party == null) return reply.notFound('Party id is not found');

  // Check if user already on the party!!!
  const member = await getMember(reply, { partyId, memberId: userId });
  if (member)
    return {
      partyId,
      memberId: userId,
      admin: member.admin,
      assignedAt: member.assignedAt.toISOString(),
    };

  // Check the limit!!!
  const memberCount = await countMember(reply, { partyId });
  console.log({ memberCount });
  if (party.memberLimit !== null && memberCount >= party.memberLimit)
    return reply.forbidden('The party is full');

  // Check if the party is private???

  // If party is private:
  if (party.private) {
    // 1. Check if the user is exists on the candidate list???
    const candidate = await getCandidate(reply, {
      partyId,
      phoneNumber: user.phoneNumber,
    });
    if (candidate == null) return reply.forbidden('This is a private party');
    // 2. Check on the candidate if the user is admin or not???
    if (candidate.admin) {
      await deleteCandidate(reply, { partyId, phoneNumber: user.phoneNumber });
      const { assignedAt } = await joinParty(reply, {
        partyId,
        userId,
        admin: true,
      });
      return { partyId, memberId: userId, admin: true, assignedAt };
    }
    await deleteCandidate(reply, { partyId, phoneNumber: user.phoneNumber });
    const { assignedAt } = await joinParty(reply, {
      partyId,
      userId,
      admin: false,
    });
    return { partyId, memberId: userId, admin: false, assignedAt };
  }

  // If party is not private
  // 1. Check if the user is exists on the candidate for make sure if the user is admin or not???
  const candidate = await getCandidate(reply, {
    partyId,
    phoneNumber: user.phoneNumber,
  });
  // 2. If no result, make the user as a member.
  if (candidate == null) {
    const { assignedAt } = await joinParty(reply, {
      partyId,
      userId,
      admin: false,
    });
    return { partyId, memberId: userId, admin: false, assignedAt };
  }
  // 3. If the user is exists, check if the user is admin or not???
  if (candidate.admin) {
    await deleteCandidate(reply, { partyId, phoneNumber: user.phoneNumber });
    const { assignedAt } = await joinParty(reply, {
      partyId,
      userId,
      admin: true,
    });
    return { partyId, memberId: userId, admin: true, assignedAt };
  }
  await deleteCandidate(reply, { partyId, phoneNumber: user.phoneNumber });
  const { assignedAt } = await joinParty(reply, {
    partyId,
    userId,
    admin: false,
  });
  return { partyId, memberId: userId, admin: false, assignedAt };
};
