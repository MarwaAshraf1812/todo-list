/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_tasks_addTask from "../functions/tasks/addTask.js";
import type * as functions_tasks_deleteTask from "../functions/tasks/deleteTask.js";
import type * as functions_tasks_getTasks from "../functions/tasks/getTasks.js";
import type * as functions_tasks_updateTask from "../functions/tasks/updateTask.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/tasks/addTask": typeof functions_tasks_addTask;
  "functions/tasks/deleteTask": typeof functions_tasks_deleteTask;
  "functions/tasks/getTasks": typeof functions_tasks_getTasks;
  "functions/tasks/updateTask": typeof functions_tasks_updateTask;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
