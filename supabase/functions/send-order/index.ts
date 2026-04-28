const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/ctit5rl7r9bd9tpysfqubkx1k66vi641";

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

    const time = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });

    const payload = {
      name,
      phone,
      address,
      service,
      comment: comment || "-",
      time,
    };

    const mkRes = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!mkRes.ok) {
      const errText = await mkRes.text().catch(() => "");
      console.error("Make.com webhook error", mkRes.status, errText);
      return new Response(JSON.stringify({ error: "Webhook delivery failed" }), {
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
