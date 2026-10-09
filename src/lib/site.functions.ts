import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "admin-gate",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

async function requireAdmin() {
  const session = await useSession<{ unlocked?: boolean }>(sessionConfig());
  if (!session.data.unlocked) throw new Error("LOCKED");
}

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("projects")
    .select("id,title,category,description,url,stack,sort_order")
    .order("sort_order")
    .order("created_at");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
});

const messageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .regex(/^\+[0-9\s()-]{3,24}$/, "Invalid phone number")
    .nullish(),
  project_type: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(2000),
});

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((d) => messageSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("contact_messages").insert(data);
    if (error) {
      console.error(error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });

export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"] ?? "";
    const a = createHash("sha256").update(data.password).digest();
    const b = createHash("sha256").update(expected).digest();
    if (!expected || !timingSafeEqual(a, b)) return { ok: false as const };
    const session = await useSession<{ unlocked?: boolean }>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<{ unlocked?: boolean }>(sessionConfig());
  await session.clear();
  return { ok: true };
});

export const getAdminData = createServerFn({ method: "GET" }).handler(async () => {
  try {
    await requireAdmin();
  } catch {
    return { unlocked: false as const };
  }
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [p, m] = await Promise.all([
    supabaseAdmin.from("projects").select("*").order("sort_order").order("created_at"),
    supabaseAdmin.from("contact_messages").select("*").order("created_at", { ascending: false }),
  ]);
  return { unlocked: true as const, projects: p.data ?? [], messages: m.data ?? [] };
});

const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(60),
  description: z.string().trim().max(500),
  url: z.string().trim().url().max(500).refine((u) => /^https?:\/\//.test(u)),
  stack: z.array(z.string().trim().min(1).max(40)).max(12),
  sort_order: z.number().int().min(0).max(9999),
});

export const saveProject = createServerFn({ method: "POST" })
  .inputValidator((d) => projectSchema.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...rest } = data;
    const { error } = id
      ? await supabaseAdmin.from("projects").update(rest).eq("id", id)
      : await supabaseAdmin.from("projects").insert(rest);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteRow = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ id: z.string().uuid(), table: z.enum(["projects", "contact_messages"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
