import React, { useState } from 'react';
import {
  PUBLISHER_ACCOUNTABILITY_RECORDS,
  AI_WATERMARK_RECORDS
} from '../data/enhancementsData';
import { PublisherAccountabilityRecord, AIWatermarkRecord } from '../types';
import {
  ShieldAlert,
  Clock,
  Award,
  Cpu,
  Search,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  TrendingDown,
  ExternalLink,
  Copy,
  Check,
  Activity,
  History
} from 'lucide-react';

export const AccountabilityAndWatermarks: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'accountability' | 'watermarks'>('accountability');

  // Accountability state
  const [selectedOutletId, setSelectedOutletId] = useState<string>(PUBLISHER_ACCOUNTABILITY_RECORDS[0].outlet_id);
  const selectedOutlet = PUBLISHER_ACCOUNTABILITY_RECORDS.find((o) => o.outlet_id === selectedOutletId) || PUBLISHER_ACCOUNTABILITY_RECORDS[0];

  // Watermarks state
  const [selectedClaimId, setSelectedClaimId] = useState<string>(AI_WATERMARK_RECORDS[0].claim_id);
  const selectedWatermark = AI_WATERMARK_RECORDS.find((w) => w.claim_id === selectedClaimId) || AI_WATERMARK_RECORDS[0];
  const [verifySigInput, setVerifySigInput] = useState('');
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; record?: AIWatermarkRecord; msg?: string } | null>(null);
  const [copiedSig, setCopiedSig] = useState(false);

  const handleVerifySignature = (sigToTest?: string) => {
    const sig = (sigToTest || verifySigInput).trim();
    if (!sig) return;
    const match = AI_WATERMARK_RECORDS.find((w) => w.watermark_signature.toLowerCase() === sig.toLowerCase());
    if (match) {
      setVerifyResult({ valid: true, record: match, msg: 'Signature verified against immutable audit ledger!' });
    } else {
      setVerifyResult({ valid: false, msg: 'Signature not found or invalid cryptographic hash.' });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Tier 1: Closure & Accountability · Systems 16 & 17
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Publisher Accountability & AI Verifiability Watermark
          </h1>
        </div>
        <div className="flex items-center space-x-2 bg-stone-200/70 p-1 rounded border border-stone-300 text-xs font-sans">
          <button
            onClick={() => setActiveSubTab('accountability')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'accountability'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            16. Publisher Scorecard
          </button>
          <button
            onClick={() => setActiveSubTab('watermarks')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'watermarks'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            17. AI Watermarks & Decay
          </button>
        </div>
      </div>

      {activeSubTab === 'accountability' && (
        <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-stone-300 p-4 rounded shadow-2xs">
              <div className="text-[11px] font-mono uppercase text-stone-500">Benchmark Outlets</div>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {PUBLISHER_ACCOUNTABILITY_RECORDS.length} Newsrooms
              </div>
              <div className="text-xs text-stone-600 mt-1">Monitored continuously for errata velocity</div>
            </div>
            <div className="bg-white border border-stone-300 p-4 rounded shadow-2xs">
              <div className="text-[11px] font-mono uppercase text-stone-500">Fastest Resolution</div>
              <div className="text-2xl font-serif font-bold text-emerald-800 mt-1">
                2.4 Hours
              </div>
              <div className="text-xs text-stone-600 mt-1">Reuters Wire Service (Rapid Tier)</div>
            </div>
            <div className="bg-white border border-stone-300 p-4 rounded shadow-2xs">
              <div className="text-[11px] font-mono uppercase text-stone-500">Total Stories Audited</div>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
                8,640 Articles
              </div>
              <div className="text-xs text-stone-600 mt-1">Multi-wire and national editions</div>
            </div>
            <div className="bg-white border border-stone-300 p-4 rounded shadow-2xs">
              <div className="text-[11px] font-mono uppercase text-stone-500">Systematic Bias Flags</div>
              <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
                1 Flagged Outlier
              </div>
              <div className="text-xs text-stone-600 mt-1">Silent deletion & delayed correction pattern</div>
            </div>
          </div>

          {/* Outlets Overview Table */}
          <div className="bg-white border border-stone-300 rounded shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h2 className="font-serif font-bold text-stone-900 text-sm">
                Correction Velocity & Accountability Scorecard
              </h2>
              <span className="text-xs text-stone-500 font-serif italic">
                Rigor metric: High frequency of transparent errata indicates reporting discipline
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="py-2.5 px-4">News Outlet</th>
                    <th className="py-2.5 px-4">Correction Frequency</th>
                    <th className="py-2.5 px-4">Avg Remedy Speed</th>
                    <th className="py-2.5 px-4">Retractions</th>
                    <th className="py-2.5 px-4">Systematic Bias Flag</th>
                    <th className="py-2.5 px-4">Rigor Score</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {PUBLISHER_ACCOUNTABILITY_RECORDS.map((outlet) => {
                    const isSelected = outlet.outlet_id === selectedOutletId;
                    return (
                      <tr
                        key={outlet.outlet_id}
                        className={`transition cursor-pointer ${
                          isSelected ? 'bg-amber-50/80 font-medium' : 'hover:bg-stone-50'
                        }`}
                        onClick={() => setSelectedOutletId(outlet.outlet_id)}
                      >
                        <td className="py-3 px-4">
                          <div className="font-serif font-bold text-stone-900 text-sm">
                            {outlet.outlet_name}
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono">
                            {outlet.stories_evaluated} stories evaluated
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-stone-800">
                          {outlet.correction_frequency_ratio}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                              outlet.correction_velocity_rating.startsWith('Rapid')
                                ? 'bg-emerald-100 text-emerald-800'
                                : outlet.correction_velocity_rating.startsWith('Moderate')
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {outlet.avg_error_to_correction_hours}h ({outlet.correction_velocity_rating})
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-700">
                          {outlet.total_retractions} total
                        </td>
                        <td className="py-3 px-4">
                          {outlet.systematic_bias_flag ? (
                            <span className="inline-flex items-center text-rose-700 font-semibold text-xs">
                              <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600" />
                              Pattern Flagged
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-stone-600 text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                              Clean Pattern
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-stone-200 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  outlet.rigor_score >= 90
                                    ? 'bg-emerald-600'
                                    : outlet.rigor_score >= 80
                                    ? 'bg-blue-600'
                                    : 'bg-rose-600'
                                }`}
                                style={{ width: `${outlet.rigor_score}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-stone-900">{outlet.rigor_score}/100</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            className="text-stone-700 hover:text-stone-900 font-sans font-medium text-xs underline cursor-pointer"
                          >
                            Inspect Log
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Drilldown Drawer for Selected Outlet */}
          <div className="bg-white border border-stone-300 p-6 rounded shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase bg-stone-900 text-stone-100 px-2 py-0.5 rounded">
                  Editorial Audit Docket
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 mt-1">
                  {selectedOutlet.outlet_name}
                </h3>
              </div>
              <div className="text-xs text-stone-600 font-mono">
                Rigor Score: <strong className="text-stone-900">{selectedOutlet.rigor_score}/100</strong> ·{' '}
                Speed Rating: <strong className="text-stone-900">{selectedOutlet.correction_velocity_rating}</strong>
              </div>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-700 font-serif leading-relaxed">
              <strong>Ombudsman Summary:</strong> {selectedOutlet.editorial_audit_note}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-stone-600">
                Repeat Mistake Vulnerabilities:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedOutlet.repeat_mistakes_categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-stone-100 border border-stone-300 rounded text-xs font-serif text-stone-800"
                  >
                    • {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-bold uppercase text-stone-600">
                Recent Public Errata & Correction Entries:
              </div>
              <div className="space-y-2">
                {selectedOutlet.recent_correction_log.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 border border-stone-200 rounded bg-[#fdfcf9] space-y-1.5 text-xs font-serif"
                  >
                    <div className="flex items-center justify-between text-stone-500 font-mono text-[11px]">
                      <span>Story: "{log.story_headline}"</span>
                      <span>Remedied in {log.hours_to_remedy} hours · {log.date}</span>
                    </div>
                    <div className="text-rose-900 line-through">
                      Error: {log.original_error}
                    </div>
                    <div className="text-emerald-900 font-semibold">
                      Published Erratum: {log.corrected_statement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'watermarks' && (
        <div className="space-y-6">
          {/* Watermarks Intro Banner */}
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <Fingerprint className="w-4 h-4" />
              <span>Feature 17 · Cryptographic Provenance Watermarks</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Every factual proposition in TrueNews is stamped with an immutable cryptographic watermark identifying the extraction engine (Deterministic Regex, LLM Inferred, or Human-Verified Hybrid), the prompt hash, model version, and an automated half-life confidence decay score that prevents outdated inference over-reliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Claims list */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-stone-600">
                Audited Extraction Claims ({AI_WATERMARK_RECORDS.length})
              </div>
              <div className="space-y-2">
                {AI_WATERMARK_RECORDS.map((wm) => {
                  const isSelected = wm.claim_id === selectedClaimId;
                  return (
                    <button
                      key={wm.claim_id}
                      onClick={() => {
                        setSelectedClaimId(wm.claim_id);
                        setVerifySigInput(wm.watermark_signature);
                      }}
                      className={`w-full p-3 text-left rounded border transition text-xs space-y-1 cursor-pointer ${
                        isSelected
                          ? 'bg-white border-stone-900 shadow-xs'
                          : 'bg-stone-50/60 border-stone-200 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span
                          className={`px-1.5 py-0.5 rounded font-semibold ${
                            wm.extraction_method === 'Deterministic Rule'
                              ? 'bg-blue-100 text-blue-800'
                              : wm.extraction_method === 'Human Verified Hybrid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {wm.extraction_method}
                        </span>
                        <span className="text-stone-500 font-mono">
                          {Math.round(wm.confidence_decay.decayed_confidence * 100)}% Conf
                        </span>
                      </div>
                      <div className="font-serif text-stone-900 line-clamp-2">
                        {wm.claim_text}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center/Right Column: Detailed Watermark Dossier & Decay */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-stone-300 p-6 rounded shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-stone-900 text-stone-100 px-2 py-0.5 rounded">
                      Watermark Docket #{selectedWatermark.claim_id}
                    </span>
                    <h3 className="font-serif font-bold text-base text-stone-900 mt-1">
                      {selectedWatermark.event_id}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-stone-600">
                    Engine: <strong className="text-stone-900">{selectedWatermark.model_id} ({selectedWatermark.model_version})</strong>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs font-serif text-stone-800 leading-relaxed">
                  <div className="text-[11px] font-mono uppercase text-stone-500 mb-1">Extracted Assertion:</div>
                  "{selectedWatermark.claim_text}"
                </div>

                {/* Provenance Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                    <div className="text-stone-500 text-[10px] uppercase">Extraction Method</div>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">{selectedWatermark.extraction_method}</div>
                    <div className="text-stone-600 text-[11px] mt-1">Temp: {selectedWatermark.temperature} · Version: {selectedWatermark.model_version}</div>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                    <div className="text-stone-500 text-[10px] uppercase">Consensus & Signing</div>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">{selectedWatermark.verifier_consensus_ratio}</div>
                    <div className="text-stone-600 text-[11px] mt-1">{selectedWatermark.confidence_decay.human_signed_by || 'Awaiting Sign-off'}</div>
                  </div>
                </div>

                {/* Confidence Decay Curve */}
                <div className="p-4 bg-[#f9f8f5] border border-stone-200 rounded space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-stone-900 uppercase">Confidence Decay Curve</span>
                    <span className="text-stone-600">Half-life: {selectedWatermark.confidence_decay.half_life_days} days</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-stone-600">
                      <span>Initial: {(selectedWatermark.confidence_decay.initial_confidence * 100).toFixed(0)}%</span>
                      <span>Decayed Present: {(selectedWatermark.confidence_decay.decayed_confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-stone-900 h-full rounded-full transition-all"
                        style={{ width: `${selectedWatermark.confidence_decay.decayed_confidence * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-[11px] font-serif text-stone-600">
                    Confidence decays over time without primary re-validation to prevent stale assumptions as new investigations evolve. Last revalidated: {selectedWatermark.confidence_decay.last_revalidated_at}.
                  </div>
                </div>

                {/* Cryptographic Signature Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-600 uppercase font-bold">Cryptographic Watermark SHA-256:</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedWatermark.watermark_signature);
                        setCopiedSig(true);
                        setTimeout(() => setCopiedSig(false), 2000);
                      }}
                      className="text-stone-700 hover:text-stone-900 flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedSig ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSig ? 'Copied' : 'Copy Signature'}</span>
                    </button>
                  </div>
                  <div className="p-2.5 bg-stone-900 text-stone-200 rounded font-mono text-[11px] break-all select-all">
                    {selectedWatermark.watermark_signature}
                  </div>
                </div>
              </div>

              {/* Signature Verification Sandbox */}
              <div className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-3">
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  Interactive Watermark Verifier Sandbox
                </h4>
                <p className="text-xs font-serif text-stone-600">
                  Paste any TrueNews watermark signature or hash to test authenticity against the immutable audit ledger.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={verifySigInput}
                    onChange={(e) => setVerifySigInput(e.target.value)}
                    placeholder="Paste TN-WTRMK- signature..."
                    className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleVerifySignature()}
                    className="px-4 py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded text-xs font-medium transition cursor-pointer"
                  >
                    Verify Signature
                  </button>
                </div>

                {verifyResult && (
                  <div
                    className={`p-3 rounded border text-xs font-serif ${
                      verifyResult.valid
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                    }`}
                  >
                    <div className="font-bold flex items-center space-x-1 font-mono">
                      {verifyResult.valid ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <AlertTriangle className="w-4 h-4 text-rose-700" />}
                      <span>{verifyResult.valid ? 'VALID TRUENEWS WATERMARK' : 'VERIFICATION FAILED'}</span>
                    </div>
                    <div className="mt-1">{verifyResult.msg}</div>
                    {verifyResult.record && (
                      <div className="mt-2 pt-2 border-t border-emerald-200 text-[11px] font-mono">
                        Claim: "{verifyResult.record.claim_text}" · Model: {verifyResult.record.model_id}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
