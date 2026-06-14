import { AtlasRouter } from 'atlas-web/router';
import { IntroView } from './views/IntroView';
import { ReactivityView } from './views/ReactivityView';
import { DomView } from './views/DomView';
import { RoutingView } from './views/RoutingView';
import { QueryView } from './views/QueryView';
import { LifecycleView } from './views/LifecycleView';
import { ApiView } from './views/ApiView';
import { ErrorView } from './views/ErrorView';
import { TestView } from './views/TestView';
import {DevtoolsView} from "./views/DevtoolsView.ts";

import 'atlas-web/devtools'

const routes = [
    { path: '/', view: IntroView },
    { path: '/reactivity', view: ReactivityView },
    { path: '/dom', view: DomView },
    { path: '/routing', view: RoutingView },
    { path: '/query', view: QueryView },
    { path: '/lifecycle', view: LifecycleView },
    { path: '/devtools', view: DevtoolsView },
    { path: '/api', view: ApiView },
    { path: '/test', view: TestView },
    { path: '*', view: ErrorView },
];

new AtlasRouter({
    rootId: 'app',
    routes,
    basePath: '/atlas-docs'
});