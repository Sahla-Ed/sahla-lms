'use server';

import { auth } from '@/lib/auth';
import { ApiResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export type OrganizationRole = 'member' | 'admin' | 'owner';

export async function getTeamDetails(teamId: string) {
  try {
    const team = await auth.api.getFullOrganization({
      query: {
        organizationId: teamId,
      },
      headers: await headers(),
    });

    const members = await auth.api.listOrganizationTeams({
      query: { organizationId: teamId },
      headers: await headers(),
    });

    return { team, members };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function inviteTeamMember(
  teamId: string,
  email: string,
  role: OrganizationRole,
): Promise<ApiResponse> {
  try {
    await auth.api.createInvitation({
      body: {
        organizationId: teamId,
        email,
        role,
      },
      headers: await headers(),
    });
    revalidatePath(`/admin/teams/${teamId}`);
    return { status: 'success', message: 'Invitation sent successfully' };
  } catch (error) {
    console.log(error);

    return { status: 'error', message: 'Failed to send invitation' };
  }
}

export async function removeTeamMember(
  teamId: string,
  userId: string,
): Promise<ApiResponse> {
  try {
    await auth.api.removeMember({
      body: {
        memberIdOrEmail: userId,
        organizationId: teamId,
      },
      headers: await headers(),
    });
    revalidatePath(`/admin/teams/${teamId}`);
    return { status: 'success', message: 'Member removed successfully' };
  } catch (error) {
    console.log(error);

    return { status: 'error', message: 'Failed to remove member' };
  }
}

export async function deleteTeam(teamId: string): Promise<ApiResponse> {
  try {
    await auth.api.removeTeam({
      body: { teamId },
      headers: await headers(),
    });
    revalidatePath('/admin/teams');
    return { status: 'success', message: 'Team deleted successfully' };
  } catch (error) {
    console.log(error);

    return { status: 'error', message: 'Failed to delete team' };
  }
}
