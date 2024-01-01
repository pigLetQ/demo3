import HandlersController from './handlers.js';
import { IPlatformConstants } from './platform.js';
import { ETargetPlatform } from './types.js';
export type THooksFn = (handler: Function, deps?: any[]) => void;
export declare const reactContext: import("preact").Context<IElementContext | null>;
export interface IElementContext {
    instance: any;
    handlersController: HandlersController;
    ifServerRender?: boolean;
    debugLog?: (...args: any[]) => void;
    platformConfig: IPlatformConstants;
}
export declare function useStableCallback<T extends Function>(callback: T): T;
export declare function useEvent(name: string, handler: Function, 
/**
 * @deprecated
 * 以后无需依赖，这个只是为了让之前的代码 ts 不报错
 */
deps?: any[]): void;
export declare function getLifeCycleHooks(eventName: string, disableMultiImpl?: boolean, specifyPlatform?: ETargetPlatform): THooksFn;
export declare function useSyncMiniData(data?: {}): void;
declare function useMiniInstance<T = any>(): T;
export declare const usePage: typeof useMiniInstance;
export declare const useComponent: typeof useMiniInstance;
export {};
