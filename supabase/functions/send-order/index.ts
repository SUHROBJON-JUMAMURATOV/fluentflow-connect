import { corsHeaders } from "@supabase/supabase-js/cors";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!BOT_TOKEN || !CHAT_ID) {
      return new Response(JSON.stringify({ error: "Telegram is not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

    const text =
      `🛠 <b>NEW ORDER / НОВЫЙ ЗАКАЗ / YANGI BUYURTMA</b>\n\n` +
      `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
      `📞 <b>Phone:</b> ${escapeHtml(phone)}\n` +
      `📍 <b>Address:</b> ${escapeHtml(address)}\n` +
      `🔧 <b>Service:</b> ${escapeHtml(service)}\n` +
      `📝 <b>Comment:</b> ${escapeHtml(comment || "-")}\n\n` +
      `⏰ <b>Time:</b> ${escapeHtml(now)}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    });

    const tgData = await tgRes.json();
    if (!tgRes.ok || !tgData.ok) {
      console.error("Telegram error", tgData);
      return new Response(JSON.stringify({ error: "Telegram delivery failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
