const STATIC = {
  MAIN: "/",
  NOTE: "/note",
};

const DYNAMIC = {
  NOTE_ID: "/note/:id",
};

export const PATH = {
  ...STATIC,
  ...DYNAMIC,
} as const;
