//IMPORTANT: names starting with an underscore indicate ACTIONS calling BE

/********* NEW *******************/
export const SAY_HI = 'SAY_HI';
export const SAY_BYE = 'SAY_BYE';

/*** UTIL MESSAGES ***/
export const APPLICATION_ERROR = 'APPLICATION_ERROR';
export const APPLICATION_ERROR_CLEARED = 'APPLICATION_ERROR_CLEARED';
export const _HYDRATE_DB = '_HYDRATE_DB';
export const _HYDRATE_MODEL = '_HYDRATE_MODEL';
export const _HYDRATE_COMPLETE = '_HYDRATE_COMPLETE';
export const LOGIN = 'LOGIN';
export const _UPDATE_AUTH = '_UPDATE_AUTH';
export const UNSUBSCRIBE_FROM_RPC_REPLY_TO_QUEUE = 'UNSUBSCRIBE_FROM_RPC_REPLY_TO_QUEUE';
export const INIT_COMPLETE = 'INIT_COMPLETE';
export const INIT_SESSION = 'INIT_SESSION';
export const OPEN_SESSION = 'OPEN_SESSION';
export const CLOSE_SESSION = 'CLOSE_SESSION';
export const _OPEN_SESSION = '_OPEN_SESSION';
export const _CLOSE_SESSION = '_CLOSE_SESSION';
export const REGISTER_EPIC = 'REGISTER_EPIC';
export const REGISTERED_EPIC = 'REGISTERED_EPIC';
export const ALLOW_BROADCAST = 'ALLOW_BROADCAST';
export const UPDATE_RECEIVED = 'UPDATE_RECEIVED';
export const UPDATE_RESOLVED = 'UPDATE_RESOLVED';

/********* Headers ***************/
export const CORRELATION_ID_HDR = 'correlation-id';
export const RESPONSE_TYPE_HDR = 'response-type';
export const RECEIVER_HDR = 'receiver';
export const STATUS_CODE_HDR = 'status-code';
export const ERROR_CODE_HDR = 'code';


/********* CRUD ***************/
/*** REQUEST MESSAGES ***/
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_ERROR_RECEIVED = 'MESSAGE_ERROR_RECEIVED';

export const _CREATE_ITEM = '_CREATE_ITEM';
export const _READ_ITEM = '_READ_ITEM';
export const _READ_ITEMS = '_READ_ITEMS';
export const _UPDATE_ITEM = '_UPDATE_ITEM';
export const _DELETE_ITEM = '_DELETE_ITEM';
export const _DELETE_ITEMS = '_DELETE_ITEMS';
export const _UPDATE_ITEMS = '_UPDATE_ITEMS';
export const INCOMING_ERROR = "Hydrate DB error when processing incoming message";
export const OUTGOING_ERROR = "Hydrate DB error when sending message";
export const INCOMING_MSG_IGNORED_BY_CRUD = 'INCOMING_MESSAGE_IGNORED_BY_CRUD';
export const INCOMING_MSG_IGNORED_BY_HYDRATE = 'INCOMING_MSG_IGNORED_BY_HYDRATE';
export const INCOMING_MSG_IGNORED_BY_CHUNK = 'INCOMING_MSG_IGNORED_BY_CHUNK';
export const INCOMING_MSG_IGNORED_BY_INFINITE_SCROLL = 'INCOMING_MSG_IGNORED_BY_INFINITE_SCROLL';
export const INCOMING_MSG_IGNORED_BY_EXPORT_DATA = 'INCOMING_MSG_IGNORED_BY_EXPORT_DATA';
export const INCOMING_MSG_IGNORED_BY_TARGET_TYPES = 'INCOMING_MSG_IGNORED_BY_TARGET_TYPES';
export const INCOMING_MSG_IGNORED_BY_BROADCAST = 'INCOMING_MSG_IGNORED_BY_BROADCAST';
export const INCOMING_ERROR_IGNORED_BY_CRUD = 'INCOMING_ERROR_IGNORED_BY_CRUD';


/*** RESPONSE MESSAGES ***/
export const _CREATE_ITEM_RESPONSE = '_CREATE_ITEM_RESPONSE';
export const _READ_ITEM_RESPONSE = '_READ_ITEM_RESPONSE';
export const _READ_ITEMS_RESPONSE = '_READ_ITEMS_RESPONSE';
export const _UPDATE_ITEM_RESPONSE = '_UPDATE_ITEM_RESPONSE';
export const _UPDATE_ITEMS_RESPONSE = '_UPDATE_ITEMS_RESPONSE';
export const _DELETE_ITEM_RESPONSE = '_DELETE_ITEM_RESPONSE';
export const _DELETE_ITEMS_RESPONSE = '_DELETE_ITEMS_RESPONSE';
export const DELETE_BROADCAST_RECEIVED = 'DELETE_BROADCAST_RECEIVED';

