<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## MAHAA application rules
- Keep verified catalogue references, contact details and policy blocks in shared data modules so the storefront and detail pages use the same source.
- Use original uploaded logo pixels and asset pointers for brand media so official imagery is replaceable without regenerating artwork.
- Store signed-in profiles, bags, orders and moderated reviews in Cloud with owner-scoped RLS; guest bags are session-only to avoid pretending they are durable.
- Keep checkout explicitly conceptual until MAHAA confirms payment, stock and fulfilment integration; server handlers calculate prices from the catalogue.
- Use the shared StoreProvider for identity transitions and bag state, and the authenticated layout for private pages, to avoid competing auth listeners.
- Put privileged writes in validated server functions with rate limits; ordinary reads and moderation use RLS-scoped clients to preserve account boundaries.
- Keep review photos private with owner upload and approved-review read policies; never promote a concept order to a verified purchase.
