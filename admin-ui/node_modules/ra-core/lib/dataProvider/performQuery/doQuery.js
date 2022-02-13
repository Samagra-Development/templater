"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doQuery = void 0;
var performOptimisticQuery_1 = require("./performOptimisticQuery");
var performUndoableQuery_1 = require("./performUndoableQuery");
var performPessimisticQuery_1 = require("./performPessimisticQuery");
var answerWithCache_1 = require("./answerWithCache");
var replyWithCache_1 = require("../replyWithCache");
/**
 * Execute a dataProvider call
 *
 * Delegates execution to cache, optimistic, undoable, or pessimistic queries
 *
 * @see useDataProvider
 */
var doQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, logoutIfAccessDenied = _a.logoutIfAccessDenied, allArguments = _a.allArguments, store = _a.store, mutationMode = _a.mutationMode;
    var resourceState = store.getState().admin.resources[resource];
    if ((0, replyWithCache_1.canReplyWithCache)(type, payload, resourceState)) {
        return (0, answerWithCache_1.answerWithCache)({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            resourceState: resourceState,
            dispatch: dispatch,
        });
    }
    else if (mutationMode === 'optimistic') {
        return (0, performOptimisticQuery_1.performOptimisticQuery)({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            onFailure: onFailure,
            dataProvider: dataProvider,
            dispatch: dispatch,
            logoutIfAccessDenied: logoutIfAccessDenied,
            allArguments: allArguments,
        });
    }
    else if (mutationMode === 'undoable') {
        return (0, performUndoableQuery_1.performUndoableQuery)({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            onFailure: onFailure,
            dataProvider: dataProvider,
            dispatch: dispatch,
            logoutIfAccessDenied: logoutIfAccessDenied,
            allArguments: allArguments,
        });
    }
    else {
        return (0, performPessimisticQuery_1.performPessimisticQuery)({
            type: type,
            payload: payload,
            resource: resource,
            action: action,
            rest: rest,
            onSuccess: onSuccess,
            onFailure: onFailure,
            dataProvider: dataProvider,
            dispatch: dispatch,
            logoutIfAccessDenied: logoutIfAccessDenied,
            allArguments: allArguments,
        });
    }
};
exports.doQuery = doQuery;
