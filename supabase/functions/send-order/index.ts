const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/ctit5rl7r9bd9tpysfqubkx1k66vi641";
const TELEGRAM_BOT_TOKEN = "8305847298:AAHobHyDKaUP8B1pJHODyQ6ez-sjffNQAZI";
const TELEGRAM_CHAT_ID = "-1003857437450";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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
      return new Response(JSON.stringify({ error: "Invalid name" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!/^\+998\d{9}$/.test(phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!address || address.length > 200) {
      return new Response(JSON.stringify({ error: "Invalid address" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!service || service.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid service" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (comment.length > 500) {
      return new Response(JSON.stringify({ error: "Comment too long" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const now = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });

    const escape = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const text =
      `🛠 <b>YANGI BUYURTMA</b>\n\n` +
      `👤 <b>Ism:</b> ${escape(name)}\n` +
      `📞 <b>Telefon:</b> ${escape(phone)}\n` +
      `📍 <b>Manzil:</b> ${escape(address)}\n` +
      `🔧 <b>Xizmat:</b> ${escape(service)}\n` +
      `📝 <b>Izoh:</b> ${escape(comment || "-")}\n` +
      `⏰ <b>Vaqt:</b> ${escape(now)}`;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      },
    );

    if (!tgRes.ok) {
      const errText = await tgRes.text().catch(() => "");
      console.error("Telegram error", tgRes.status, errText);
      // Fallback: Make.com webhook
      try {
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, address, service, comment: comment || "-", time: now }),
        });
      } catch (_) {}
      return new Response(JSON.stringify({ error: "Telegram delivery failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Also mirror to Make.com webhook (non-blocking)
    fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, address, service, comment: comment || "-", time: now }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-order error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
