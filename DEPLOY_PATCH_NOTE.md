# OnlyPDF GitHub Patch — Cron Removed

This patch contains only files that are new or updated compared with the previously supplied base repository.

Important:
- `vercel.json` contains no `crons` configuration.
- The old `app/api/cron/publish-blog/route.ts` must be DELETED from the GitHub repository. File upload/overwrite cannot delete an existing file.
- All other existing GitHub files remain part of the deployment; Vercel deploys the complete repository, not only uploaded files.

Upload/overwrite the files in this patch, then delete:
`app/api/cron/publish-blog/route.ts`

After the GitHub commit, Vercel should redeploy the full repository.
