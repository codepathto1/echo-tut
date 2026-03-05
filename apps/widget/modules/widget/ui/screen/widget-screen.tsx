// "use client";
import { WidgetHeader } from "@/modules/widget/components/widget-header";
import { useForm, Controller } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Field, FieldGroup, FieldLabel, FieldError, FieldSet } from "@workspace/ui/components/field";

import { Doc } from "@workspace/backend/_generated/dataModel";

import { api } from "@workspace/backend/_generated/api";
import { useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdFamily, organizationIdAtom } from "../../atoms/screen-atom";

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
});

//Temporary fix before implementing actual one
// const organizationId = "123";

export const WidgetAuthScreen = () => {
  const organizationId = useAtomValue(organizationIdAtom);
  const setContactSessionId = useSetAtom(contactSessionIdFamily(organizationId || ""));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const createContactSession = useMutation(api.public.contactSession.create);
  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!organizationId) return;
    const metadata: Doc<"contactSession">["metaData"] = {
      userAgent: navigator?.userAgent,
      language: navigator?.language,
      // languages:navigator.languages.join(","),
      platform: navigator?.platform,
      vendor: navigator?.vendor,
      screenResolution: `${screen.width} x ${screen.height}`,
      viewPortSize: `${window.innerWidth} x ${window.innerHeight}`,
      cookiesEnabled: navigator?.cookieEnabled,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      currentUrl: window.location.href,
      referrer: document.referrer || "direct",
    };
    const contactSessionId = await createContactSession({ ...data, organizationId, metadata });
    // console.log(contactSessionId);
    setContactSessionId(contactSessionId);
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-4 font-semibold">
          <p className="text-3xl">Hi there!👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="w-full  mt-3 max-w-lg h-full p-4 border shadow-xl rounded-md items-center justify-center mx-auto">
        <form id="form-get-started" onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FieldGroup>
            <FieldSet>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="e.g. John Doe"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && <FieldError errors={[{ message: fieldState?.error?.message }]} />}
                  </Field>
                )}
              />
            </FieldSet>
            <FieldSet>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      autoComplete="off"
                      type="email"
                      placeholder="johndoe@gmail.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && <FieldError errors={[{ message: fieldState.error.message }]} />}
                  </Field>
                )}
              />
            </FieldSet>
          </FieldGroup>
        </form>
        <div className="p-2 my-1 flex items-center justify-between lg:max-w-sm flex-1 w-full mx-auto">
          <Field>
            <div className="flex  flex-row gap-2">
              <Button
                type="submit"
                variant="default"
                form="form-get-started"
                className="flex-1 bg-blue-500 hover:bg-blue-500/85! cursor-pointer"
                disabled={form.formState.isSubmitting}>
                Start
              </Button>
              <Button type="reset" onClick={() => form.reset()} variant="destructive" className="flex-1">
                Clear
              </Button>
            </div>
          </Field>
        </div>
      </div>
    </>
  );
};
