import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Lock, LogOut, Mail, Pencil, Plus, Trash2, ExternalLink } from "lucide-react";
import { deleteRow, getAdminData, lockAdmin, saveProject, unlockAdmin } from "@/lib/site.functions";
import { previewImage } from "@/lib/preview";

export const Route = createFileRoute("/admin")({
  ssr: false,
  loader: () => getAdminData(),
  head: () => ({
    meta: [
      { title: "Admin | Husainraza Merchant" },
      { name: "description", content: "Private admin panel for managing projects and messages." },
      { property: "og:title", content: "Admin | Husainraza Merchant" },
      { property: "og:description", content: "Private admin panel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
  errorComponent: ({ error }) => <div className="p-10 text-white">Error: {error.message}</div>,
});

type Project = {
  id?: string;
  title: string;
  category: string;
  description: string;
  url: string;
  stack: string[];
  sort_order: number;
};

const input =
  "w-full rounded-lg border border-white/10 bg-[#11121C] px-3 py-2 text-sm text-white outline-none focus:border-violet-400/60";

function AdminPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const unlock = useServerFn(unlockAdmin);
  const lock = useServerFn(lockAdmin);
  const [error, set_error] = useState(false);
  const [tab, set_tab] = useState<"projects" | "messages">("projects");
  const [editing, set_editing] = useState<Project | null>(null);

  if (!data.unlocked) {
    async function on_submit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const password = String(new FormData(e.currentTarget).get("password") ?? "");
      const res = await unlock({ data: { password } });
      if (res.ok) router.invalidate();
      else set_error(true);
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0C15] px-4">
        <form onSubmit={on_submit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#171822] p-8">
          <Lock className="mb-4 text-[#A78BFA]" />
          <h1 className="mb-6 text-2xl font-bold text-white">Admin access</h1>
          <input name="password" type="password" placeholder="Password" className={input} autoFocus />
          {error && <p className="mt-2 text-sm text-rose-400">Incorrect password</p>}
          <button className="mt-4 w-full rounded-lg bg-[#7C5CFF] py-2 font-semibold text-white">Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C15] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin panel</h1>
          <button
            onClick={async () => {
              await lock();
              router.invalidate();
            }}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm"
          >
            <LogOut size={16} /> Lock
          </button>
        </div>
        <div className="mb-6 flex gap-2">
          {(["projects", "messages"] as const).map((t) => (
            <button
              key={t}
              onClick={() => set_tab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-[#7C5CFF]" : "bg-white/5"}`}
            >
              {t} ({t === "projects" ? data.projects.length : data.messages.length})
            </button>
          ))}
        </div>

        {tab === "projects" ? (
          <>
            <button
              onClick={() =>
                set_editing({ title: "", category: "WEBSITE", description: "", url: "", stack: [], sort_order: data.projects.length + 1 })
              }
              className="mb-6 flex items-center gap-2 rounded-lg bg-[#7C5CFF] px-4 py-2 text-sm font-semibold"
            >
              <Plus size={16} /> Add project
            </button>
            {editing && <ProjectForm project={editing} onDone={() => { set_editing(null); router.invalidate(); }} />}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#171822]">
                  <img src={previewImage(p.url)} alt={p.title} className="h-44 w-full object-cover object-top" loading="lazy" />
                  <div className="p-4">
                    <p className="text-[10px] tracking-widest text-[#9E9EB5]">{p.category}</p>
                    <h3 className="font-bold">{p.title}</h3>
                    <a href={p.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 truncate text-xs text-[#B9A7FF]">
                      {p.url} <ExternalLink size={12} />
                    </a>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => set_editing(p)} className="flex items-center gap-1 rounded-md bg-white/5 px-3 py-1.5 text-xs">
                        <Pencil size={12} /> Edit
                      </button>
                      <DeleteBtn id={p.id} table="projects" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {data.messages.length === 0 && <p className="text-[#9999B0]">No messages yet.</p>}
            {data.messages.map((m) => (
              <div key={m.id} className="rounded-2xl border border-white/10 bg-[#171822] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold">{m.name}</p>
                    <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-sm text-[#B9A7FF]">
                      <Mail size={13} /> {m.email}
                    </a>
                  </div>
                  <div className="text-right text-xs text-[#9999B0]">
                    <p>{m.project_type}</p>
                    <p>{new Date(m.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-[#CFCFDC]">{m.message}</p>
                <div className="mt-3"><DeleteBtn id={m.id} table="contact_messages" /></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DeleteBtn({ id, table }: { id: string; table: "projects" | "contact_messages" }) {
  const del = useServerFn(deleteRow);
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        if (!confirm("Delete this?")) return;
        await del({ data: { id, table } });
        router.invalidate();
      }}
      className="flex items-center gap-1 rounded-md bg-rose-500/10 px-3 py-1.5 text-xs text-rose-300"
    >
      <Trash2 size={12} /> Delete
    </button>
  );
}

function ProjectForm({ project, onDone }: { project: Project; onDone: () => void }) {
  const save = useServerFn(saveProject);
  const [err, set_err] = useState("");
  async function on_submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    let url = String(f.get("url") ?? "").trim();
    if (url && !/^https?:\/\//.test(url)) url = `https://${url}`;
    try {
      await save({
        data: {
          id: project.id,
          title: String(f.get("title")),
          category: String(f.get("category")).toUpperCase(),
          description: String(f.get("description")),
          url,
          stack: String(f.get("stack")).split(",").map((s) => s.trim()).filter(Boolean),
          sort_order: Number(f.get("sort_order")) || 0,
        },
      });
      onDone();
    } catch {
      set_err("Please check the fields (a valid link is required).");
    }
  }
  return (
    <form key={project.id ?? "new"} onSubmit={on_submit} className="mb-8 grid gap-3 rounded-2xl border border-violet-400/30 bg-[#171822] p-5 sm:grid-cols-2">
      <input name="url" defaultValue={project.url} placeholder="Website link (preview is taken automatically)" className={`${input} sm:col-span-2`} required />
      <input name="title" defaultValue={project.title} placeholder="Title" className={input} required />
      <input name="category" defaultValue={project.category} placeholder="Category" className={input} required />
      <textarea name="description" defaultValue={project.description} placeholder="Description" className={`${input} sm:col-span-2`} rows={3} />
      <input name="stack" defaultValue={project.stack.join(", ")} placeholder="Tech (comma separated)" className={input} />
      <input name="sort_order" type="number" defaultValue={project.sort_order} placeholder="Order" className={input} />
      {err && <p className="text-sm text-rose-400 sm:col-span-2">{err}</p>}
      <div className="flex gap-2 sm:col-span-2">
        <button className="rounded-lg bg-[#7C5CFF] px-4 py-2 text-sm font-semibold">Save</button>
        <button type="button" onClick={onDone} className="rounded-lg bg-white/5 px-4 py-2 text-sm">Cancel</button>
      </div>
    </form>
  );
}
