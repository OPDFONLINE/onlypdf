# OnlyPDF Deployment Patch

This archive contains only files that are new or updated compared with the freshly supplied repository.

### Apply

1. Upload/overwrite every file in this patch at the same repository path.
2. Commit the changes to GitHub.
3. Let the connected Vercel project redeploy.
4. Run `supabase/migrations/0006_blog_images.sql`.
5. Add the required production environment variables listed in `README.md`.
6. Confirm the Vercel build succeeds before treating the deployment as complete.

### Important

- This patch does **not** contain the complete repository.
- Existing repository files not included here must remain in GitHub.
- No Vercel Cron configuration is being added.
- No old Cron file needs deletion because it is already absent from the supplied repository.
- The new contact form only sends mail after Resend environment variables are configured.
- Pexels/Pixabay search only works after the corresponding API key is configured.
- Automatic blog scheduled publishing is still a separate infrastructure task.
