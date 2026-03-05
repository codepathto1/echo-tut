"use client";
import { WidgetHeader } from "@/modules/widget/components/widget-header";
import {
  contactSessionIdFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  ScreenAtom,
} from "@/modules/widget/atoms/screen-atom";
import { useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type InitStep = "org" | "session" | "settings" | "done" | "vapi";
export const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setScreen = useSetAtom(ScreenAtom);
  const contactSessionId = useAtomValue(contactSessionIdFamily(organizationId || ""));

  const validateOrganization = useAction(api.public.organizations.validate);
  const validateContactSession = useMutation(api.public.contactSession.validate);

  useEffect(() => {
    if (step !== "org") {
      return;
    }
    setLoadingMessage("Loading Organization ID...");
    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
      return;
    }
    setLoadingMessage("Validating Organization ID...");
    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "Invalid Organization ID");
          setScreen("error");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message || "unable to verify organizationId");
        setScreen("error");
      });
  }, [step, organizationId, setOrganizationId, validateOrganization, setErrorMessage, setLoadingMessage, setScreen]);

  //step 2

  useEffect(() => {
    if (step !== "session") {
      return;
    }
    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }
    setLoadingMessage("Validating Contact Session...");
    validateContactSession({ contactSessionId: contactSessionId })
      .then((result) => {
        setLoadingMessage("LoadingContact Session...");

        setSessionValid(result.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [step, validateContactSession, contactSessionId, setLoadingMessage]);

  useEffect(() => {
    if (step !== "done") return;
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid, setScreen]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-4 font-semibold">
          <p className="text-3xl">Hi there!👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-5 items-center justify-center">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage || "Loading ... "}</p>
      </div>
    </>
  );
};
