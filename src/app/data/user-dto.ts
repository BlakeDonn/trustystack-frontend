// app/data/user-dto.ts
import "server-only";
import { getCurrentUser } from "./auth";
import { sql } from "@vercel/postgres";
// Or your favorite Postgres client. Use parameterized queries to avoid injection.

// Example: a user table with columns: id, username, phoneNumber, team, etc.

// Return shape
export interface UserProfileDTO {
  username: string | null;
  phoneNumber: string | null;
}

// Example "permissions" checks:
function canSeeUsername(viewer) {
  // Maybe everyone can see the username
  return true;
}

function canSeePhoneNumber(viewer, profileRow) {
  // Suppose only admins or same-team can see phone number
  if (!viewer) return false;
  return viewer.isAdmin || viewer.id === profileRow.id;
}

/**
 * Safely fetch the user profile from DB, applying checks
 * so that sensitive fields are omitted if the currentUser
 * is not authorized to see them.
 */
export async function getProfileDTO(
  slug: string,
): Promise<UserProfileDTO | null> {
  // 1. get the user
  const [rows] = await sql`
    SELECT id, username, phonenumber, team
    FROM "User"
    WHERE slug = ${slug}
    LIMIT 1
  `;
  const userRow = rows?.[0];
  if (!userRow) {
    return null; // user not found
  }

  // 2. get the current viewer
  const currentUser = await getCurrentUser();

  // 3. Check each field if viewer is authorized
  const username = canSeeUsername(currentUser) ? userRow.username : null;
  const phoneNumber = canSeePhoneNumber(currentUser, userRow)
    ? userRow.phonenumber
    : null;

  // 4. Return a minimal object: we ONLY put
  // the data that is safe to pass forward.
  return {
    username,
    phoneNumber,
  };
}
