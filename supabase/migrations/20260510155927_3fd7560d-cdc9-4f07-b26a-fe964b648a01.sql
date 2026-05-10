
-- Revoke from anon/public; keep authenticated for has_role (needed by RLS policies)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

-- bootstrap_first_admin is only invoked by the auth.users trigger; no caller needs EXECUTE
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC, anon, authenticated;

-- Drop the broad listing policy on cms-media; the bucket is public so files are
-- still served at their public URLs, but anon can no longer list the bucket.
DROP POLICY IF EXISTS "Public read cms-media" ON storage.objects;