/*** CRUD EPIC ERROR TYPES ***/
export const CRUD_INCOMING_ERROR_ERROR = "DB error when processing incoming message error";
export const CRUD_INCOMING_ERROR = "DB error when processing incoming message";
export const CRUD_OUTGOING_ERROR = "DB error when sending message";

/********* Engagement ***************/
export const DELETE_ENGAGEMENT = 'DELETE_ENGAGEMENT';
export const _CREATE_ENGAGEMENT = '_CREATE_ENGAGEMENT';
export const _UPDATE_ENGAGEMENT = '_UPDATE_ENGAGEMENT';
export const _EXPORT_ENGAGEMENT = '_EXPORT_ENGAGEMENT';
export const _EXPORT_ENGAGEMENT_RESPONSE = '_EXPORT_ENGAGEMENT_RESPONSE';
export const EXPORT_MESSAGE_RECEIVED = 'EXPORT_MESSAGE_RECEIVED';

/********* Tasks ***************/
export const _REORDER_TASKS = '_REORDER_TASKS';
export const _REORDER_TASKS_RESPONSE = '_REORDER_TASKS_RESPONSE';

/********* Steps ***************/
export const _REORDER_STEPS = '_REORDER_STEPS';
export const _REORDER_STEPS_RESPONSE = '_REORDER_STEPS_RESPONSE';

/********* Pagination ***************/
export const CLEAR_PAGINATION = 'CLEAR_PAGINATION';

/********* User ***************/
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REFRESH_USER = 'REFRESH_USER';
export const DELETE_USER = 'DELETE_USER';
export const ADD_OR_UPDATE_USER = 'ADD_OR_UPDATE_USER';
export const _GET_USER = '_GET_USER';
export const _GET_USER_RESPONSE = '_GET_USER_RESPONSE';
export const _CREATE_USER = '_CREATE_USER';
export const _CREATE_USER_RESPONSE = '_CREATE_USER_RESPONSE';
export const _UPDATE_USER = '_UPDATE_USER';
export const _UPDATE_USER_RESPONSE = '_UPDATE_USER_RESPONSE';
export const _DELETE_USER = '_DELETE_USER';
export const _DELETE_USER_RESPONSE = '_DELETE_USER_RESPONSE';
export const _SET_USER_PASSWORD = '_SET_USER_PASSWORD';
export const _SET_USER_PASSWORD_RESPONSE = '_SET_USER_PASSWORD_RESPONSE';

/********* File ***************/
export const SET_FILE_BROWSER_WORKSPACE = 'SET_FILE_BROWSER_WORKSPACE';
export const SET_FILE_BROWSER_OPEN_FILES = 'SET_FILE_BROWSER_OPEN_FILES';
export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
export const DELETE_FILE = 'DELETE_FILE';

/********* Chunk ***************/
export const _READ_CHUNKED_DATA = '_READ_CHUNKED_DATA';

/********* Infinite Scroll ***************/
export const LOAD_INFINITE_SCROLL_DATA = '_LOAD_INFINITE_SCROLL_DATA';
export const _LOAD_EXPORT_DATA = '_LOAD_EXPORT_DATA';
export const EXPORT_DATA_RECEIVED = 'EXPORT_DATA_RECEIVED';
export const READ_EXPORT_DATA_COMPLETE = 'READ_EXPORT_DATA_COMPLETE';

/********* Target List ***************/
export const GET_TARGET_TYPES = 'GET_TARGET_TYPES';
export const _GET_TARGET_TYPES_RESPONSE = '_GET_TARGET_TYPES_RESPONSE';
export const GET_TARGET_TYPES_RECEIVED = 'GET_TARGET_TYPES_RECEIVED';
export const GET_TARGET_TYPES_COMPLETE = 'GET_TARGET_TYPES_COMPLETE';
export const ADD_OR_UPDATE_TARGET = 'ADD_OR_UPDATE_TARGET';
export const DELETE_ALL_TARGET = 'DELETE_ALL_TARGET';
export const DELETE_TARGET = 'DELETE_TARGET';

/********* Credentials ***************/
export const ADD_OR_UPDATE_CREDENTIALS = 'ADD_OR_UPDATE_CREDENTIALS';
export const DELETE_ALL_CREDENTIALS = 'DELETE_ALL_CREDENTIALS';
export const DELETE_CREDENTIALS = 'DELETE_CREDENTIALS';

/********* OpLogEntry ****************/
export const ADD_OR_UPDATE_OPLOGENTRY = 'ADD_OR_UPDATE_OPLOGENTRY';
export const DELETE_ALL_OPLOGENTRY = 'DELETE_ALL_OPLOGENTRY';
export const DELETE_OPLOGENTRY = 'DELETE_OPLOGENTRY';

/********* Records *******************/
export const ADD_OPEN_TAB = 'ADD_OPEN_TAB';
export const REMOVE_OPEN_TAB = 'REMOVE_OPEN_TAB';
