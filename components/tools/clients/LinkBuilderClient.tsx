"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Mail, Wifi, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Pure client-side "special link" builder: mailto / wifi / sms / tel URIs.
// Everything is computed in the browser — nothing is uploaded.
type Tab = "mailto" | "wifi" | "sms" | "tel";

const TABS: { id: Tab; label: string; icon: typeof Mail }[] = [
  { id: "mailto", label: "Email", icon: Mail },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "sms", label: "SMS", icon: MessageSquare },
  { id: "tel", label: "Phone", icon: Phone },
];

function enc(s: string) {
  return encodeURIComponent(s);
}
// Wi-Fi QR payload escaping per the standard: \ ; , : " are escaped with a backslash.
function wifiEsc(s: string) {
  return s.replace(/([\\;,:"])/g, "\\$1");
}

export function LinkBuilderClient() {
  const [tab, setTab] = useState<Tab>("mailto");
  const [copied, setCopied] = useState(false);

  // mailto
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  // wifi
  const [ssid, setSsid] = useState("");
  const [pass, setPass] = useState("");
  const [enc2, setEnc2] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [hidden, setHidden] = useState(false);
  // sms
  const [smsNum, setSmsNum] = useState("");
  const [smsMsg, setSmsMsg] = useState("");
  // tel
  const [tel, setTel] = useState("");

  const result = useMemo(() => {
    if (tab === "mailto") {
      if (!to.trim()) return "";
      const params = new URLSearchParams();
      if (cc.trim()) params.set("cc", cc.trim());
      if (subject.trim()) params.set("subject", subject.trim());
      if (emailBody.trim()) params.set("body", emailBody);
      const qs = params.toString();
      return `mailto:${to.trim()}${qs ? `?${qs}` : ""}`;
    }
    if (tab === "wifi") {
      if (!ssid.trim()) return "";
      const t = enc2 === "nopass" ? "nopass" : enc2;
      const p = enc2 === "nopass" ? "" : `P:${wifiEsc(pass)};`;
      return `WIFI:T:${t};S:${wifiEsc(ssid)};${p}${hidden ? "H:true;" : ""};`;
    }
    if (tab === "sms") {
      if (!smsNum.trim()) return "";
      const num = smsNum.replace(/[^\d+]/g, "");
      return `sms:${num}${smsMsg.trim() ? `?body=${enc(smsMsg)}` : ""}`;
    }
    if (tab === "tel") {
      if (!tel.trim()) return "";
      return `tel:${tel.replace(/[^\d+]/g, "")}`;
    }
    return "";
  }, [tab, to, cc, subject, emailBody, ssid, pass, enc2, hidden, smsNum, smsMsg, tel]);

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  const input = "w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
  const labelCls = "mb-1.5 block text-sm font-medium text-ink-700";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 rounded-lg border border-ink-200 bg-white p-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setTab(id); setCopied(false); }}
            className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              tab === id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
        {tab === "mailto" && (
          <div className="space-y-3">
            <label className="block"><span className={labelCls}>To</span>
              <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="name@example.com" className={input} /></label>
            <label className="block"><span className={labelCls}>Cc (optional)</span>
              <input value={cc} onChange={(e) => setCc(e.target.value)} placeholder="other@example.com" className={input} /></label>
            <label className="block"><span className={labelCls}>Subject</span>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Hello!" className={input} /></label>
            <label className="block"><span className={labelCls}>Body</span>
              <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Pre-filled message…" className={cn(input, "h-24 resize-y")} /></label>
          </div>
        )}

        {tab === "wifi" && (
          <div className="space-y-3">
            <label className="block"><span className={labelCls}>Network name (SSID)</span>
              <input value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="MyWiFi" className={input} /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block"><span className={labelCls}>Security</span>
                <select value={enc2} onChange={(e) => setEnc2(e.target.value as typeof enc2)} className={input}>
                  <option value="WPA">WPA/WPA2/WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No password</option>
                </select></label>
              <label className="block"><span className={labelCls}>Password</span>
                <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" disabled={enc2 === "nopass"} className={cn(input, enc2 === "nopass" && "opacity-50")} /></label>
            </div>
            <label className="flex items-center gap-2 text-sm text-ink-600">
              <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="rounded border-ink-300" /> Hidden network
            </label>
            <p className="text-xs text-ink-400">Paste this into the QR Code Generator to make a “scan to connect” Wi-Fi code.</p>
          </div>
        )}

        {tab === "sms" && (
          <div className="space-y-3">
            <label className="block"><span className={labelCls}>Phone number</span>
              <input value={smsNum} onChange={(e) => setSmsNum(e.target.value)} placeholder="+1 555 123 4567" inputMode="tel" className={input} /></label>
            <label className="block"><span className={labelCls}>Pre-filled message (optional)</span>
              <textarea value={smsMsg} onChange={(e) => setSmsMsg(e.target.value)} placeholder="Hi there…" className={cn(input, "h-20 resize-y")} /></label>
          </div>
        )}

        {tab === "tel" && (
          <label className="block"><span className={labelCls}>Phone number</span>
            <input value={tel} onChange={(e) => setTel(e.target.value)} placeholder="+1 555 123 4567" inputMode="tel" className={input} /></label>
        )}
        <p className="mt-3 text-xs text-ink-400">Built in your browser — nothing is uploaded.</p>
      </div>

      {result && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="mb-2 text-sm font-medium text-emerald-800">Your link</p>
          <div className="flex items-stretch gap-2">
            <input readOnly value={result} onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 font-mono text-xs text-ink-900" />
            <Button variant="outline" onClick={copy}>
              {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
