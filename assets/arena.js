/* Shared by arena.html, arena-issue.html and arena-meeting.html. Loaded after
   common.js (horseshoe, L, esc) and data/arena.js (window.ARENA). */

const A = window.ARENA || { issues: [], meetings: [], bias: {}, models: [] };
/* country names: common.js cname() gives the Chinese name when the page is in Chinese */
const ctry = (c) => esc(cname(c)).replace('United Kingdom of Great Britain and Northern Ireland', 'United Kingdom');
const short = (c) => ctry(c).replace('United States of America', 'United States').replace('Russian Federation', 'Russia')
  .replace('Democratic Republic of the Congo', 'DR Congo').replace(/ \(.*\)$/, '');
const pc = (x) => (x == null ? '—' : Math.round(x * 100) + '%');
const POS = { support: 'Y', support_with_changes: 'W', abstain: 'A', oppose: 'N' };
const POS_L = { support: L('supports', '支持'), support_with_changes: L('supports with changes', '支持但要求修改'),
  abstain: L('would abstain', '倾向弃权'), oppose: L('opposes', '反对') };
const VOTE_L = { Y: L('yes', '赞成'), N: L('no', '反对'), A: L('abstain', '弃权') };
const SIM = `<span class="tag sim">${L('SIMULATED', '模拟')}</span>`;
const REC = `<span class="tag rec">${L('RECORD', '记录')}</span>`;
const outcome = (o) => (o.adopted ? L('Adopted', '通过') : o.vetoed ? L('Vetoed', '被否决') : L('Not adopted', '未通过'));
const tallyOf = (votes) => ['Y', 'N', 'A'].map((k) => Object.values(votes).filter((v) => v === k).length).join('–');

function seatsPos(members, positions) {
  return horseshoe(members, Object.fromEntries(members.map((m) => [m, POS[positions[m]] || 'Y'])));
}

function legend(withChanges) {
  const dot = (cls, r) => `<svg class="hs" viewBox="0 0 14 14" aria-hidden="true"><circle class="${cls}" cx="7" cy="7" r="${r}"/></svg>`;
  return `<div class="ar-legend"><span>${dot('y', 6)}${L('Yes / supports', '赞成 / 支持')}</span>`
    + (withChanges ? `<span>${dot('w', 6)}${L('Supports with changes', '支持但要求修改')}</span>` : '')
    + `<span>${dot('a', 5.2)}${L('Abstains', '弃权')}</span><span>${dot('n', 6)}${L('No — from a permanent member, a veto', '反对（常任理事国即否决）')}</span>`
    + `<span><svg class="hs" viewBox="0 0 14 14" aria-hidden="true"><circle class="x" cx="7" cy="7" r="5.5"/></svg>${L('Did not vote', '未参加表决')}</span></div>`;
}

const meetingHref = (m) => `arena-meeting.html?f=${encodeURIComponent(m.file)}`;
const issueHref = (slug) => `arena-issue.html?i=${encodeURIComponent(slug)}`;
const modeLabel = (m) => (m.mode === 'forecast' ? L('Run before the meeting', '会前运行') : L('Replay', '回放'));

const ISSUE_ZH = { 'Haiti': '海地', 'Western Sahara': '西撒哈拉', 'Colombia': '哥伦比亚', 'Terrorism': '恐怖主义',
  'Central African Republic': '中非共和国', 'Sudan and South Sudan': '苏丹和南苏丹', 'Yemen': '也门',
  'Israel and Palestine': '以色列和巴勒斯坦', 'Libya': '利比亚', 'Thematic debates': '专题辩论',
  'Democratic Republic of the Congo': '刚果民主共和国', 'Somalia': '索马里', 'Syria': '叙利亚', 'Middle East': '中东',
  'Venezuela': '委内瑞拉', 'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那', 'Ukraine': '乌克兰', 'North Korea (DPRK)': '朝鲜',
  'Mali': '马里', 'Non-proliferation': '不扩散', 'Lebanon': '黎巴嫩', 'Iraq': '伊拉克' };
const issueName = (n) => esc(L(n, ISSUE_ZH[n] || n));
