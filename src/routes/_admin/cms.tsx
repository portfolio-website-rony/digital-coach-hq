import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_admin/cms")({
  head: () => ({ meta: [{ title: "CMS — Admin" }] }),
  component: CmsPage,
});

const TABS = [
  { key: "blog", label: "Blog", table: "cms_blog_posts" },
  { key: "testimonials", label: "Testimonials", table: "cms_testimonials" },
  { key: "portfolio", label: "Portfolio", table: "cms_portfolio" },
  { key: "services", label: "Services", table: "cms_services" },
  { key: "programs", label: "Programs", table: "cms_programs" },
] as const;

type Row = Record<string, unknown> & { id: string };

function CmsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>(TABS[0]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { void load(); }, [tab]);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from(tab.table).select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (error) toast.error(error.message); else setRows((data as Row[]) ?? []);
  }

  async function remove(id: string) {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from(tab.table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
  }

  async function togglePublished(row: Row) {
    const { error } = await supabase.from(tab.table).update({ published: !row.published }).eq("id", row.id);
    if (error) return toast.error(error.message);
    void load();
  }

  async function submit(form: FormData) {
    let payload: Record<string, unknown> = {};
    if (tab.key === "blog") {
      payload = {
        title: String(form.get("title") || ""),
        slug: String(form.get("slug") || "").toLowerCase().replace(/\s+/g, "-"),
        excerpt: String(form.get("excerpt") || ""),
        content: String(form.get("content") || ""),
        cover_url: String(form.get("cover_url") || "") || null,
        published: form.get("published") === "on",
      };
    } else if (tab.key === "testimonials") {
      payload = {
        author: String(form.get("author") || ""),
        role: String(form.get("role") || "") || null,
        quote: String(form.get("quote") || ""),
        avatar_url: String(form.get("avatar_url") || "") || null,
        rating: Number(form.get("rating") || 5),
        published: form.get("published") === "on",
      };
    } else if (tab.key === "portfolio") {
      payload = {
        title: String(form.get("title") || ""),
        category: String(form.get("category") || "") || null,
        description: String(form.get("description") || "") || null,
        cover_url: String(form.get("cover_url") || "") || null,
        link: String(form.get("link") || "") || null,
        published: form.get("published") === "on",
      };
    } else if (tab.key === "services") {
      payload = {
        title: String(form.get("title") || ""),
        description: String(form.get("description") || "") || null,
        icon: String(form.get("icon") || "") || null,
        published: form.get("published") === "on",
      };
    } else if (tab.key === "programs") {
      payload = {
        title: String(form.get("title") || ""),
        description: String(form.get("description") || "") || null,
        price: String(form.get("price") || "") || null,
        features: String(form.get("features") || "").split(",").map((s) => s.trim()).filter(Boolean),
        published: form.get("published") === "on",
      };
    }
    const { error } = await supabase.from(tab.table).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setShowForm(false);
    void load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Content Management</h1>
        <p className="text-sm text-muted-foreground">Edit your website content here.</p>
      </div>

      <div className="glass flex flex-wrap gap-1 rounded-xl p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t); setShowForm(false); }}
            className={`rounded-lg px-4 py-1.5 text-sm ${tab.key === t.key ? "bg-gradient-primary text-background font-semibold" : "text-muted-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={() => setShowForm((v) => !v)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-background shadow-glow">
          <Plus className="h-4 w-4" /> New {tab.label.slice(0, -1)}
        </button>
      </div>

      {showForm && (
        <form onSubmit={(e) => { e.preventDefault(); void submit(new FormData(e.currentTarget)); }} className="glass grid gap-3 rounded-2xl p-5">
          {tab.key === "blog" && (<>
            <input name="title" placeholder="Title *" required className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="slug" placeholder="slug-url *" required className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="excerpt" placeholder="Excerpt" className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="cover_url" placeholder="Cover image URL" className="glass rounded-xl px-3 py-2 text-sm" />
            <textarea name="content" placeholder="Content (markdown)" rows={6} className="glass rounded-xl px-3 py-2 text-sm" />
          </>)}
          {tab.key === "testimonials" && (<>
            <input name="author" placeholder="Author *" required className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="role" placeholder="Role / title" className="glass rounded-xl px-3 py-2 text-sm" />
            <textarea name="quote" placeholder="Quote *" required rows={3} className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="avatar_url" placeholder="Avatar URL" className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="rating" type="number" min={1} max={5} defaultValue={5} className="glass rounded-xl px-3 py-2 text-sm" />
          </>)}
          {tab.key === "portfolio" && (<>
            <input name="title" placeholder="Title *" required className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="category" placeholder="Category" className="glass rounded-xl px-3 py-2 text-sm" />
            <textarea name="description" placeholder="Description" rows={3} className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="cover_url" placeholder="Cover image URL" className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="link" placeholder="Link" className="glass rounded-xl px-3 py-2 text-sm" />
          </>)}
          {tab.key === "services" && (<>
            <input name="title" placeholder="Title *" required className="glass rounded-xl px-3 py-2 text-sm" />
            <textarea name="description" placeholder="Description" rows={3} className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="icon" placeholder="Icon name (lucide)" className="glass rounded-xl px-3 py-2 text-sm" />
          </>)}
          {tab.key === "programs" && (<>
            <input name="title" placeholder="Title *" required className="glass rounded-xl px-3 py-2 text-sm" />
            <textarea name="description" placeholder="Description" rows={3} className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="price" placeholder="Price" className="glass rounded-xl px-3 py-2 text-sm" />
            <input name="features" placeholder="Features (comma separated)" className="glass rounded-xl px-3 py-2 text-sm" />
          </>)}
          <label className="flex items-center gap-2 text-sm">
            <input name="published" type="checkbox" defaultChecked /> Published
          </label>
          <div><button className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-background">Save</button></div>
        </form>
      )}

      <div className="glass overflow-hidden rounded-2xl">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">No items yet.</div>
        ) : (
          <ul className="divide-y divide-white/5">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{String(r.title ?? r.author ?? r.id)}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {String(r.excerpt ?? r.quote ?? r.description ?? r.category ?? "")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePublished(r)} className={`rounded-lg px-2 py-1 text-xs ${r.published ? "bg-[oklch(0.72_0.18_152/20%)] text-[oklch(0.85_0.15_152)]" : "bg-white/10"}`}>
                    {r.published ? "published" : "draft"}
                  </button>
                  <button onClick={() => remove(r.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/15 text-red-300"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
