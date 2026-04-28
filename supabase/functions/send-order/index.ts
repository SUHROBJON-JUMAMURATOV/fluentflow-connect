const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/ctit5rl7r9bd9tpysfqubkx1k66vi641";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const name = (body.name ?? "").toString().trim();
    const phone = (body.phone ?? "").toString().trim();
    const address = (body.address ?? "").toString().trim();
    const service = (body.service ?? "").toString().trim();
    const comment = (body.comment ?? "").toString().trim();

    if (!name || name.length > 100) {
      return jsonResponse({ error: "Invalid name" }, 400);
    }
    if (!/^\+998\d{9}$/.test(phone)) {
      return jsonResponse({ error: "Invalid phone" }, 400);
    }
    if (!address || address.length > 200) {
      return jsonResponse({ error: "Invalid address" }, 400);
    }
    if (!service || service.length > 100) {
      return jsonResponse({ error: "Invalid service" }, 400);
    }
    if (comment.length > 500) {
      return jsonResponse({ error: "Comment too long" }, 400);
    }

    const time = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });
    const safeComment = comment || "-";
    const subject = "🛠 YANGI BUYURTMA";
    const text = `${subject}\n\n👤 Ism: ${name}\n\n📞 Telefon: ${phone}\n\n📍 Manzil: ${address}\n\n🔧 Xizmat: ${service}\n\n📝 Izoh: ${safeComment}\n\n⏰ Vaqt: ${time}`;
    const html = text
      .split("\n")
      .map((line) => escapeHtml(line))
      .join("<br>");

    const payload = {
      subject,
      name,
      phone,
      address,
      service,
      comment: safeComment,
      time,
      text,
      message: text,
      html,
    };

    const mkRes = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: new URLSearchParams(payload).toString(),
    });

    if (!mkRes.ok) {
      const errText = await mkRes.text().catch(() => "");
      console.error("Make.com webhook error", mkRes.status, errText);
      return jsonResponse({ error: "Webhook delivery failed" }, 502);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error("send-order error:", err);
    return jsonResponse({ error: "Server error" }, 500);
  }
});
