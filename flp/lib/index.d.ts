import { AppRuntimeConfig, IAppRuntime } from './internal/app-runtime';
import { ICommon } from './internal/commons';
import { AppRuntimeHandlers } from './flp-handlers';
import { INavigation } from './nav';
import { IShellUi } from './shell-ui';
import { IUserInfo } from './user-info';
export interface AppRuntimeFacade extends ICommon, IAppRuntime, INavigation, IShellUi, IUserInfo {
    use(handlers: AppRuntimeHandlers): AppRuntimeFacade;
    destroy(): void;
    init(cfg?: AppRuntimeConfig): AppRuntimeFacade;
    _destroyHandlers?(): void;
}
declare const facade: AppRuntimeFacade;
export default facade;
