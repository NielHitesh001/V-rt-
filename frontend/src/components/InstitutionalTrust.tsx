import React, { useState } from 'react';
import {
  NEWSROOM_PLEDGE_RECORDS,
  STRUCTURAL_BIAS_AUDITS,
  PRIMARY_SOURCE_DOCS
} from '../data/enhancementsData';
import { NewsroomPledgeRecord, StructuralBiasAudit, PrimarySourceDoc } from '../types';
import {
  Award,
  Building,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Search,
  Download,
  HelpCircle,
  Trophy,
  Check
} from 'lucide-react';

export const InstitutionalTrust: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'pledges' | 'bias' | 'primary'>('pledges');

  // Pledge state
  const [pledges, setPledges] = useState<NewsroomPledgeRecord[]>(NEWSROOM_PLEDGE_RECORDS);
  const [outletNameInput, setOutletNameInput] = useState('');
  const [signedNotice, setSignedNotice] = useState(false);

  // Bias state
  const [selectedOutletBias, setSelectedOutletBias] = useState<string>(STRUCTURAL_BIAS_AUDITS[0].outlet_id);
  const currentBias = STRUCTURAL_BIAS_AUDITS.find((b) => b.outlet_id === selectedOutletBias) || STRUCTURAL_BIAS_AUDITS[0];

  // Primary Source Bank state
  const [searchPrimary, setSearchPrimary] = useState('');
  const filteredPrimary = PRIMARY_SOURCE_DOCS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchPrimary.toLowerCase()) ||
      doc.issuing_body.toLowerCase().includes(searchPrimary.toLowerCase()) ||
      doc.document_type.toLowerCase().includes(searchPrimary.toLowerCase())
  );

  // Challenge game state
  const [gameScore, setGameScore] = useState(0);
  const [gameAnswered, setGameAnswered] = useState<string | null>(null);

  const handleSignPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outletNameInput.trim()) return;
    const newPledge: NewsroomPledgeRecord = {
      outlet_id: `pledge-${Date.now().toString(36)}`,
      outlet_name: outletNameInput.trim(),
      tier_1_verified_badge: true,
      pledge_signed_date: new Date().toISOString().split('T')[0],
      compliance_score: 96,
      verifiability_tier: 'Tier 1 Certified (Gold Standard)',
      pledge_commitments: {
        primary_citation_guarantee: true,
        four_hour_retraction_window: true,
        unredacted_ownership_register: true,
        rejection_of_anonymous_single_source_claims: true
      },
      public_audit_url: `https://truenews.org/pledges/${outletNameInput.toLowerCase().replace(/\s+/g, '-')}`
    };
    setPledges([newPledge, ...pledges]);
    setOutletNameInput('');
    setSignedNotice(true);
    setTimeout(() => setSignedNotice(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Tier 3: Institutional Trust · Systems 21, 22 & 23
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Newsroom Pledges, Structural Bias & Primary Document Bank
          </h1>
        </div>
        <div className="flex items-center space-x-1.5 bg-stone-200/70 p-1 rounded border border-stone-300 text-xs font-sans">
          <button
            onClick={() => setActiveSubTab('pledges')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'pledges'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            21. Transparency Pledges
          </button>
          <button
            onClick={() => setActiveSubTab('bias')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'bias'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            22. Structural Bias
          </button>
          <button
            onClick={() => setActiveSubTab('primary')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'primary'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            23. Primary Document Bank
          </button>
        </div>
      </div>

      {/* 21. Newsroom Transparency Pledge & Badge System */}
      {activeSubTab === 'pledges' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <Award className="w-4 h-4" />
              <span>Institutional Verifiability Standard & Newsroom Badge System</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Independent newsrooms commit to 4 verifiable covenants: guarantee of raw primary document citations, public transparent errata within 4 hours, an unredacted beneficial ownership registry, and refusal to assert anonymous single-source claims without secondary corroboration.
            </p>
          </div>

          {signedNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 text-xs font-serif flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Newsroom transparency covenant submitted and verified to Tier 1 Gold Standard!</span>
            </div>
          )}

          {/* Grid of Pledged Outlets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pledges.map((p) => (
              <div
                key={p.outlet_id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      {p.outlet_name}
                    </h3>
                    <div className="text-xs text-stone-500 font-mono">
                      Pledged: {p.pledge_signed_date}
                    </div>
                  </div>
                  {p.tier_1_verified_badge ? (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      <Award className="w-3.5 h-3.5 mr-1 text-amber-700" />
                      Tier 1 Certified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-mono font-bold bg-stone-100 text-stone-700 border border-stone-300">
                      {p.verifiability_tier}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs font-serif">
                  <div className="text-stone-600 font-mono uppercase text-[10px] font-bold">
                    Audited Four-Point Commitments:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                    <div className="flex items-center space-x-1.5 text-stone-800">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          p.pledge_commitments.primary_citation_guarantee ? 'text-emerald-600' : 'text-stone-300'
                        }`}
                      />
                      <span>Primary Citation Guarantee</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-stone-800">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          p.pledge_commitments.four_hour_retraction_window ? 'text-emerald-600' : 'text-stone-300'
                        }`}
                      />
                      <span>&lt;4h Retraction Window</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-stone-800">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          p.pledge_commitments.unredacted_ownership_register ? 'text-emerald-600' : 'text-stone-300'
                        }`}
                      />
                      <span>Ownership Transparency</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-stone-800">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          p.pledge_commitments.rejection_of_anonymous_single_source_claims
                            ? 'text-emerald-600'
                            : 'text-stone-300'
                        }`}
                      />
                      <span>No Single-Source Anonymous</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-mono">
                  <span className="text-stone-500">
                    Compliance Score: <strong className="text-stone-900">{p.compliance_score}/100</strong>
                  </span>
                  <a
                    href={p.public_audit_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-700 hover:text-stone-900 inline-flex items-center space-x-1 font-sans"
                  >
                    <span>Public Audit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Form to Sign Transparency Pledge */}
          <div className="bg-white border border-stone-300 p-6 rounded shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900">
              Newsroom Verifiability Self-Enrollment
            </h3>
            <p className="text-xs font-serif text-stone-600">
              Are you an editor, ombudsman, or publisher? Enroll your newsroom to benchmark against the TrueNews Tier 1 protocol.
            </p>
            <form onSubmit={handleSignPledge} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={outletNameInput}
                onChange={(e) => setOutletNameInput(e.target.value)}
                placeholder="Newsroom / Publication Name (e.g. Baltimore Independent Chronicle)..."
                className="flex-1 px-3 py-2 text-xs font-serif bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-500"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded transition cursor-pointer"
              >
                Sign Transparency Pledge
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 22. Structural Bias Detector */}
      {activeSubTab === 'bias' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <Building className="w-4 h-4" />
              <span>Structural Bias & Corporate Ownership Cross-Referencing</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Cross-references outlet corporate parentage, commercial ties, and ultimate beneficial owners against coverage patterns. Shows measurable statistical divergence data on topics tied to corporate ownership without editorial moralizing.
            </p>
          </div>

          {/* Outlet Selector */}
          <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-stone-200 text-xs font-sans">
            {STRUCTURAL_BIAS_AUDITS.map((b) => (
              <button
                key={b.outlet_id}
                onClick={() => setSelectedOutletBias(b.outlet_id)}
                className={`px-3 py-1.5 rounded transition font-medium cursor-pointer ${
                  selectedOutletBias === b.outlet_id
                    ? 'bg-stone-900 text-stone-100 shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-300 hover:border-stone-400'
                }`}
              >
                {b.outlet_name}
              </button>
            ))}
          </div>

          {/* Ownership Breakdown Card */}
          <div className="bg-white border border-stone-300 p-6 rounded shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase bg-stone-900 text-stone-100 px-2 py-0.5 rounded">
                  Ownership Structure Dossier
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 mt-1">
                  {currentBias.outlet_name}
                </h3>
              </div>
              <div className="text-xs font-mono text-stone-600">
                Parent: <strong className="text-stone-900">{currentBias.parent_conglomerate}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                <div className="text-stone-500 text-[10px] uppercase">Beneficial Ownership</div>
                <div className="text-stone-900 font-bold mt-1">
                  {currentBias.ultimate_beneficial_owners.join(', ')}
                </div>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                <div className="text-stone-500 text-[10px] uppercase">Revenue Sources</div>
                <div className="text-stone-900 font-bold mt-1">
                  {currentBias.primary_revenue_sources.join(', ')}
                </div>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                <div className="text-stone-500 text-[10px] uppercase">Topic Anomaly Divergence</div>
                <div className="text-amber-800 font-bold text-sm mt-1">
                  {currentBias.topic_anomaly_rate}% vs Peer Benchmark
                </div>
              </div>
            </div>

            {/* Evaluated Case Studies */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-bold uppercase text-stone-600">
                Audited Divergence Case Studies:
              </div>
              {currentBias.evaluated_case_studies.map((cs, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-stone-200 rounded bg-[#fdfcf9] space-y-3 text-xs font-serif"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-stone-900">{cs.topic}</span>
                    <span className="font-mono text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                      Divergence: {cs.divergence_score}%
                    </span>
                  </div>
                  <div className="text-stone-600">
                    <strong>Conglomerate Commercial Interest:</strong> {cs.conglomerate_interest}
                  </div>
                  <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded text-amber-950">
                    <strong>Observed Editorial Framing:</strong> {cs.outlet_framing_shift}
                  </div>
                  <div className="p-2.5 bg-stone-100 border border-stone-200 rounded text-stone-800">
                    <strong>Peer Newsroom Baseline:</strong> {cs.peer_benchmark_framing}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 23. Primary Source Attribution Bank */}
      {activeSubTab === 'primary' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <FileText className="w-4 h-4" />
              <span>Primary Source Attribution Vault & Original PDF Registry</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Direct access to the underlying official documents (NTSB preliminary reports, Bureau of Labor Statistics data tables, European Court of Justice judgments). Verify whether reporting newsrooms actually examined the raw documents or merely republished wire copies.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchPrimary}
              onChange={(e) => setSearchPrimary(e.target.value)}
              placeholder="Search primary source dockets, court cases, statistical tables..."
              className="w-full pl-9 pr-4 py-2 text-xs font-serif bg-white border border-stone-300 rounded shadow-2xs text-stone-900 focus:outline-none focus:border-stone-500"
            />
          </div>

          {/* Primary Documents Grid */}
          <div className="space-y-4">
            {filteredPrimary.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-stone-900 text-stone-100 px-2 py-0.5 rounded">
                      {doc.document_type}
                    </span>
                    <h3 className="font-serif font-bold text-base text-stone-900 mt-1">
                      {doc.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-stone-600">
                    Issuing: <strong className="text-stone-900">{doc.issuing_body}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono py-2 bg-stone-50 rounded px-3 border border-stone-200">
                  <div>
                    <span className="text-stone-500 text-[10px] block">Format & Pages</span>
                    <strong className="text-stone-900">{doc.file_format} · {doc.page_count} pages</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Direct Citation Ratio</span>
                    <strong className="text-stone-900">{doc.verified_citation_ratio}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Publication Date</span>
                    <strong className="text-stone-900">{doc.publication_date}</strong>
                  </div>
                </div>

                <div className="text-xs font-serif space-y-1">
                  <div className="text-stone-600">
                    <strong>Direct primary readers:</strong> {doc.outlets_citing_primary_directly.join(', ')}
                  </div>
                  <div className="text-stone-500 italic">
                    <strong>Secondhand syndication:</strong> {doc.outlets_citing_secondhand.join(', ')}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-stone-100 gap-2">
                  <span className="text-[11px] font-mono text-stone-500 truncate max-w-md">
                    SHA-256: {doc.digital_sha256}
                  </span>
                  <a
                    href={doc.direct_download_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-sans font-medium transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Access Raw Public Document</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive "Find the Primary Source" Mini-Challenge */}
          <div className="bg-[#f2efe9] border border-stone-300 p-6 rounded shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-stone-700">
              <Trophy className="w-4 h-4 text-amber-700" />
              <span>Interactive Verification Challenge: "Spot the Primary Origin"</span>
            </div>
            <p className="text-xs font-serif text-stone-700">
              Claim: <em>"The cargo ship Dali experienced two electrical blackouts in port prior to departure and two additional blackouts before striking the bridge."</em>
            </p>
            <div className="text-xs font-sans font-bold text-stone-800">
              Which source is the true Tier 1 primary document supporting this claim?
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: 'a', label: 'Associated Press Wire Summary', correct: false },
                { id: 'b', label: 'NTSB Marine Safety Docket DCA24MM031 Preliminary Report', correct: true },
                { id: 'c', label: 'Baltimore Sun Commentary Desk', correct: false },
                { id: 'd', label: 'Yahoo News Aggregator Feed', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setGameAnswered(opt.id);
                    if (opt.correct) setGameScore((s) => s + 1);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-serif transition border cursor-pointer ${
                    gameAnswered === opt.id
                      ? opt.correct
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : 'bg-rose-800 text-white border-rose-900'
                      : 'bg-white text-stone-800 border-stone-300 hover:border-stone-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {gameAnswered && (
              <div className="text-xs font-serif pt-1 text-stone-800">
                {gameAnswered === 'b' ? (
                  <span className="text-emerald-800 font-bold">
                    Correct! The NTSB report is an official federal accident investigation document with subpoena power and physical VDR access.
                  </span>
                ) : (
                  <span className="text-rose-800 font-bold">
                    Incorrect. That source is a secondary reporting or tertiary aggregator outlet that cites the NTSB preliminary investigation.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
