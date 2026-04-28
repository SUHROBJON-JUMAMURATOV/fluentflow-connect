const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/ctit5rl7r9bd9tpysfqubkx1k66vi641";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

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

    const timeParts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tashkent",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const part = (type: string) =>
      timeParts.find((item) => item.type === type)?.value ?? "";
    const time = `${part("day")}-${part("month")}-${part("year")} ${part("hour")}:${part("minute")}`;
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
      Subject: subject,
      Text: text,
      Message: text,
      "HTML content": html,
      content: text,
      body: text,
      telegram_text: text,
      plain_text: text,
      order: {
        name,
        phone,
        address,
        service,
        comment: safeComment,
        time,
      },
      form: {
        name,
        phone,
        address,
        service,
        comment: safeComment,
        time,
      },
      Ism: name,
      Telefon: phone,
      Manzil: address,
      Xizmat: service,
      Izoh: safeComment,
      Vaqt: time,
    };

    const deliveries = await Promise.allSettled([
      fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(payload),
      }),
      TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID
        ? fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text,
              disable_web_page_preview: true,
            }),
          })
        : Promise.resolve(new Response("Telegram secrets are not configured", { status: 204 })),
    ]);

    const makeDelivery = deliveries[0];
    const telegramDelivery = deliveries[1];
    const makeOk = makeDelivery.status === "fulfilled" && makeDelivery.value.ok;
    const telegramOk =
      telegramDelivery.status === "fulfilled" && telegramDelivery.value.ok;

    if (!makeOk) {
      const status = makeDelivery.status === "fulfilled" ? makeDelivery.value.status : "network";
      console.error("Make.com webhook delivery failed", status);
    }

    if (!telegramOk && TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const status =
        telegramDelivery.status === "fulfilled" ? telegramDelivery.value.status : "network";
      console.error("Telegram delivery failed", status);
    }

    if (!makeOk && !telegramOk) {
      return jsonResponse({ error: "Order delivery failed" }, 502);
    }

    return jsonResponse({ success: true, make: makeOk, telegram: telegramOk });
  } catch (err) {
    console.error("send-order error:", err);
    return jsonResponse({ error: "Server error" }, 500);
  }
});
