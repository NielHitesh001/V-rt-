import React, { useState } from 'react';
import {
  AUTO_DETECTED_EVENTS,
  SOURCE_HEALTH_RECORDS,
  COLLABORATIVE_DOSSIER_VERSIONS
} from '../data/enhancementsData';
import { AutoDetectedEvent, SourceHealthRecord, CollaborativeDossierVersion } from '../types';
import {
  Zap,
  Activity,
  GitBranch,
  Radio,
  Server,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Check,
  Send,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ScaleAndResilience: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'routing' | 'health' | 'dossier'>('routing');

  // 18. Auto-routing state
  const [detectedEvents, setDetectedEvents] = useState<AutoDetectedEvent[]>(AUTO_DETECTED_EVENTS);
  const [routedSuccessMsg, setRoutedSuccessMsg] = useState<string | null>(null);

  // 19. Source Health state
  const [healthFilter, setHealthFilter] = useState<string>('all');
  const filteredHealth = SOURCE_HEALTH_RECORDS.filter(
    (s) => healthFilter === 'all' || s.current_status === healthFilter
  );

  // 20. Collaborative Dossier state
  const [versions, setVersions] = useState<CollaborativeDossierVersion[]>(COLLABORATIVE_DOSSIER_VERSIONS);
  const [userReviewerName, setUserReviewerName] = useState('Senior Auditor');

  const handleRouteAction = (id: string, action: 'merge' | 'spinup') => {
    setDetectedEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === id) {
          const decision = action === 'merge' ? 'Merge into Active Event' : 'Spin Up New Dossier';
          return { ...evt, route_decision: decision };
        }
        return evt;
      })
    );
    setRoutedSuccessMsg(`Stream item ${id} successfully routed: ${action === 'merge' ? 'Merged into Active Event' : 'New Dossier Initialized'}`);
    setTimeout(() => setRoutedSuccessMsg(null), 3000);
  };

  const handleVote = (versionId: string, type: 'approve' | 'reject') => {
    setVersions((prev) =>
      prev.map((v) => {
        if (v.version_id === versionId) {
          const newApprovals = type === 'approve' ? v.consensus_votes.approvals + 1 : v.consensus_votes.approvals;
          const newRejections = type === 'reject' ? v.consensus_votes.rejections + 1 : v.consensus_votes.rejections;
          const gateStatus = newApprovals >= v.consensus_votes.required_threshold ? 'Approved & Merged' : v.consensus_votes.gate_status;
          return {
            ...v,
            consensus_votes: {
              ...v.consensus_votes,
              approvals: newApprovals,
              rejections: newRejections,
              gate_status: gateStatus,
              reviewers: [...v.consensus_votes.reviewers, `${userReviewerName} (${type.toUpperCase()})`]
            }
          };
        }
        return v;
      })
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Tier 2: Scale & Resilience · Systems 18, 19 & 20
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Real-Time Ingestion, Health Monitoring & Version Control
          </h1>
        </div>
        <div className="flex items-center space-x-1.5 bg-stone-200/70 p-1 rounded border border-stone-300 text-xs font-sans">
          <button
            onClick={() => setActiveSubTab('routing')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'routing'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            18. Auto-Detection
          </button>
          <button
            onClick={() => setActiveSubTab('health')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'health'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            19. Source Health
          </button>
          <button
            onClick={() => setActiveSubTab('dossier')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'dossier'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            20. Collaborative Git-Dossier
          </button>
        </div>
      </div>

      {routedSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 text-xs font-serif flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{routedSuccessMsg}</span>
        </div>
      )}

      {/* 18. Auto-Routing View */}
      {activeSubTab === 'routing' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <Radio className="w-4 h-4" />
              <span>Real-Time Stream Parsing & Automated Event Routing</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Monitors live wire feeds continuously to detect emerging events, extract key entity clusters, and automatically determine whether an incoming dispatch should be routed to an existing dossier or spun up into an independent investigation.
            </p>
          </div>

          <div className="space-y-4">
            {detectedEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-200">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase ${
                        evt.urgency_tier === 'Breaking Crisis'
                          ? 'bg-rose-100 text-rose-800'
                          : evt.urgency_tier === 'Rapid Development'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {evt.urgency_tier}
                    </span>
                    <span className="text-xs font-mono text-stone-500">ID: {evt.id}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs font-mono text-stone-600">{evt.article_stream_count} incoming dispatches</span>
                  </div>
                  <div className="text-xs font-mono text-stone-600">
                    Detection Confidence: <strong className="text-stone-900">{Math.round(evt.confidence_score * 100)}%</strong>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {evt.auto_extracted_neutral_headline}
                  </h3>
                  <div className="text-xs font-serif text-stone-600 mt-1">
                    Cluster Entity Triggers: {evt.triggering_entities.join(' · ')}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-stone-100 gap-3">
                  <div className="text-xs font-serif text-stone-600">
                    Current Decision:{' '}
                    <strong className="text-stone-900 bg-stone-100 px-2 py-0.5 rounded font-mono">
                      {evt.route_decision}
                    </strong>
                    {evt.matched_existing_event_id && (
                      <span className="ml-1 text-stone-500">({evt.matched_existing_event_id})</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRouteAction(evt.id, 'merge')}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-medium rounded transition cursor-pointer"
                    >
                      Merge into Active Event
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRouteAction(evt.id, 'spinup')}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded transition cursor-pointer"
                    >
                      Spin Up New Dossier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 19. Source Health Monitoring */}
      {activeSubTab === 'health' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 border border-stone-300 rounded shadow-xs">
            <div>
              <h2 className="font-serif font-bold text-stone-900 text-sm">
                Real-Time Source SLA & Network Health Monitoring
              </h2>
              <div className="text-xs text-stone-500 font-serif">
                Tracks downtime, silent periods, geo-restrictions, and paywall hardening anomalies
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-sans">
              <span className="text-stone-500">Filter Status:</span>
              {['all', 'operational', 'degraded', 'geo_blocked'].map((status) => (
                <button
                  key={status}
                  onClick={() => setHealthFilter(status)}
                  className={`px-2.5 py-1 rounded capitalize border transition cursor-pointer ${
                    healthFilter === status
                      ? 'bg-stone-900 text-stone-100 border-stone-900'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHealth.map((sh) => (
              <div
                key={sh.source_id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900">
                      {sh.source_name}
                    </h3>
                    <div className="text-xs text-stone-500 font-mono">
                      ID: {sh.source_id} · Latency: {sh.average_latency_ms}ms
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase ${
                      sh.current_status === 'operational'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sh.current_status === 'degraded'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {sh.current_status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono py-2 bg-stone-50 rounded px-3 border border-stone-200">
                  <div>
                    <span className="text-stone-500 text-[10px] block">30d Uptime</span>
                    <strong className="text-stone-900">{sh.uptime_pct_30d}%</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Paywall Tier</span>
                    <strong className="text-stone-900">{sh.paywall_barrier_level}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">Silent Hours</span>
                    <strong className="text-stone-900">{sh.consecutive_silent_hours}h</strong>
                  </div>
                </div>

                {sh.deliberate_suppression_alert && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-900 text-xs font-serif flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span><strong>Coverage Suppression Warning:</strong> Geo-blocking anomaly detected.</span>
                  </div>
                )}

                {sh.incomplete_picture_warning && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900 text-xs font-serif">
                    {sh.incomplete_picture_warning}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 20. Collaborative Dossier Editing & Version Control */}
      {activeSubTab === 'dossier' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <GitBranch className="w-4 h-4" />
              <span>Multi-User Git-Style Narrative Versioning & Consensus Gates</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Every event dossier is backed by a decentralized version tree with atomic commit messages, claim diffs, and mandatory peer consensus gates. Claims can only be promoted to Tier 1 when ≥3 accredited fact auditors vote to approve.
            </p>
          </div>

          <div className="space-y-4">
            {versions.map((ver) => (
              <div
                key={ver.version_id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-stone-900 text-stone-100 rounded text-xs font-mono font-bold">
                      {ver.version_id}
                    </span>
                    <span className="text-xs font-mono text-stone-500">commit {ver.commit_hash}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs font-mono text-stone-700">{ver.event_id}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                      ver.consensus_votes.gate_status === 'Approved & Merged'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ver.consensus_votes.gate_status === 'Pending Review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {ver.consensus_votes.gate_status}
                  </span>
                </div>

                <div>
                  <div className="font-serif font-bold text-sm text-stone-900">
                    "{ver.commit_message}"
                  </div>
                  <div className="text-xs font-serif text-stone-500 mt-1">
                    Committed by {ver.author} ({ver.role}) on {new Date(ver.timestamp).toLocaleString()}
                  </div>
                </div>

                {/* Diff summary box */}
                <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs font-mono space-y-1">
                  <div className="text-stone-600 font-bold uppercase text-[10px]">Commit Diff:</div>
                  <div className="flex space-x-4 text-stone-700">
                    <span className="text-emerald-700">+{ver.diff.added_claims} claims added</span>
                    <span className="text-amber-700">~{ver.diff.modified_claims} modified</span>
                    <span className="text-rose-700">-{ver.diff.removed_claims} removed</span>
                  </div>
                  {ver.diff.tier_promotions.length > 0 && (
                    <div className="text-stone-900 pt-1 border-t border-stone-200 text-[11px]">
                      Tier Promotions: {ver.diff.tier_promotions.join(', ')}
                    </div>
                  )}
                </div>

                {/* Consensus Votes Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-stone-100 gap-3">
                  <div className="text-xs font-serif text-stone-600">
                    Peer Reviews: <strong className="text-emerald-700 font-mono">{ver.consensus_votes.approvals} Approved</strong> /{' '}
                    <strong className="text-rose-700 font-mono">{ver.consensus_votes.rejections} Rejected</strong>{' '}
                    (Threshold: {ver.consensus_votes.required_threshold})
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleVote(ver.version_id, 'approve')}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-medium rounded transition cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Approve Commit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVote(ver.version_id, 'reject')}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-900 text-xs font-medium rounded transition cursor-pointer"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    {ver.revert_possible && (
                      <button
                        type="button"
                        onClick={() => alert(`Reverting to prior commit parent of ${ver.commit_hash}`)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-medium rounded transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Revert</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
