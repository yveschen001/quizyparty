import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CKWmrWlS.mjs';
import { manifest } from './manifest_Ci__in3Q.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/google/callback.astro.mjs');
const _page2 = () => import('./pages/api/auth/google/login.astro.mjs');
const _page3 = () => import('./pages/api/auth/logout.astro.mjs');
const _page4 = () => import('./pages/api/auth/me.astro.mjs');
const _page5 = () => import('./pages/api/dev/entitlements/upsert.astro.mjs');
const _page6 = () => import('./pages/api/question-sets/create.astro.mjs');
const _page7 = () => import('./pages/api/question-sets/list.astro.mjs');
const _page8 = () => import('./pages/api/question-sets/_id_.astro.mjs');
const _page9 = () => import('./pages/api/questions/create.astro.mjs');
const _page10 = () => import('./pages/api/questions/generate.astro.mjs');
const _page11 = () => import('./pages/api/questions/improve.astro.mjs');
const _page12 = () => import('./pages/api/questions/limits.astro.mjs');
const _page13 = () => import('./pages/api/questions/list.astro.mjs');
const _page14 = () => import('./pages/api/questions/_id_.astro.mjs');
const _page15 = () => import('./pages/api/rc/apple/status.astro.mjs');
const _page16 = () => import('./pages/api/rc/customer.astro.mjs');
const _page17 = () => import('./pages/api/rc/google/revoke.astro.mjs');
const _page18 = () => import('./pages/api/rc/google/voided.astro.mjs');
const _page19 = () => import('./pages/api/rc/webhook.astro.mjs');
const _page20 = () => import('./pages/api/room-templates/_id_.astro.mjs');
const _page21 = () => import('./pages/api/room-templates.astro.mjs');
const _page22 = () => import('./pages/api/rooms/list.astro.mjs');
const _page23 = () => import('./pages/api/rooms/_id_/advance.astro.mjs');
const _page24 = () => import('./pages/api/rooms/_id_/answer.astro.mjs');
const _page25 = () => import('./pages/api/rooms/_id_/join.astro.mjs');
const _page26 = () => import('./pages/api/rooms/_id_/leaderboard.astro.mjs');
const _page27 = () => import('./pages/api/rooms/_id_/ranking.astro.mjs');
const _page28 = () => import('./pages/api/rooms/_id_/state.astro.mjs');
const _page29 = () => import('./pages/api/rooms/_id_.astro.mjs');
const _page30 = () => import('./pages/api/rooms.astro.mjs');
const _page31 = () => import('./pages/api/scores/history.astro.mjs');
const _page32 = () => import('./pages/api/scores/leaderboard.astro.mjs');
const _page33 = () => import('./pages/api/scores/record.astro.mjs');
const _page34 = () => import('./pages/api/scores/rooms.astro.mjs');
const _page35 = () => import('./pages/api/scores/stats.astro.mjs');
const _page36 = () => import('./pages/favicon.ico.astro.mjs');
const _page37 = () => import('./pages/robots.txt.astro.mjs');
const _page38 = () => import('./pages/sitemap-index.xml.astro.mjs');
const _page39 = () => import('./pages/_lang_/about.astro.mjs');
const _page40 = () => import('./pages/_lang_/create-question.astro.mjs');
const _page41 = () => import('./pages/_lang_/create-room.astro.mjs');
const _page42 = () => import('./pages/_lang_/legal/privacy.astro.mjs');
const _page43 = () => import('./pages/_lang_/legal/terms.astro.mjs');
const _page44 = () => import('./pages/_lang_/my-participations.astro.mjs');
const _page45 = () => import('./pages/_lang_/my-rooms.astro.mjs');
const _page46 = () => import('./pages/_lang_/profile.astro.mjs');
const _page47 = () => import('./pages/_lang_/question-sets.astro.mjs');
const _page48 = () => import('./pages/_lang_/room/_id_.astro.mjs');
const _page49 = () => import('./pages/_lang_/rooms/created.astro.mjs');
const _page50 = () => import('./pages/_lang_/rooms/joined.astro.mjs');
const _page51 = () => import('./pages/_lang_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.15.3_@types+node@24.10.0_@vercel+functions@2.2.13_jiti@2.6.1_rollup@4.52.5_typescript@5.9.3_yaml@2.8.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/auth/google/callback.ts", _page1],
    ["src/pages/api/auth/google/login.ts", _page2],
    ["src/pages/api/auth/logout.ts", _page3],
    ["src/pages/api/auth/me.ts", _page4],
    ["src/pages/api/dev/entitlements/upsert.ts", _page5],
    ["src/pages/api/question-sets/create.ts", _page6],
    ["src/pages/api/question-sets/list.ts", _page7],
    ["src/pages/api/question-sets/[id].ts", _page8],
    ["src/pages/api/questions/create.ts", _page9],
    ["src/pages/api/questions/generate.ts", _page10],
    ["src/pages/api/questions/improve.ts", _page11],
    ["src/pages/api/questions/limits.ts", _page12],
    ["src/pages/api/questions/list.ts", _page13],
    ["src/pages/api/questions/[id].ts", _page14],
    ["src/pages/api/rc/apple/status.ts", _page15],
    ["src/pages/api/rc/customer.ts", _page16],
    ["src/pages/api/rc/google/revoke.ts", _page17],
    ["src/pages/api/rc/google/voided.ts", _page18],
    ["src/pages/api/rc/webhook.ts", _page19],
    ["src/pages/api/room-templates/[id].ts", _page20],
    ["src/pages/api/room-templates/index.ts", _page21],
    ["src/pages/api/rooms/list.ts", _page22],
    ["src/pages/api/rooms/[id]/advance.ts", _page23],
    ["src/pages/api/rooms/[id]/answer.ts", _page24],
    ["src/pages/api/rooms/[id]/join.ts", _page25],
    ["src/pages/api/rooms/[id]/leaderboard.ts", _page26],
    ["src/pages/api/rooms/[id]/ranking.ts", _page27],
    ["src/pages/api/rooms/[id]/state.ts", _page28],
    ["src/pages/api/rooms/[id]/index.ts", _page29],
    ["src/pages/api/rooms/index.ts", _page30],
    ["src/pages/api/scores/history.ts", _page31],
    ["src/pages/api/scores/leaderboard.ts", _page32],
    ["src/pages/api/scores/record.ts", _page33],
    ["src/pages/api/scores/rooms.ts", _page34],
    ["src/pages/api/scores/stats.ts", _page35],
    ["src/pages/favicon.ico.ts", _page36],
    ["src/pages/robots.txt.ts", _page37],
    ["src/pages/sitemap-index.xml.ts", _page38],
    ["src/pages/[lang]/about.astro", _page39],
    ["src/pages/[lang]/create-question.astro", _page40],
    ["src/pages/[lang]/create-room.astro", _page41],
    ["src/pages/[lang]/legal/privacy.astro", _page42],
    ["src/pages/[lang]/legal/terms.astro", _page43],
    ["src/pages/[lang]/my-participations.astro", _page44],
    ["src/pages/[lang]/my-rooms.astro", _page45],
    ["src/pages/[lang]/profile.astro", _page46],
    ["src/pages/[lang]/question-sets.astro", _page47],
    ["src/pages/[lang]/room/[id].astro", _page48],
    ["src/pages/[lang]/rooms/created.astro", _page49],
    ["src/pages/[lang]/rooms/joined.astro", _page50],
    ["src/pages/[lang]/index.astro", _page51]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "21747383-3240-44ec-bc1c-ef8ddfd4bce5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
