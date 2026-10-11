import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it.each(['/shop','/collections','/collections/gown','/product/bella-gown-black','/cart','/checkout','/tracking','/demo-account','/auth','/wishlist','/help','/new-arrivals','/best-sellers','/stories','/outlet','/reviews','/blog','/blog/building-a-modest-wardrobe','/product-videos','/collections/premium-poncho','/collections/three-piece'])('preserves the shopping journey at %s', (path) => {
    const router=createRouter({routeTree,context:{queryClient:new QueryClient()}});
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
