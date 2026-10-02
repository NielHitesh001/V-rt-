import React, { useState } from 'react';
import {
  DISINFORMATION_CAMPAIGNS,
  PAYWALL_AUDIT_RECORDS,
  MEDIA_VERIFICATION_RECORDS
} from '../data/enhancementsData';
import { DisinformationCampaignRecord, PaywallAuditRecord, MediaVerificationRecord } from '../types';
import {
  ShieldAlert,
  Lock,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  MapPin,
  ExternalLink,
  Flame,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react';

export const ForensicsAndDisinfo: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'disinfo' | 'paywall' | 'media'>('disinfo');

  // 27. Disinformation state
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(DISINFORMATION_CAMPAIGNS[0].id);
  const currentCampaign = DISINFORMATION_CAMPAIGNS.find((c) => c.id === selectedCampaignId) || DISINFORMATION_CAMPAIGNS[0];

  // 28. Paywall state
  const [paywallAudits] = useState<PaywallAuditRecord[]>(PAYWALL_AUDIT_RECORDS);

  // 29. Media Verification state
  const [mediaRecords, setMediaRecords] = useState<MediaVerificationRecord[]>(MEDIA_VERIFICATION_RECORDS);
  const [mediaCaptionInput, setMediaCaptionInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [analyzingMedia, setAnalyzingMedia] = useState(false);

  const handleTestMediaInspector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaCaptionInput.trim()) return;
    setAnalyzingMedia(true);
    setTimeout(() => {
      const newRec: MediaVerificationRecord = {
        id: `media-custom-${Date.now()}`,
        event_id: 'custom-user-check',
        media_type: 'Photo',
        media_caption: mediaCaptionInput.trim(),
        thumbnail_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
        claimed_location: locationInput.trim() || 'Claimed Local Harbor Scene',
        claimed_timestamp: new Date().toISOString(),
        metadata_location: 'Coordinates match claimed geographic satellite sector within 50 meters',
        metadata_timestamp: 'NTP Timestamp Corroborated',
        geolocation_match: true,
        reverse_search_matches: 0,
        first_known_appearance_date: new Date().toISOString().split('T')[0],
        manipulation_probability: 0.03,
        forensic_verdict: 'Authentic & Spatially Grounded',
        forensic_flags: ['Consistent shadow angle and sunlight azimuth', 'Zero deepfake diffusion noise artifacts detected']
      };
      setMediaRecords([newRec, ...mediaRecords]);
      setAnalyzingMedia(false);
      setMediaCaptionInput('');
      setLocationInput('');
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300 gap-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Tier 5: Detection & Prevention · Systems 27, 28 & 29
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Disinformation Campaigns, Paywall Loops & Media Forensics
          </h1>
        </div>
        <div className="flex items-center space-x-1.5 bg-stone-200/70 p-1 rounded border border-stone-300 text-xs font-sans">
          <button
            onClick={() => setActiveSubTab('disinfo')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'disinfo'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            27. Disinfo Campaigns
          </button>
          <button
            onClick={() => setActiveSubTab('paywall')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'paywall'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            28. Paywall Auditing
          </button>
          <button
            onClick={() => setActiveSubTab('media')}
            className={`px-3 py-1 rounded transition font-medium cursor-pointer ${
              activeSubTab === 'media'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            29. Image & Video Forensics
          </button>
        </div>
      </div>

      {/* 27. Disinformation Campaigns */}
      {activeSubTab === 'disinfo' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <ShieldAlert className="w-4 h-4" />
              <span>Coordinated Infiltration & Talking Points Amplification</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Detects when nearly identical phrasing spreads across ostensibly unrelated outlets simultaneously within minutes of breaking news. Traces talking points back to astroturf syndicates, anonymous channels, or political press releases.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campaigns list */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-stone-600">
                Detected Coordinated Campaigns ({DISINFORMATION_CAMPAIGNS.length})
              </div>
              <div className="space-y-2">
                {DISINFORMATION_CAMPAIGNS.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => setSelectedCampaignId(camp.id)}
                    className={`w-full p-3 text-left rounded border transition text-xs space-y-1.5 cursor-pointer ${
                      selectedCampaignId === camp.id
                        ? 'bg-white border-stone-900 shadow-xs'
                        : 'bg-stone-50/60 border-stone-200 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                        {camp.amplification_vector}
                      </span>
                      <span className="text-stone-500">{camp.coordinated_outlets_count} outlets</span>
                    </div>
                    <div className="font-serif font-bold text-stone-900">
                      {camp.narrative_title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Deep Dive */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white border border-stone-300 p-6 rounded shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-rose-900 text-rose-100 px-2 py-0.5 rounded font-bold">
                      Coordinated Campaign Flagged
                    </span>
                    <h3 className="font-serif font-bold text-lg text-stone-900 mt-1">
                      {currentCampaign.narrative_title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-stone-600">
                    Similarity: <strong className="text-rose-700">{currentCampaign.verbatim_similarity_score}%</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                    <div className="text-stone-500 text-[10px] uppercase">Origin Node</div>
                    <div className="font-bold text-stone-900 mt-1">{currentCampaign.unattributed_origin_source}</div>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                    <div className="text-stone-500 text-[10px] uppercase">Spread Window</div>
                    <div className="font-bold text-stone-900 mt-1">{currentCampaign.time_window_minutes} minutes</div>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                    <div className="text-stone-500 text-[10px] uppercase">Syndicated Ring Size</div>
                    <div className="font-bold text-rose-800 mt-1">{currentCampaign.coordinated_outlets_count} Amplifiers</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold uppercase text-stone-600">
                    Isolated Talking Point Tokens:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentCampaign.talking_point_tokens.map((token, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-rose-50 border border-rose-200 rounded text-xs font-serif text-rose-900"
                      >
                        "{token}"
                      </span>
                    ))}
                  </div>
                </div>

                {/* Minute-by-Minute Dissemination Timeline */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono font-bold uppercase text-stone-600">
                    Dissemination Propagation Chain:
                  </div>
                  <div className="space-y-2 border-l-2 border-rose-300 pl-4 ml-1">
                    {currentCampaign.dissemination_timeline.map((step, idx) => (
                      <div key={idx} className="relative text-xs font-serif space-y-0.5">
                        <div className="font-mono text-stone-500 text-[11px] flex items-center space-x-2">
                          <span className="font-bold text-stone-900">+{step.minute_offset} min</span>
                          <span>·</span>
                          <span>{step.outlet}</span>
                        </div>
                        <div className="text-stone-800 font-semibold italic">
                          "{step.headline}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 28. Paywalled Claim Auditing */}
      {activeSubTab === 'paywall' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <Lock className="w-4 h-4" />
              <span>Paywalled Claim & Broken Citation Loop Auditing</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Break the circular citation loop where multiple outlets repeat explosive claims citing a gated terminal or paywalled article that neither the public nor independent researchers can inspect directly.
            </p>
          </div>

          <div className="space-y-4">
            {paywallAudits.map((pa) => (
              <div
                key={pa.id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold">
                      {pa.paywall_type}
                    </span>
                    <span className="text-xs font-mono text-stone-500">ID: {pa.claim_id}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      pa.citation_chain_broken
                        ? 'bg-rose-100 text-rose-900 border border-rose-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}
                  >
                    {pa.independent_verification_status}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    "{pa.claim_text}"
                  </h3>
                  <div className="text-xs font-serif text-stone-500 mt-1">
                    Gated Origin: <strong className="text-stone-800">{pa.primary_source_name}</strong>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs font-serif">
                  <strong>Echoing Secondary Outlets:</strong> {pa.reporting_outlets_echoing.join(', ')}
                </div>

                <div
                  className={`p-3 rounded border text-xs font-serif ${
                    pa.citation_chain_broken
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  {pa.warning_label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 29. Image & Video Verification Integration */}
      {activeSubTab === 'media' && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 p-5 rounded shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-amber-300">
              <Camera className="w-4 h-4" />
              <span>Spatial EXIF Grounding & Synthetic Media Forensics</span>
            </div>
            <p className="text-xs font-serif text-stone-300 leading-relaxed max-w-3xl">
              Cross-references viral photos and video footage with reverse visual indexing, astronomical solar angle verification, and spatial sensor metadata to immediately detect out-of-context recycling and synthetic artifacts.
            </p>
          </div>

          {/* Interactive Media Inspector Submission */}
          <div className="bg-white border border-stone-300 p-6 rounded shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900">
              Submit Media for Forensic Spatial Grounding Audit
            </h3>
            <form onSubmit={handleTestMediaInspector} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={mediaCaptionInput}
                onChange={(e) => setMediaCaptionInput(e.target.value)}
                placeholder="Media description / claim caption (e.g. Baltimore harbor patrol boat)..."
                className="sm:col-span-2 px-3 py-2 text-xs font-serif bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-500"
              />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Claimed Location..."
                className="px-3 py-2 text-xs font-serif bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-500"
              />
              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  disabled={analyzingMedia || !mediaCaptionInput.trim()}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-stone-100 text-xs font-medium rounded transition flex items-center space-x-2 cursor-pointer"
                >
                  {analyzingMedia ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Running EXIF & Reverse Search...</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Run Forensic Verification Audit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Media Records Grid */}
          <div className="space-y-5">
            {mediaRecords.map((m) => (
              <div
                key={m.id}
                className="bg-white border border-stone-300 p-5 rounded shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono bg-stone-900 text-stone-100 px-2 py-0.5 rounded font-bold">
                      {m.media_type}
                    </span>
                    <span className="text-xs font-serif font-bold text-stone-900">{m.event_id}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      m.forensic_verdict === 'Authentic & Spatially Grounded'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {m.forensic_verdict}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1 rounded overflow-hidden border border-stone-200 aspect-video relative bg-stone-100">
                    <img
                      src={m.thumbnail_url}
                      alt={m.media_caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2 text-xs font-serif">
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      "{m.media_caption}"
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-stone-600 font-mono text-[11px] bg-stone-50 p-2.5 rounded border border-stone-200">
                      <div>Claimed: {m.claimed_location}</div>
                      <div>EXIF Grounding: {m.metadata_location}</div>
                      <div>Reverse Matches: {m.reverse_search_matches} instances</div>
                      <div>AI Prob: {(m.manipulation_probability * 100).toFixed(1)}%</div>
                    </div>
                    <div className="space-y-1 pt-1">
                      {m.forensic_flags.map((flag, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 text-stone-700">
                          <span className="text-stone-400 font-mono">•</span>
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
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
