/* 맞춤정보 설문 팝업 (공용)
   정보플랫폼 메인·마이페이지·맞춤 학습 로드맵·통합검색 어디서든 같은 팝업으로 목표·관심분야·수준 등을 한 번에 입력한다.
   응답은 localStorage('keli_up')에 저장되고, 로드맵·자료 추천이 같은 값을 쓴다. (프로토타입: 실제 서비스에서는 회원별 서버 저장)
   사용:  KeliSurvey.open({ history:[...], onDone(profile){...} }) */
(function () {
    if (window.KeliSurvey) return;
    var MEMBERS = { CM: ['일반회원', '일반 이용자'], OP: ['공무원', '공무원 대상 과정 포함'], OM: ['고용노동부 직원', '고용노동부 소속'], OC: ['회원사 소속 회원', '회원사 소속'] };
    var GOALS = { practice: ['실무 역량 강화', '지금 맡은 업무를 더 잘하고 싶어요'], law: ['법령 이해·준수', '법에서 정한 교육을 이수하거나 법령을 정확히 알고 싶어요'], career: ['직무 전환·전문성', '다른 직무로 옮기거나 전문성을 키우고 싶어요'], teach: ['교육·강의 담당', '직장·기관에서 교육이나 강의를 맡고 있어요'] };
    var LEVELS = { 1: ['입문', '이 분야는 처음이에요'], 2: ['기본', '기본 개념은 알고, 실무에 적용하고 싶어요'], 3: ['심화', '실무 경험이 있어 사례와 쟁점을 깊이 다루고 싶어요'], 4: ['전문', '다른 사람을 지도하거나 전문 과정을 준비해요'] };
    var INTERESTS = { compliance: ['법정의무교육', '법정·의무·괴롭힘'], empsvc: ['국민취업지원·고용서비스', '국취·국민취업·취업지원'], newhire: ['공무원 직무역량', '신규·임용·승진'], relation: ['노사관계', '노사·교섭·노조'], job: ['일자리·직무이해', '일자리·직종·직무이해'], laborlaw: ['노동법·인사노무', '노동법·근로기준·인사노무'], safety: ['산업안전·중대재해', '안전·재해·산재'], platform: ['플랫폼·특고·취약계층 권리', '플랫폼·특고·배달'], youth: ['청소년·청년 노동인권', '청소년·청년·알바'], investigation: ['노동수사·감독', '수사·감독·감독관'], digital: ['디지털·AI', 'AI·디지털·생성형'], teach: ['노동교육 전문가 양성', '강사·전문가·양성'] };
    var HOURS = { 0: '제한 없음', 2: '2시간 이내', 6: '6시간 이내' };
    var INT2TOP = { compliance: ['harassment'], laborlaw: ['law', 'hr'], relation: ['relation'], platform: ['delivery'], youth: ['youth'], empsvc: ['policy'], job: ['policy'], safety: [], newhire: [], investigation: [], digital: [], teach: [] };
    var MEM2INFO = { CM: 'worker', OC: 'corp', OP: 'agency', OM: 'agency' };
    var STEPS = ['회원 유형', '학습 목표', '관심 분야', '현재 수준', '선호 학습 방식'];
    var DEFAULT = function () { return { member: 'CM', goal: 'practice', interests: ['compliance', 'laborlaw', 'empsvc'], level: 2, modes: [], hours: 0 }; };
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

    function load() { try { var v = JSON.parse(localStorage.getItem('keli_up') || 'null'); if (v) return Object.assign(DEFAULT(), v); } catch (e) { } return DEFAULT(); }
    function done() { try { return localStorage.getItem('keli_up_done') || ''; } catch (e) { return ''; } }
    /* 정보플랫폼(자료 추천)이 쓰는 값으로 변환해 keli_prof 에 반영 */
    function syncProf(p) {
        try {
            var prof = JSON.parse(localStorage.getItem('keli_prof') || '{}');
            var top = []; p.interests.forEach(function (k) { (INT2TOP[k] || []).forEach(function (t) { if (top.indexOf(t) < 0) top.push(t); }); });
            prof.member = MEM2INFO[p.member]; prof.memberLabel = MEMBERS[p.member][0]; prof.interests = top.length ? top : ['harassment'];
            localStorage.setItem('keli_prof', JSON.stringify(prof));
        } catch (e) { }
    }

    var css = '.kxs-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(10,20,40,.55);display:flex;align-items:center;justify-content:center;padding:20px;font-family:pretendard,Pretendard,"Noto Sans KR",sans-serif}' +
        '.kxs-ov[hidden]{display:none}.kxs-box{background:#fff;width:100%;max-width:760px;max-height:92vh;border-radius:16px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35);color:#212121;line-height:1.5}' +
        '.kxs-hd{padding:20px 28px 14px;border-bottom:1px solid #e3e8ef;position:relative}.kxs-hd .t{font-size:14px;font-weight:700;color:#1976d2}.kxs-hd h4{font-size:22px;font-weight:800;color:#11284c;margin:2px 0 0;padding-right:40px}' +
        '.kxs-hd .x{position:absolute;right:20px;top:16px;font-size:22px;border:0;background:none;cursor:pointer;color:#555}.kxs-prog{display:flex;gap:6px;margin-top:12px}.kxs-prog i{flex:1;height:6px;border-radius:99px;background:#e3e8ef}.kxs-prog i.on{background:#1976d2}' +
        '.kxs-bd{padding:22px 28px;overflow:auto;flex:1}.kxs-bd .q{font-size:15px;color:#555;margin:0 0 14px}.kxs-opts{display:grid;gap:10px}.kxs-opts.c2{grid-template-columns:1fr 1fr}.kxs-opts.c3{grid-template-columns:repeat(3,1fr)}' +
        '.kxs-opt{text-align:left;border:1.5px solid #cfd8e6;background:#fff;border-radius:10px;padding:13px 15px;cursor:pointer;font-family:inherit;position:relative}.kxs-opt b{display:block;font-size:16px;color:#11284c}.kxs-opt span{display:block;font-size:13.5px;color:#666;margin-top:3px;line-height:1.4}' +
        '.kxs-opt:hover{border-color:#1976d2}.kxs-opt.sel{border-color:#1976d2;background:#e8f1fd;box-shadow:inset 0 0 0 1px #1976d2}.kxs-opt.sel:after{content:"✓";position:absolute;right:12px;top:10px;color:#1976d2;font-weight:800}' +
        '.kxs-sub{font-size:15px;font-weight:700;color:#11284c;margin:20px 0 8px}.kxs-ft{padding:14px 28px;border-top:1px solid #e3e8ef;display:flex;gap:10px;align-items:center;background:#f8fafc}.kxs-ft .sp{flex:1;font-size:13.5px;color:#78909c}' +
        '.kxs-ft button{border-radius:8px;padding:11px 22px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}.kxs-prev{border:1px solid #cfd8e6;background:#fff;color:#37474f}.kxs-next{border:0;background:#1976d2;color:#fff}.kxs-next:disabled{background:#b0bec5;cursor:not-allowed}' +
        '.kxs-sum{width:100%;border-collapse:collapse;font-size:15px}.kxs-sum th{width:120px;text-align:left;color:#78909c;font-weight:600;padding:9px 0;vertical-align:top}.kxs-sum td{padding:9px 0;font-weight:600;color:#11284c;border-bottom:1px solid #eef1f5}.kxs-sum tr:last-child td,.kxs-sum tr:last-child th{border-bottom:0}' +
        '.kxs-how{background:#f1f6fc;border:1px solid #cfe0f5;border-radius:10px;padding:14px 16px;margin-top:16px;font-size:14px;color:#37474f}.kxs-how b{color:#1976d2}' +
        '@media (max-width:700px){.kxs-opts.c2,.kxs-opts.c3{grid-template-columns:1fr}}';

    var st = null, step = 0, opts = {}, el = null;
    function ensure() {
        if (el) return;
        var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
        el = document.createElement('div'); el.className = 'kxs-ov'; el.hidden = true; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
        el.innerHTML = '<div class="kxs-box"><div class="kxs-hd"><span class="t" id="kxsStep"></span><h4 id="kxsQ"></h4><button type="button" class="x" id="kxsX" aria-label="닫기">✕</button><div class="kxs-prog" id="kxsProg"></div></div><div class="kxs-bd" id="kxsBd"></div><div class="kxs-ft"><button type="button" class="kxs-prev" id="kxsPrev">이전</button><span class="sp" id="kxsSp"></span><button type="button" class="kxs-next" id="kxsNext">다음</button></div></div>';
        document.body.appendChild(el);
        var $ = function (i) { return document.getElementById(i); };
        $('kxsX').onclick = close; el.addEventListener('click', function (e) { if (e.target === el) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !el.hidden) close(); });
        $('kxsPrev').onclick = function () { if (step > 0) { step--; render(); } };
        $('kxsNext').onclick = function () { if (step === STEPS.length) submit(); else if (valid()) { step++; render(); } };
        $('kxsBd').addEventListener('click', function (e) {
            var b = e.target.closest('.kxs-opt'); if (!b) return;
            var k = b.dataset.k, v = b.dataset.v;
            if (k === 'member' || k === 'goal') st[k] = v; else if (k === 'level') st.level = +v;
            else if (k === 'hours') st.hours = st.hours === +v && +v !== 0 ? 0 : +v;
            else {
                var arr = k === 'interest' ? st.interests : st.modes, i = arr.indexOf(v);
                if (i >= 0) arr.splice(i, 1); else if (k === 'interest' && arr.length >= 4) { alert('관심 분야는 최대 4개까지 고를 수 있어요.'); return; } else arr.push(v);
            }
            render();
        });
    }
    function valid() { return [!!st.member, !!st.goal, st.interests.length >= 1, !!st.level, true, true][step]; }
    function styleText(p) { return (p.modes.length ? p.modes.join('·') : '방식 상관없음') + ' / ' + (p.hours ? '1과정 ' + HOURS[p.hours] : '시간 제한 없음'); }
    function render() {
        var $ = function (i) { return document.getElementById(i); }, n = STEPS.length, last = step === n;
        $('kxsStep').textContent = last ? '응답 확인' : '질문 ' + (step + 1) + ' / ' + n;
        $('kxsProg').innerHTML = Array.apply(null, Array(n + 1)).map(function (_, i) { return '<i class="' + (i <= step ? 'on' : '') + '"></i>'; }).join('');
        var o = function (key, val, title, desc, sel) { return '<button type="button" class="kxs-opt' + (sel ? ' sel' : '') + '" data-k="' + key + '" data-v="' + val + '"><b>' + esc(title) + '</b>' + (desc ? '<span>' + esc(desc) + '</span>' : '') + '</button>'; };
        var q = '', h = '', sp = '';
        if (step === 0) { q = '어떤 유형의 회원으로 교육을 신청하세요?'; h = '<p class="q">교육대상이 제한된 과정은 회원 유형에 맞는 것만 추천합니다.</p><div class="kxs-opts c2">' + Object.keys(MEMBERS).map(function (k) { return o('member', k, MEMBERS[k][0], MEMBERS[k][1], st.member === k); }).join('') + '</div>'; }
        else if (step === 1) { q = '교육으로 이루고 싶은 목표는 무엇인가요?'; h = '<p class="q">가장 가까운 것 하나를 골라 주세요.</p><div class="kxs-opts c2">' + Object.keys(GOALS).map(function (k) { return o('goal', k, GOALS[k][0], GOALS[k][1], st.goal === k); }).join('') + '</div>'; }
        else if (step === 2) { q = '관심 있는 분야를 골라 주세요'; h = '<p class="q">최대 4개까지 고를 수 있어요. 고른 분야의 교육과 자료를 우선 추천합니다.</p><div class="kxs-opts c3">' + Object.keys(INTERESTS).map(function (k) { return o('interest', k, INTERESTS[k][0], '예) ' + INTERESTS[k][1], st.interests.indexOf(k) >= 0); }).join('') + '</div>'; sp = st.interests.length + '개 선택'; }
        else if (step === 3) { q = '현재 이 분야의 수준은 어느 정도인가요?'; h = '<p class="q">관심 분야를 기준으로 느끼는 수준을 골라 주세요. 같은 단계와 바로 다음 단계 교육이 높은 점수를 받습니다.</p><div class="kxs-opts c2">' + Object.keys(LEVELS).map(function (k) { return o('level', k, LEVELS[k][0] + ' (' + k + '단계)', LEVELS[k][1], st.level === +k); }).join('') + '</div>'; }
        else if (step === 4) {
            q = '선호하는 학습 방식이 있나요? (선택)';
            h = '<p class="q">정해진 게 없으면 건너뛰어도 돼요. 고른 조건에 맞는 교육에 가산점을 줍니다.</p><div class="kxs-sub" style="margin-top:0">학습 방식 (여러 개 선택 가능)</div><div class="kxs-opts c3">' +
                [['이러닝', '언제든 PC·모바일로'], ['집합', '교육장에서 대면으로'], ['화상', '정해진 시간에 온라인으로']].map(function (m) { return o('mode', m[0], m[0], m[1], st.modes.indexOf(m[0]) >= 0); }).join('') +
                '</div><div class="kxs-sub">한 과정에 쓸 수 있는 시간</div><div class="kxs-opts c3">' + [2, 6, 0].map(function (v) { return o('hours', v, HOURS[v], '', st.hours === v); }).join('') + '</div>'; sp = '선택 안 해도 됩니다';
        } else {
            q = '응답을 확인해 주세요';
            h = '<table class="kxs-sum"><tr><th>회원 유형</th><td>' + MEMBERS[st.member][0] + '</td></tr><tr><th>학습 목표</th><td>' + GOALS[st.goal][0] + '</td></tr><tr><th>관심 분야</th><td>' + st.interests.map(function (k) { return INTERESTS[k][0]; }).join(', ') + '</td></tr>' +
                '<tr><th>현재 수준</th><td>' + LEVELS[st.level][0] + ' (' + st.level + '단계)</td></tr><tr><th>선호 방식</th><td>' + styleText(st) + '</td></tr>' +
                (opts.history && opts.history.length ? '<tr><th>수강 이력</th><td>' + opts.history.map(esc).join(', ') + ' <span style="font-weight:400;color:#78909c">(시스템에서 자동 반영)</span></td></tr>' : '') + '</table>' +
                '<div class="kxs-how"><b>이렇게 반영됩니다</b><br>맞춤 학습 로드맵과 자료·교육과정 추천에 같은 값이 쓰입니다. 언제든 이 설문으로 다시 바꿀 수 있어요.</div>';
            sp = '저장하면 추천이 바로 바뀝니다';
        }
        $('kxsQ').textContent = q; $('kxsBd').innerHTML = h; $('kxsSp').textContent = sp; $('kxsPrev').style.visibility = step === 0 ? 'hidden' : 'visible';
        $('kxsNext').textContent = last ? '저장하고 추천 받기' : step === 4 ? '다음 (건너뛰기 가능)' : '다음'; $('kxsNext').disabled = !valid(); $('kxsBd').scrollTop = 0;
    }
    function close() { if (el) el.hidden = true; document.body.style.overflow = ''; }
    function submit() {
        var p = JSON.parse(JSON.stringify(st));
        try { localStorage.setItem('keli_up', JSON.stringify(p)); localStorage.setItem('keli_up_done', new Date().toISOString().slice(0, 10).replace(/-/g, '.')); } catch (e) { }
        syncProf(p); close();
        if (opts.onDone) opts.onDone(p);
        window.dispatchEvent(new CustomEvent('keli:profile', { detail: p }));
    }
    window.KeliSurvey = {
        open: function (o) {
            opts = o || {}; ensure();
            var cur = load(), was = !!done();
            st = { member: cur.member, goal: was ? cur.goal : '', interests: was ? cur.interests.slice() : [], level: was ? cur.level : 0, modes: (cur.modes || []).slice(), hours: cur.hours || 0 };
            step = 0; el.hidden = false; document.body.style.overflow = 'hidden'; render();
        },
        done: done, load: load, syncProf: syncProf, MEMBERS: MEMBERS, GOALS: GOALS, LEVELS: LEVELS, INTERESTS: INTERESTS
    };
})();
