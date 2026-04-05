/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useCallback } from "react";

// ─── Initial State ─────────────────────────
const initialState = {
  bookmarks: [],        // Array of developer IDs
  messages: [],         // { id, developerId, text, createdAt }
  notifications: [],    // { id, type, text, read, createdAt }
  appliedJobs: [],      // Array of job IDs
  savedJobs: [],        // Array of job IDs
  newsletter: { subscribed: false, email: "" },
};

// ─── Load from localStorage ─────────────────
const STORAGE_KEY = "devconnect_app_state";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently fail
  }
}

// ─── Action Types ─────────────────────────
const ACTIONS = {
  TOGGLE_BOOKMARK: "TOGGLE_BOOKMARK",
  SEND_MESSAGE: "SEND_MESSAGE",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",
  APPLY_JOB: "APPLY_JOB",
  TOGGLE_SAVE_JOB: "TOGGLE_SAVE_JOB",
  SUBSCRIBE_NEWSLETTER: "SUBSCRIBE_NEWSLETTER",
};

// ─── Reducer ─────────────────────────
function appReducer(state, action) {
  let newState;

  switch (action.type) {
    case ACTIONS.TOGGLE_BOOKMARK: {
      const id = action.payload;
      const exists = state.bookmarks.includes(id);
      newState = {
        ...state,
        bookmarks: exists
          ? state.bookmarks.filter((b) => b !== id)
          : [...state.bookmarks, id],
      };
      break;
    }

    case ACTIONS.SEND_MESSAGE: {
      const msg = {
        id: Date.now(),
        developerId: action.payload.developerId,
        text: action.payload.text,
        createdAt: new Date().toISOString(),
      };
      newState = {
        ...state,
        messages: [...state.messages, msg],
        notifications: [
          ...state.notifications,
          {
            id: Date.now() + 1,
            type: "success",
            text: `Message sent successfully!`,
            read: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      break;
    }

    case ACTIONS.ADD_NOTIFICATION: {
      newState = {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: action.payload.type || "info",
            text: action.payload.text,
            read: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      break;
    }

    case ACTIONS.MARK_NOTIFICATION_READ: {
      newState = {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
      break;
    }

    case ACTIONS.CLEAR_NOTIFICATIONS: {
      newState = { ...state, notifications: [] };
      break;
    }

    case ACTIONS.APPLY_JOB: {
      const jobId = action.payload;
      if (state.appliedJobs.includes(jobId)) {
        newState = state;
      } else {
        newState = {
          ...state,
          appliedJobs: [...state.appliedJobs, jobId],
          notifications: [
            ...state.notifications,
            {
              id: Date.now(),
              type: "success",
              text: "Application submitted successfully!",
              read: false,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }
      break;
    }

    case ACTIONS.TOGGLE_SAVE_JOB: {
      const jobId = action.payload;
      const saved = state.savedJobs.includes(jobId);
      newState = {
        ...state,
        savedJobs: saved
          ? state.savedJobs.filter((j) => j !== jobId)
          : [...state.savedJobs, jobId],
      };
      break;
    }

    case ACTIONS.SUBSCRIBE_NEWSLETTER: {
      newState = {
        ...state,
        newsletter: { subscribed: true, email: action.payload },
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: "success",
            text: "Thanks for subscribing to our newsletter!",
            read: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      break;
    }

    default:
      newState = state;
  }

  saveState(newState);
  return newState;
}

// ─── Context ─────────────────────────
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, null, loadState);

  // ── Actions ──
  const toggleBookmark = useCallback(
    (devId) => dispatch({ type: ACTIONS.TOGGLE_BOOKMARK, payload: devId }),
    []
  );

  const isBookmarked = useCallback(
    (devId) => state.bookmarks.includes(devId),
    [state.bookmarks]
  );

  const sendMessage = useCallback(
    (developerId, text) =>
      dispatch({ type: ACTIONS.SEND_MESSAGE, payload: { developerId, text } }),
    []
  );

  const addNotification = useCallback(
    (text, type = "info") =>
      dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: { text, type } }),
    []
  );

  const markNotificationRead = useCallback(
    (id) => dispatch({ type: ACTIONS.MARK_NOTIFICATION_READ, payload: id }),
    []
  );

  const clearNotifications = useCallback(
    () => dispatch({ type: ACTIONS.CLEAR_NOTIFICATIONS }),
    []
  );

  const applyToJob = useCallback(
    (jobId) => dispatch({ type: ACTIONS.APPLY_JOB, payload: jobId }),
    []
  );

  const toggleSaveJob = useCallback(
    (jobId) => dispatch({ type: ACTIONS.TOGGLE_SAVE_JOB, payload: jobId }),
    []
  );

  const isJobSaved = useCallback(
    (jobId) => state.savedJobs.includes(jobId),
    [state.savedJobs]
  );

  const hasApplied = useCallback(
    (jobId) => state.appliedJobs.includes(jobId),
    [state.appliedJobs]
  );

  const subscribeNewsletter = useCallback(
    (email) => dispatch({ type: ACTIONS.SUBSCRIBE_NEWSLETTER, payload: email }),
    []
  );

  const value = {
    ...state,
    toggleBookmark,
    isBookmarked,
    sendMessage,
    addNotification,
    markNotificationRead,
    clearNotifications,
    applyToJob,
    toggleSaveJob,
    isJobSaved,
    hasApplied,
    subscribeNewsletter,
    unreadCount: state.notifications.filter((n) => !n.read).length,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
};

export default AppContext;
