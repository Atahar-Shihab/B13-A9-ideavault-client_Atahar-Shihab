"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import PrivateGuard from "@/components/PrivateGuard";

const CATEGORIES = ["Tech", "Health", "AI", "Education", "Finance", "Other"];
const inputCls = "input input-bordered rounded-xl w-full focus:input-primary";
const textareaCls = "textarea textarea-bordered rounded-xl w-full focus:textarea-primary";

function Field({ label, optional, hint, children }) {
  return (
    <div className="field-stack">
      <label>
        {label}
        {optional && <span className="text-base-content/40 font-normal ml-1">(optional)</span>}
        {!optional && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

function Section({ icon, title, subtitle, children }) {
  return (
    <div className="bg-base-100 rounded-2xl border border-base-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-start gap-3 mb-6 pb-5 border-b border-base-200">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-md shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-extrabold text-lg">{title}</h3>
          <p className="text-sm text-base-content/60 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function AddIdeaForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "", shortDescription: "", detailedDescription: "",
    category: "Tech", tags: "", imageURL: "", estimatedBudget: "",
    targetAudience: "", problemStatement: "", proposedSolution: "",
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/api/ideas", {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      });
      toast.success("Idea submitted successfully!");
      router.push("/my-ideas");
    } catch {
      toast.error("Failed to submit idea");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40 py-14 px-4 border-b border-base-200">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-4 py-1.5 rounded-full mb-5">
            Share Your Vision
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Add Your Startup Idea</h1>
          <p className="text-base-content/70 text-lg">Take the first step toward bringing your idea to life</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 w-full">
        <form onSubmit={onSubmit} className="space-y-6">
          <Section icon="💡" title="Core Information" subtitle="Tell us about your idea">
            <div className="space-y-5">
              <Field label="Idea Title"><input name="title" value={form.title} onChange={onChange} required placeholder="e.g. AI-powered meal planner" className={inputCls} /></Field>
              <Field label="Short Description"><input name="shortDescription" value={form.shortDescription} onChange={onChange} required placeholder="One-liner about your idea" className={inputCls} /></Field>
              <Field label="Detailed Description"><textarea name="detailedDescription" value={form.detailedDescription} onChange={onChange} required rows={4} placeholder="Explain your idea in detail..." className={textareaCls} /></Field>
            </div>
          </Section>

          <Section icon="🏷️" title="Classification" subtitle="Help others discover your idea">
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Category">
                  <select name="category" value={form.category} onChange={onChange} className="select select-bordered rounded-xl w-full focus:select-primary">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Tags" optional><input name="tags" value={form.tags} onChange={onChange} placeholder="startup, ai, mobile" className={inputCls} /></Field>
              </div>
              <Field label="Image URL" optional hint="Paste a direct image link to make your idea pop"><input name="imageURL" value={form.imageURL} onChange={onChange} placeholder="https://..." className={inputCls} /></Field>
            </div>
          </Section>

          <Section icon="🎯" title="Market & Budget" subtitle="Who's it for and how much will it cost?">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Target Audience"><input name="targetAudience" value={form.targetAudience} onChange={onChange} required placeholder="e.g. Freelancers, Students" className={inputCls} /></Field>
              <Field label="Estimated Budget" optional><input name="estimatedBudget" value={form.estimatedBudget} onChange={onChange} placeholder="e.g. $5,000" className={inputCls} /></Field>
            </div>
          </Section>

          <Section icon="🧩" title="Problem & Solution" subtitle="Define the value of your idea">
            <div className="space-y-5">
              <Field label="Problem Statement"><textarea name="problemStatement" value={form.problemStatement} onChange={onChange} required rows={3} placeholder="What problem does this solve?" className={textareaCls} /></Field>
              <Field label="Proposed Solution"><textarea name="proposedSolution" value={form.proposedSolution} onChange={onChange} required rows={3} placeholder="How will your idea solve it?" className={textareaCls} /></Field>
            </div>
          </Section>

          <button type="submit" disabled={submitting}
            className="btn w-full rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:scale-[1.01] transition-all duration-200 font-bold text-base h-14">
            {submitting ? <span className="loading loading-spinner loading-sm" /> : "🚀 Submit Your Idea"}
          </button>
        </form>
      </div>
    </>
  );
}

export default function AddIdeaClient() {
  return <PrivateGuard><AddIdeaForm /></PrivateGuard>;
}
