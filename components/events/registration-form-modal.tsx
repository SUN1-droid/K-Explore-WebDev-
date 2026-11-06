"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, CircleCheckBig, User, Mail, Phone, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENTS, type EventItem } from "@/lib/events";
import { cn } from "@/lib/utils";

type RegistrationFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEvent: EventItem | null;
  onSubmitted?: () => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventId: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: "", email: "", phone: "", eventId: "" };

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
    errors.name = "Name can only contain letters and spaces.";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (digits.length !== 10) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }

  if (!form.eventId) {
    errors.eventId = "Please select an event.";
  }

  return errors;
}

export function RegistrationFormModal({
  open,
  onOpenChange,
  selectedEvent,
  onSubmitted,
}: RegistrationFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync the selected event when the modal opens / event changes.
  useEffect(() => {
    if (open) {
      setSuccess(false);
      setSubmitted(false);
      setErrors({});
      setForm({
        name: "",
        email: "",
        phone: "",
        eventId: selectedEvent?.id ?? "",
      });
    }
  }, [open, selectedEvent]);

  const registeredEvent = useMemo(
    () => EVENTS.find((e) => e.id === form.eventId) ?? null,
    [form.eventId],
  );

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitted) {
      setErrors(validate({ ...form, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSuccess(true);
      onSubmitted?.();
    }
  };

  const handleClose = (next: boolean) => {
    if (!next) {
      setSuccess(false);
      setSubmitted(false);
      setErrors({});
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[92vh] w-full max-w-md overflow-y-auto p-0 sm:max-w-md">
        <div className="p-5 sm:p-6">
          <DialogTitle className="text-lg font-bold text-foreground">
            {success ? "Registration Confirmed" : "Register for an Event"}
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            {success
              ? "Here's a summary of your registration."
              : "Fill in your details below — it only takes a minute."}
          </DialogDescription>

          {success ? (
            <SuccessView form={form} event={registeredEvent} onDone={() => handleClose(false)} />
          ) : (
            <form noValidate onSubmit={handleSubmit} className="mt-5 space-y-4">
              <Field
                label="Full Name"
                icon={<User className="size-4" />}
                error={errors.name}
              >
                <Input
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  className="h-10 rounded-lg pl-9"
                />
              </Field>

              <Field
                label="Email Address"
                icon={<Mail className="size-4" />}
                error={errors.email}
              >
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  className="h-10 rounded-lg pl-9"
                />
              </Field>

              <Field
                label="Phone Number"
                icon={<Phone className="size-4" />}
                error={errors.phone}
              >
                <Input
                  type="tel"
                  placeholder="5551234567"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={11}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  className="h-10 rounded-lg pl-9"
                />
              </Field>

              <Field
                label="Select Event"
                icon={<Calendar className="size-4" />}
                error={errors.eventId}
              >
                <select
                  value={form.eventId}
                  onChange={(e) => update("eventId", e.target.value)}
                  aria-invalid={!!errors.eventId}
                  className={cn(
                    "h-10 w-full rounded-lg border border-input bg-transparent pl-9 pr-3 text-sm text-foreground transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
                    errors.eventId && "border-destructive",
                  )}
                >
                  <option value="" disabled>
                    Choose an event…
                  </option>
                  {EVENTS.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Button
                type="submit"
                size="lg"
                className="h-11 w-full rounded-xl text-sm font-semibold shadow-sm"
              >
                Confirm Registration
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We'll never share your details. By registering you agree to
                our terms.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}

function SuccessView({
  form,
  event,
  onDone,
}: {
  form: FormState;
  event: EventItem | null;
  onDone: () => void;
}) {
  return (
    <div className="mt-6 text-center">
      <div className="checkmark-wrap mx-auto mb-4 grid size-20 place-items-center rounded-full bg-primary/10">
        <span className="checkmark grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6" />
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground">
        You're registered! 🎉
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        A confirmation email is on its way to{" "}
        <span className="font-medium text-foreground">{form.email}</span>.
      </p>

      <div className="mt-5 space-y-2 rounded-2xl bg-muted/50 p-4 text-left ring-1 ring-border">
        <SummaryRow icon={<User className="size-4" />} label="Name" value={form.name} />
        <SummaryRow icon={<Mail className="size-4" />} label="Email" value={form.email} />
        <SummaryRow icon={<Phone className="size-4" />} label="Phone" value={form.phone} />
        {event && (
          <>
            <SummaryRow
              icon={<Calendar className="size-4" />}
              label="Event"
              value={event.name}
            />
            <SummaryRow
              icon={<CircleCheckBig className="size-4" />}
              label="Price"
              value={event.price === 0 ? "Free" : `$${event.price}`}
            />
          </>
        )}
      </div>

      <Button
        size="lg"
        className="mt-5 h-11 w-full rounded-xl text-sm font-semibold"
        onClick={onDone}
      >
        Done
      </Button>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
