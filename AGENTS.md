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

- Define store context in a separate browser-safe module and re-export its hook from the provider module to keep one context identity during hot updates.
- Keep client demo profiles and orders separate from Cloud identities and orders; demo storage must never confer account access or verified-purchase status.
- Use a shared Embla slider for autoplay, drag, pagination, hover pause and reduced-motion handling so every collection follows one interaction model.

- Keep delivery selections and demo payment choices in shared browser-safe data; never invent unconfirmed regional charges.
- Keep style articles in a shared editorial module with dedicated index/detail routes; general styling advice must not assert unverified product specifications.
- Validate local demo checkout details with a shared schema before storing orders; local confirmation never initiates a production purchase.
