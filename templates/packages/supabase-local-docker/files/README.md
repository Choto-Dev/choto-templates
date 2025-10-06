# `@workspace/supabase-local-docker`

Local Supabase servers via docker.

### Scripts

```bash
# Run servers with docker container.
pnpm dev

# Reset all.
pnpm docker:reset
```

> [!NOTE]
> When the container is stoped, `docker compose stop` is also run to stop docker servers.