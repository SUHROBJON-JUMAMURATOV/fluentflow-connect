import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Check, User, Phone, MapPin, MessageSquare, Wrench } from "lucide-react";

type Status = "idle" | "submitting" | "success";
type ServiceKey = "faucet" | "pipe" | "drain" | "leak";

const SERVICE_KEYS: ServiceKey[] = ["faucet", "pipe", "drain", "leak"];

export function OrderForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "+998",
    address: "",
    service: "" as ServiceKey | "",
    comment: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handlePhoneChange = (v: string) => {
    let digits = v.replace(/\D/g, "");
    if (digits.startsWith("998")) digits = digits.slice(3);
    digits = digits.slice(0, 9);
    update("phone", "+998" + digits);
  };

  const reset = () =>
    setForm({ name: "", phone: "+998", address: "", service: "", comment: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!form.name.trim() || !form.address.trim() || !form.service) {
      toast.error(t.errors.required);
      return;
    }
    if (!/^\+998\d{9}$/.test(form.phone)) {
      toast.error(t.errors.phone);
      return;
    }

    setStatus("submitting");
    try {
      const serviceLabel = t.services.items[form.service as ServiceKey];
      const { data, error } = await supabase.functions.invoke("send-order", {
        body: {
          name: form.name.trim(),
          phone: form.phone,
          address: form.address.trim(),
          service: serviceLabel,
          comment: form.comment.trim(),
        },
      });

      if (error || (data && (data as { error?: string }).error)) {
        throw new Error(
          (data as { error?: string })?.error ?? error?.message ?? "fail"
        );
      }

      setStatus("success");
      toast.success(t.success.title, { description: t.success.desc });
      reset();
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      console.error("Order submit failed:", err);
      toast.error(t.errors.generic, { description: t.errors.retry });
      setStatus("idle");
    }
  };

  return (
    <section id="order" className="container py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.form.title}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">{t.form.subtitle}</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          {status === "success" && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-card/95 backdrop-blur animate-scale-in">
              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success">
                  <svg viewBox="0 0 52 52" className="h-12 w-12">
                    <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <path
                      d="M14 27 l8 8 l16 -18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 60,
                        strokeDashoffset: 60,
                        animation: "draw-check 0.6s 0.15s forwards ease-out",
                      }}
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-2xl font-bold">{t.success.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.success.desc}</p>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2">
            <Field label={t.form.name} icon={<User className="h-4 w-4" />} required>
              <Input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                maxLength={100}
                placeholder={t.form.name}
                required
              />
            </Field>

            <Field label={t.form.phone} icon={<Phone className="h-4 w-4" />} required>
              <Input
                value={form.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                inputMode="tel"
                placeholder="+998XXXXXXXXX"
                required
              />
            </Field>

            <Field
              label={t.form.address}
              icon={<MapPin className="h-4 w-4" />}
              required
              className="sm:col-span-2"
            >
              <Input
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                maxLength={200}
                placeholder={t.form.address}
                required
              />
            </Field>

            <Field
              label={t.form.service}
              icon={<Wrench className="h-4 w-4" />}
              required
              className="sm:col-span-2"
            >
              <Select
                value={form.service}
                onValueChange={(v) => update("service", v as ServiceKey)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.form.selectService} />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_KEYS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {t.services.items[k]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field
              label={`${t.form.comment} (${t.form.commentOptional})`}
              icon={<MessageSquare className="h-4 w-4" />}
              className="sm:col-span-2"
            >
              <Textarea
                value={form.comment}
                onChange={(e) => update("comment", e.target.value)}
                maxLength={500}
                rows={3}
                placeholder={t.form.comment}
              />
            </Field>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={status === "submitting"}
                className="btn-shine w-full"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.form.sending}
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    {t.form.submit}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  required,
  children,
  className,
}: {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground/80">
        <span className="text-primary">{icon}</span>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}