import { WidgetScreen } from "@/modules/types";
import { atom } from "jotai";
import { atomFamily } from "jotai-family";
import { atomWithStorage } from "jotai/utils";
import { CONTACT_SESSION_KEY } from "../constants";
import { Id } from "@workspace/backend/_generated/dataModel";

export const ScreenAtom = atom<WidgetScreen>("loading");
// export const screenAtom = atom<string | null>(null);
export const errorMessageAtom = atom<string | null>(null);
export const loadingMessageAtom = atom<string | null>(null);
export const organizationIdAtom = atom<string | null>(null);
export const contactSessionIdFamily = atomFamily((organizationId: string) =>
  atomWithStorage<Id<"contactSession"> | null>(`${CONTACT_SESSION_KEY}_${organizationId}`, null),
);
